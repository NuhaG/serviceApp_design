import { useState, useEffect } from "react";
import { Navigation } from "../components/navigation";
import { ProviderCard } from "../components/provider-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  MapPin,
  List,
  Map as MapIcon,
  SlidersHorizontal,
} from "lucide-react";
import { mockProviders } from "../data/mock-data";
import { useThemeClass } from "../hooks/useThemeClass";

// Leaflet imports
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function SearchPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [serviceType, setServiceType] = useState<"one-time" | "contract">(
    "one-time"
  );
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState([0]);
  const [minReliability, setMinReliability] = useState([0]);
  const [showFilters, setShowFilters] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => console.log("User denied location")
    );
  }, []);

  const filteredProviders = mockProviders.filter((provider) => {
    // Match name or any of the services
    const matchesSearch =
      searchText === "" ||
      provider.name.toLowerCase().includes(searchText.toLowerCase()) ||
      provider.services.some((s) =>
        s.toLowerCase().includes(searchText.toLowerCase())
      );

    // Match category if selected
    const matchesCategory =
      !selectedCategory ||
      provider.services.map((s) => s.toLowerCase()).includes(
        selectedCategory.toLowerCase()
      );

    // Apply existing filters
    const matchesPrice =
      provider.basePrice >= priceRange[0] && provider.basePrice <= priceRange[1];
    const matchesRating = provider.rating >= minRating[0];
    const matchesReliability = provider.reliabilityScore >= minReliability[0];

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesReliability;
  });

  const themeClass = useThemeClass();

  // Helper: Distance in km
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Find Service Providers
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for services..."
                  className="pl-10 h-10 sm:h-12 rounded-xl w-full"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-[250px]">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="pl-10 h-10 sm:h-12 rounded-xl w-full"
                />
              </div>
            </div>
            <Button size="lg" className="rounded-xl px-6 w-full sm:w-auto">
              Search
            </Button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-xl w-full sm:w-auto"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            {/* <div className="hidden sm:flex items-center gap-2 bg-card border-border rounded-xl p-1">
              <Button
                size="sm"
                variant={serviceType === "one-time" ? "default" : "ghost"}
                onClick={() => setServiceType("one-time")}
                className="rounded-lg"
              >
                One-time
              </Button>
              <Button
                size="sm"
                variant={serviceType === "contract" ? "default" : "ghost"}
                onClick={() => setServiceType("contract")}
                className="rounded-lg"
              >
                Contract
              </Button>
            </div> */}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-sm text-muted-foreground">
              {filteredProviders.length} providers
            </span>
            <div className="hidden sm:flex items-center gap-1 bg-card border-border rounded-xl p-1">
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="rounded-lg"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "map" ? "default" : "ghost"}
                onClick={() => setViewMode("map")}
                className="rounded-lg"
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <Card className="w-full lg:w-80 h-fit p-4 sm:p-6 rounded-xl lg:sticky lg:top-24">
              <h3 className="font-semibold mb-4">Filters</h3>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Service Category</Label>
                  <Select onValueChange={(v) => setSelectedCategory(v)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(new Set(mockProviders.flatMap((p) => p.services))).map(
                        (cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </Label>
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">
                    Minimum Rating: {minRating[0].toFixed(1)}+
                  </Label>
                  <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={minRating}
                    onValueChange={setMinRating}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">
                    Minimum Reliability: {minReliability[0]}%
                  </Label>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={minReliability}
                    onValueChange={setMinReliability}
                    className="mb-2"
                  />
                </div>

                {/* <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Verified Only</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Top Rated</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Available Now</Label>
                    <Switch />
                  </div>
                </div> */}

                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => {
                    setPriceRange([0, 200]);
                    setMinRating([0]);
                    setMinReliability([0]);
                    setSearchText("");        // Reset search input
                    setSelectedCategory(null); // Reset category dropdown
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === "list" ? (
              <div className="space-y-4">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
                {filteredProviders.length === 0 && (
                  <Card className="p-12 text-center rounded-xl">
                    <p className="text-muted-foreground">
                      No providers found matching your filters. Try adjusting your
                      search criteria.
                    </p>
                  </Card>
                )}
              </div>
            ) : (
              <MapContainer
                center={userLocation || [20.5937, 78.9629]}
                zoom={12}
                scrollWheelZoom={true}
                className="w-full h-[400px] sm:h-[500px] lg:h-[800px] rounded-xl"
                whenCreated={(map: L.Map) => {
                  if (userLocation) {
                    map.setView(userLocation, 13);
                  }
                }}
              >

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />

                {/* User Location (red) */}
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={new L.Icon({
                      iconUrl:
                        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowUrl:
                        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                    })}
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {/* Provider markers (blue) */}
                {userLocation &&
                  filteredProviders.map((provider) => {
                    if (!provider.lat || !provider.lng) return null;
                    const pos: [number, number] = [provider.lat, provider.lng];
                    return (
                      <div key={provider.id}>
                        <Marker
                          position={pos}
                          icon={new L.Icon({
                            iconUrl:
                              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowUrl:
                              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                          })}
                        >
                          <Popup>
                            <div>
                              <div className="font-semibold">{provider.name}</div>
                              <div>
                                ⭐ {provider.rating} • {provider.reliabilityScore}% reliable
                              </div>
                              <div>
                                {getDistance(
                                  userLocation[0],
                                  userLocation[1],
                                  provider.lat,
                                  provider.lng
                                ).toFixed(1)}{" "}
                                km away
                              </div>
                              <div className="font-medium">${provider.basePrice}</div>
                            </div>
                          </Popup>
                        </Marker>

                      </div>
                    );
                  })}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
