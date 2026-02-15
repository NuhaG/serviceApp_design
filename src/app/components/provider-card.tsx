import { Star, MapPin, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Link } from "react-router";
import { Provider } from "../data/mock-data";
import { useThemeClass } from "../hooks/useThemeClass";

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const themeClass = useThemeClass();
  return (
    <Card className={`${themeClass} p-4 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 ease-out rounded-2xl group cursor-pointer`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={provider.photo}
            alt={provider.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover flex-shrink-0 group-hover:brightness-110 transition-all duration-300"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500/70 rounded-full p-1.5 ring-2 ring-card">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">{provider.name}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-500">{provider.rating}</span>
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">•</span>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                  <span className="line-clamp-1">{provider.distance}</span>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg sm:text-2xl font-bold text-primary">${provider.basePrice}</div>
              <div className="text-xs text-muted-foreground font-medium">base price</div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-3 mb-3 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-foreground">Performance</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xs sm:text-sm font-bold text-primary">{provider.reliabilityScore}%</div>
                <div className="text-xs text-muted-foreground">Reliability</div>
              </div>
              <div className="text-center border-l border-r border-border/30">
                <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-500">{provider.acceptRate}%</div>
                <div className="text-xs text-muted-foreground">Accept</div>
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-500">{provider.rejectRate}%</div>
                <div className="text-xs text-muted-foreground">Reject</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Reliability Score</span>
              <span className="text-xs font-semibold text-primary">{provider.reliabilityScore}%</span>
            </div>
            <Progress value={provider.reliabilityScore} className="h-2 sm:h-2.5 rounded-full" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {provider.services.slice(0, 3).map((service) => (
              <Badge key={service} variant="secondary" className="text-xs rounded-lg px-2 py-1 font-medium">
                {service}
              </Badge>
            ))}
            {provider.services.length > 3 && (
              <Badge variant="outline" className="text-xs rounded-lg px-2 py-1 text-muted-foreground">
                +{provider.services.length - 3} more
              </Badge>
            )}
          </div>

          <Link to={`/provider/${provider.id}`} className="block">
            <Button className="w-full rounded-xl text-xs sm:text-sm py-2 sm:py-auto font-semibold group-hover:shadow-lg transition-all duration-300">
              View Profile & Book
              <span className="ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
