import { useState } from "react";
import { Star, MapPin, TrendingUp, CheckCircle, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Link } from "react-router";
import { Provider } from "../data/mock-data";
import { useThemeClass } from "../hooks/useThemeClass";

interface ProviderCardProps {
  provider: Provider;
  distanceLabel?: string;
  onLocateClick?: (providerId: string) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (providerId: string) => void;
}

export function ProviderCard({
  provider,
  distanceLabel,
  onLocateClick,
  isFavorite = false,
  onFavoriteToggle,
}: ProviderCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const themeClass = useThemeClass();

  return (
    <Card
      className={`${themeClass} p-4 sm:p-5 bg-card border border-border/80 rounded-lg shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={provider.photo}
            alt={provider.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1 ring-2 ring-card">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-base line-clamp-1">{provider.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                Specialist in {provider.serviceTuple[0]} and {provider.serviceTuple[1]}
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-500">
                    {provider.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  <MapPin className="w-3 h-3" />
                  <span>{distanceLabel ?? provider.distance}</span>
                </div>
                <Badge variant="outline" className="text-[11px] rounded-md px-2 py-0.5">
                  {provider.reliabilityScore}% reliable
                </Badge>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              {onFavoriteToggle && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="mb-1 h-8 w-8 rounded-full"
                  onClick={() => onFavoriteToggle(provider.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                    }`}
                  />
                </Button>
              )}
              <div className="text-lg sm:text-xl font-bold text-primary">Rs {provider.basePrice}</div>
              <div className="text-xs text-muted-foreground">starting price</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {provider.services.slice(0, 2).map((service) => (
              <Badge key={service} variant="secondary" className="text-xs rounded-md px-2.5 py-1">
                {service}
              </Badge>
            ))}
            {provider.services.length > 2 && (
              <Badge variant="outline" className="text-xs rounded-md px-2.5 py-1 text-muted-foreground">
                +{provider.services.length - 2} more
              </Badge>
            )}
          </div>

          {showDetails && (
            <div className="mb-3 rounded-md border border-border/70 bg-muted/30 p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold">Performance details</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-2">
                <div>
                  <div className="text-xs font-semibold text-primary">{provider.reliabilityScore}%</div>
                  <div className="text-[11px] text-muted-foreground">Reliability</div>
                </div>
                <div className="border-l border-r border-border/60">
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-500">
                    {provider.acceptRate}%
                  </div>
                  <div className="text-[11px] text-muted-foreground">Accept</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-rose-600 dark:text-rose-500">
                    {provider.rejectRate}%
                  </div>
                  <div className="text-[11px] text-muted-foreground">Reject</div>
                </div>
              </div>
              <Progress value={provider.reliabilityScore} className="h-1.5 rounded-full" />
              <p className="mt-2 text-[11px] text-muted-foreground">
                {provider.totalBookings} completed bookings.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="ghost"
              className="w-full sm:w-auto rounded-md text-sm px-3"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {showDetails ? "Hide details" : "More details"}
            </Button>
            {onLocateClick && (
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-md text-sm"
                onClick={() => onLocateClick(provider.id)}
              >
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                Show on map
              </Button>
            )}
            <Link to={`/provider/${provider.id}`} className="block flex-1">
              <Button className="w-full rounded-md text-sm font-semibold">
                View profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
