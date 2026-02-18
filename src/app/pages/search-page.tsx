import { useState, useEffect, useMemo, useRef } from "react";
import { Navigation } from "../components/navigation";
import { ProviderCard } from "../components/provider-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
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
  Navigation as RouteIcon,
} from "lucide-react";
import { Provider } from "../data/mock-data";
import { useThemeClass } from "../hooks/useThemeClass";
import { useMarketplaceData } from "../hooks/useMarketplaceData";
import {
  distanceKm,
  formatDistance,
  readStoredUserLocation,
  saveUserLocation,
  toLatLng,
} from "../lib/geo";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type ProviderWithDistance = Provider & {
  distanceKm: number | null;
};

type SortBy = "nearest" | "rating" | "reliability" | "price_low" | "price_high";

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629];
const DEFAULT_PRICE_RANGE: [number, number] = [0, 3000];
const DEFAULT_MAX_DISTANCE = 25;

// Fix default marker icons for Vite/Leaflet bundling
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userMarkerIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const providerMarkerIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function SearchPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [priceRange, setPriceRange] = useState<number[]>(DEFAULT_PRICE_RANGE);
  const [minRating, setMinRating] = useState([0]);
  const [minReliability, setMinReliability] = useState([0]);
  const [maxDistance, setMaxDistance] = useState([DEFAULT_MAX_DISTANCE]);
  const [showFilters, setShowFilters] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(() =>
    readStoredUserLocation()
  );
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("nearest");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [instantOnly, setInstantOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  const mapRef = useRef<L.Map | null>(null);
  const themeClass = useThemeClass();
  const {
    providers,
    loading,
    favoriteProviderIds,
    isFavoriteProvider,
    toggleFavoriteProvider,
  } = useMarketplaceData();
  const quickCategories = useMemo(
    () => Array.from(new Set(providers.flatMap((provider) => provider.services))).slice(0, 8),
    [providers]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        saveUserLocation(coords);
      },
      () => {
        // Keep a prior stored location if available.
      },
      { enableHighAccuracy: true, timeout: 7000 }
    );
  }, []);

  const providersWithDistance = useMemo<ProviderWithDistance[]>(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    const filtered = providers.filter((provider) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        provider.name.toLowerCase().includes(normalizedSearch) ||
        provider.services.some((s) => s.toLowerCase().includes(normalizedSearch));

      const matchesCategory =
        !selectedCategory ||
        provider.services.map((s) => s.toLowerCase()).includes(selectedCategory.toLowerCase());

      const matchesPrice =
        provider.basePrice >= priceRange[0] && provider.basePrice <= priceRange[1];
      const matchesRating = provider.rating >= minRating[0];
      const matchesReliability = provider.reliabilityScore >= minReliability[0];
      const matchesVerified = !verifiedOnly || provider.reliabilityScore >= 95;
      const matchesInstant = !instantOnly || provider.acceptRate >= 90;
      const matchesSaved = !savedOnly || favoriteProviderIds.includes(provider.id);

      const liveDistance = userLocation
        ? distanceKm(userLocation, toLatLng(provider.lat, provider.lng))
        : null;
      const matchesDistance = liveDistance === null || liveDistance <= maxDistance[0];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesReliability &&
        matchesVerified &&
        matchesInstant &&
        matchesSaved &&
        matchesDistance
      );
    });

    const mapped = filtered.map((provider) => ({
      ...provider,
      distanceKm: userLocation
        ? distanceKm(userLocation, toLatLng(provider.lat, provider.lng))
        : null,
    }));

    return mapped.sort((a, b) => {
      switch (sortBy) {
        case "nearest": {
          const aVal = a.distanceKm ?? Number.POSITIVE_INFINITY;
          const bVal = b.distanceKm ?? Number.POSITIVE_INFINITY;
          return aVal - bVal;
        }
        case "rating":
          return b.rating - a.rating;
        case "reliability":
          return b.reliabilityScore - a.reliabilityScore;
        case "price_low":
          return a.basePrice - b.basePrice;
        case "price_high":
          return b.basePrice - a.basePrice;
        default:
          return 0;
      }
    });
  }, [
    searchText,
    selectedCategory,
    priceRange,
    minRating,
    minReliability,
    verifiedOnly,
    instantOnly,
    savedOnly,
    maxDistance,
    sortBy,
    userLocation,
    providers,
    favoriteProviderIds,
  ]);

  const selectedProvider = useMemo(
    () => providersWithDistance.find((provider) => provider.id === selectedProviderId) ?? null,
    [providersWithDistance, selectedProviderId]
  );

  const nearestProvider = useMemo(() => {
    return providersWithDistance.reduce<ProviderWithDistance | null>((best, current) => {
      if (current.distanceKm === null) {
        return best;
      }
      if (!best || best.distanceKm === null || current.distanceKm < best.distanceKm) {
        return current;
      }
      return best;
    }, null);
  }, [providersWithDistance]);

  const resetFilters = (clearSearch = false) => {
    setPriceRange([...DEFAULT_PRICE_RANGE]);
    setMinRating([0]);
    setMinReliability([0]);
    setMaxDistance([DEFAULT_MAX_DISTANCE]);
    setSelectedCategory(null);
    setVerifiedOnly(false);
    setInstantOnly(false);
    setSavedOnly(false);
    setSortBy("nearest");
    if (clearSearch) {
      setSearchText("");
    }
  };

  const activeFilterCount = [
    selectedCategory !== null,
    priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1],
    minRating[0] > 0,
    minReliability[0] > 0,
    maxDistance[0] !== DEFAULT_MAX_DISTANCE,
    verifiedOnly,
    instantOnly,
    savedOnly,
  ].filter(Boolean).length;

  useEffect(() => {
    if (!mapRef.current || viewMode !== "map" || !selectedProvider) {
      return;
    }

    mapRef.current.flyTo([selectedProvider.lat, selectedProvider.lng], 14, {
      duration: 0.9,
    });
  }, [viewMode, selectedProvider]);

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Book Local Services</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Compare trusted providers, pricing, and response quality in one place.
              </p>
            </div>
            <div className="flex items-center gap-1 bg-card border border-border rounded-md p-1">
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="rounded-sm px-3"
              >
                <List className="w-4 h-4 mr-1" />
                List
              </Button>
              <Button
                size="sm"
                variant={viewMode === "map" ? "default" : "ghost"}
                onClick={() => setViewMode("map")}
                className="rounded-sm px-3"
              >
                <MapIcon className="w-4 h-4 mr-1" />
                Map
              </Button>
            </div>
          </div>

          <Card className="p-4 sm:p-5 rounded-lg border-border/80">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search provider or service"
                  className="pl-10 h-11 rounded-md w-full"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="relative w-full md:w-[280px] xl:w-[330px]">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  readOnly
                  value={
                    userLocation
                      ? `Using your location: ${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}`
                      : "Location not shared"
                  }
                  className="pl-10 h-11 rounded-md w-full"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-11 rounded-md px-4 lg:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? "Hide filters" : "Show filters"}
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickCategories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="rounded-sm whitespace-nowrap"
                    onClick={() =>
                      setSelectedCategory((prev) => (prev === category ? null : category))
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                <SelectTrigger className="w-full sm:w-[210px] rounded-md">
                  <SelectValue placeholder="Sort providers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearest">Nearest first</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="reliability">Most reliable</SelectItem>
                  <SelectItem value="price_low">Price: low to high</SelectItem>
                  <SelectItem value="price_high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-sm bg-primary/10 text-primary border border-primary/20">
              {providersWithDistance.length} providers found
            </Badge>
            {nearestProvider?.distanceKm != null && (
              <Badge variant="secondary" className="rounded-sm">
                Nearest {formatDistance(nearestProvider.distanceKm)} away
              </Badge>
            )}
            {activeFilterCount > 0 && (
              <Badge variant="outline" className="rounded-sm">
                {activeFilterCount} active filters
              </Badge>
            )}
            {(activeFilterCount > 0 || searchText.trim().length > 0) && (
              <Button size="sm" variant="ghost" className="rounded-sm" onClick={() => resetFilters(true)}>
                Clear all
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {showFilters && (
            <Card className="w-full lg:w-80 h-fit p-4 sm:p-6 rounded-lg lg:sticky lg:top-24">
              <h3 className="font-semibold mb-1">Filters</h3>
              <p className="text-xs text-muted-foreground mb-5">
                Narrow results by quality, budget, and distance.
              </p>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Service Category</Label>
                  <Select
                    value={selectedCategory ?? "all"}
                    onValueChange={(v) => setSelectedCategory(v === "all" ? null : v)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Array.from(new Set(providers.flatMap((p) => p.services))).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">Price Range: Rs {priceRange[0]} - Rs {priceRange[1]}</Label>
                  <Slider
                    min={0}
                    max={3000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Minimum Rating: {minRating[0].toFixed(1)}+</Label>
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
                  <Label className="mb-3 block">Minimum Reliability: {minReliability[0]}%</Label>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={minReliability}
                    onValueChange={setMinReliability}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Max Distance: {maxDistance[0]} km</Label>
                  <Slider
                    min={1}
                    max={200}
                    step={1}
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    className="mb-2"
                    disabled={!userLocation}
                  />
                  {!userLocation && (
                    <p className="text-xs text-muted-foreground">
                      Share location to filter by real distance.
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium">Verified providers</p>
                      <p className="text-xs text-muted-foreground">Reliability score 95% and above</p>
                    </div>
                    <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium">Fast responders</p>
                      <p className="text-xs text-muted-foreground">Accept rate 90% and above</p>
                    </div>
                    <Switch checked={instantOnly} onCheckedChange={setInstantOnly} />
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium">Saved providers</p>
                      <p className="text-xs text-muted-foreground">Only your bookmarked profiles</p>
                    </div>
                    <Switch checked={savedOnly} onCheckedChange={setSavedOnly} />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-md"
                  onClick={() => resetFilters(false)}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}

          <div className="flex-1">
            {userLocation && (
              <Card className="mb-4 p-3 sm:p-4 rounded-lg border-primary/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm">
                    <span className="font-semibold">Your current location</span>
                    <span className="text-muted-foreground"> is being used for live distance ranking.</span>
                  </div>
                  {selectedProvider && selectedProvider.distanceKm !== null && (
                    <Badge className="rounded-md bg-primary/15 text-primary">
                      <RouteIcon className="w-3.5 h-3.5 mr-1" />
                      Route to {selectedProvider.name}: {formatDistance(selectedProvider.distanceKm)}
                    </Badge>
                  )}
                </div>
              </Card>
            )}

            {viewMode === "list" ? (
              <div className="space-y-4">
                {loading && (
                  <Card className="p-12 text-center rounded-lg">
                    <p className="text-muted-foreground">Loading providers...</p>
                  </Card>
                )}
                {providersWithDistance.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    distanceLabel={
                      provider.distanceKm !== null
                        ? formatDistance(provider.distanceKm)
                        : provider.distance
                    }
                    onLocateClick={(providerId) => {
                      setSelectedProviderId(providerId);
                      setViewMode("map");
                    }}
                    isFavorite={isFavoriteProvider(provider.id)}
                    onFavoriteToggle={toggleFavoriteProvider}
                  />
                ))}
                {providersWithDistance.length === 0 && (
                  <Card className="p-12 text-center rounded-lg">
                    <p className="font-medium mb-2">No providers matched your search</p>
                    <p className="text-muted-foreground text-sm mb-4">
                      Try broader search terms or reset a few filters.
                    </p>
                    <Button variant="outline" onClick={() => resetFilters(true)}>
                      Reset and try again
                    </Button>
                  </Card>
                )}
              </div>
            ) : (
              <MapContainer
                center={userLocation || DEFAULT_CENTER}
                zoom={userLocation ? 13 : 5}
                scrollWheelZoom
                className="w-full h-[450px] sm:h-[580px] lg:h-[760px] rounded-lg"
                whenCreated={(map: L.Map) => {
                  mapRef.current = map;
                  if (userLocation) {
                    map.setView(userLocation, 13);
                  }
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />

                {userLocation && (
                  <Marker position={userLocation} icon={userMarkerIcon}>
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {providersWithDistance.map((provider) => {
                  const position: [number, number] = [provider.lat, provider.lng];
                  return (
                    <Marker key={provider.id} position={position} icon={providerMarkerIcon}>
                      <Popup>
                        <div className="space-y-1">
                          <div className="font-semibold">{provider.name}</div>
                          <div>
                            {provider.rating} rating | {provider.reliabilityScore}% reliable
                          </div>
                          <div>
                            {provider.distanceKm !== null
                              ? `${formatDistance(provider.distanceKm)} away`
                              : provider.distance}
                          </div>
                          <div className="font-medium">Rs {provider.basePrice}</div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}

                {userLocation && selectedProvider && (
                  <Polyline
                    positions={[
                      userLocation,
                      [selectedProvider.lat, selectedProvider.lng],
                    ]}
                    pathOptions={{ color: "#f97316", weight: 4, opacity: 0.8 }}
                  />
                )}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
