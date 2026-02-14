import { Star, MapPin, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Link } from "react-router";
import { Provider } from "../data/mock-data";

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow rounded-xl">
      <div className="flex gap-4">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{provider.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{provider.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-3 h-3" />
                  {provider.distance}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-primary">${provider.basePrice}</div>
              <div className="text-xs text-gray-500">base price</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="rounded-lg">
              <TrendingUp className="w-3 h-3 mr-1" />
              {provider.reliabilityScore}% Reliability
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <CheckCircle className="w-3 h-3 text-green-600" />
              {provider.acceptRate}% accept
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <XCircle className="w-3 h-3 text-red-500" />
              {provider.rejectRate}% reject
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Reliability Score</div>
            <Progress value={provider.reliabilityScore} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {provider.services.slice(0, 3).map((service) => (
              <Badge key={service} variant="outline" className="text-xs rounded-lg">
                {service}
              </Badge>
            ))}
          </div>

          <Link to={`/provider/${provider.id}`}>
            <Button className="w-full rounded-xl">View Profile & Book</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
