import { useState } from "react";
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
import { Search, MapPin, List, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { mockProviders } from "../data/mock-data";

export function SearchPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [serviceType, setServiceType] = useState<"one-time" | "contract">("one-time");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState([0]);
  const [minReliability, setMinReliability] = useState([0]);
  const [showFilters, setShowFilters] = useState(true);

  const filteredProviders = mockProviders.filter((provider) => {
    return (
      provider.basePrice >= priceRange[0] &&
      provider.basePrice <= priceRange[1] &&
      provider.rating >= minRating[0] &&
      provider.reliabilityScore >= minReliability[0]
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Service Providers</h1>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for services..."
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>
            <div className="w-[250px]">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Location" className="pl-10 h-12 rounded-xl" />
              </div>
            </div>
            <Button size="lg" className="rounded-xl px-6">
              Search
            </Button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-xl"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div className="flex items-center gap-2 bg-white border rounded-xl p-1">
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
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{filteredProviders.length} providers</span>
            <div className="flex items-center gap-1 bg-white border rounded-xl p-1">
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

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <Card className="w-80 h-fit p-6 rounded-xl sticky top-24">
              <h3 className="font-semibold mb-4">Filters</h3>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Service Category</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleaning">House Cleaning</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical Work</SelectItem>
                      <SelectItem value="pet">Pet Care</SelectItem>
                      <SelectItem value="garden">Gardening</SelectItem>
                      <SelectItem value="ac">AC Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
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

                <div className="pt-4 border-t">
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
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => {
                    setPriceRange([0, 200]);
                    setMinRating([0]);
                    setMinReliability([0]);
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
                    <p className="text-gray-500">
                      No providers found matching your filters. Try adjusting your search criteria.
                    </p>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="p-0 rounded-xl overflow-hidden h-[800px] relative">
                {/* Map View - Placeholder with markers */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

                  {/* Map Controls */}
                  <div className="absolute top-4 left-4 right-4 z-10">
                    <Card className="p-4 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <Badge className="rounded-full">
                          {filteredProviders.length} providers in your area
                        </Badge>
                        <Button size="sm" variant="outline" className="rounded-lg">
                          Recenter Map
                        </Button>
                      </div>
                    </Card>
                  </div>

                  {/* Provider Markers */}
                  {filteredProviders.slice(0, 6).map((provider, index) => {
                    const positions = [
                      { top: "20%", left: "25%" },
                      { top: "35%", left: "60%" },
                      { top: "50%", left: "30%" },
                      { top: "60%", left: "70%" },
                      { top: "75%", left: "40%" },
                      { top: "45%", left: "80%" },
                    ];
                    const pos = positions[index] || positions[0];

                    return (
                      <div
                        key={provider.id}
                        className="absolute z-20 group cursor-pointer"
                        style={{ top: pos.top, left: pos.left }}
                      >
                        <div className="relative">
                          <div className="w-12 h-12 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-sm">
                              ${provider.basePrice}
                            </span>
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Card className="p-3 rounded-xl shadow-xl w-64">
                              <div className="flex gap-3">
                                <img
                                  src={provider.photo}
                                  alt={provider.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <div className="font-semibold text-sm">{provider.name}</div>
                                  <div className="text-xs text-gray-600">
                                    ⭐ {provider.rating} • {provider.reliabilityScore}% reliable
                                  </div>
                                  <div className="text-xs text-primary font-medium mt-1">
                                    {provider.distance} 
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <Card className="p-4 rounded-xl">
                      <div className="text-xs font-semibold mb-2">Map Legend</div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span>Available Provider</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-accent rounded-full"></div>
                          <span>Top Rated</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
