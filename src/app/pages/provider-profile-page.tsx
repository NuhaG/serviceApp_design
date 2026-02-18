import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { useParams, Link } from "react-router";
import {
  Star,
  MapPin,
  TrendingUp,
  CheckCircle,
  XCircle,
  Award,
  Calendar,
  Shield,
  AlertTriangle,
  Heart,
} from "lucide-react";
import { useThemeClass } from "../hooks/useThemeClass";
import { useMarketplaceData } from "../hooks/useMarketplaceData";
import { useState } from "react";

export function ProviderProfilePage() {
  const { id } = useParams();
  const themeClass = useThemeClass();
  const { providers, loading, isFavoriteProvider, toggleFavoriteProvider } = useMarketplaceData();
  const provider = providers.find((p) => p.id === id);
  const [message, setMessage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Loading provider...</h1>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Provider not found</h1>
        </div>
      </div>
    );
  }

  const cancellationRate = ((provider.cancellations / provider.totalBookings) * 100).toFixed(1);

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {message && (
          <Card className="p-4 rounded-xl mb-6 border-blue-500/30 bg-blue-500/10">
            <p className="text-sm text-blue-700 dark:text-blue-300">{message}</p>
          </Card>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="p-4 sm:p-6 lg:p-8 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{provider.name}</h1>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-sm sm:text-base">{provider.rating}</span>
                          <span className="text-muted-foreground text-xs sm:text-sm">({provider.reviews.length} reviews)</span>
                        </div>
                        <span className="text-muted-foreground hidden xs:inline">|</span>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4" />
                          {provider.location}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-accent text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm w-fit">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 inline" />
                      Verified
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-lg text-xs sm:text-sm">
                      Service Pair: {provider.serviceTuple[0]} + {provider.serviceTuple[1]}
                    </Badge>
                    {provider.services.slice(0, 3).map((service) => (
                      <Badge key={service} variant="outline" className="rounded-lg text-xs sm:text-sm">
                        {service}
                      </Badge>
                    ))}
                    {provider.services.length > 3 && (
                      <Badge variant="outline" className="rounded-lg text-xs sm:text-sm">
                        +{provider.services.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-4 sm:my-6" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-primary">{provider.totalBookings}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">Total Bookings</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-accent">{provider.acceptRate}%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">Accept Rate</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold">{provider.reliabilityScore}%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">Reliability</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-destructive">{provider.cancellations}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">Cancellations</div>
                </div>
              </div>
            </Card>

            {/* Reliability Score Breakdown */}
            <Card className="p-4 sm:p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-semibold">Reliability Score Breakdown</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium">Overall Reliability</span>
                    <span className="text-xs sm:text-sm font-bold text-primary">
                      {provider.reliabilityScore}%
                    </span>
                  </div>
                  <Progress value={provider.reliabilityScore} className="h-2 sm:h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium">Accept Rate</span>
                    <span className="text-xs sm:text-sm font-bold text-accent">{provider.acceptRate}%</span>
                  </div>
                  <Progress value={provider.acceptRate} className="h-2 sm:h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium">Cancellation Rate</span>
                    <span className="text-xs sm:text-sm font-bold text-destructive">{cancellationRate}%</span>
                  </div>
                  <Progress value={Number(cancellationRate)} className="h-2 sm:h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-xs sm:text-sm font-bold text-primary">
                      {((provider.rating / 5) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(provider.rating / 5) * 100} className="h-2 sm:h-3" />
                </div>
              </div>

              {provider.cancellations > 5 && (
                <div className="mt-4 p-3 sm:p-4 bg-destructive/10 border border-destructive/20 rounded-lg sm:rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-destructive-foreground mb-1">
                      Cancellation History Notice
                    </div>
                    <div className="text-destructive">
                      This provider has {provider.cancellations} cancellations ({cancellationRate}%
                      cancellation rate). Please review their reliability score before booking.
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Reviews */}
            <Card className="p-4 sm:p-6 rounded-xl">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Reviews & Ratings</h2>
              <div className="space-y-3 sm:space-y-4">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="pb-3 sm:pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="font-semibold text-sm sm:text-base">{review.userName}</div>
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">{review.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 sm:p-6 rounded-xl lg:sticky lg:top-24">
              <div className="mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  Rs {provider.basePrice}
                  <span className="text-sm sm:text-base font-normal text-muted-foreground">/service</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Base price</div>
              </div>

              <Separator className="my-4 sm:my-6" />

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <h3 className="font-semibold text-sm sm:text-base">Pricing Breakdown</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-medium">Rs {provider.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking Charge</span>
                    <span className="font-medium">Rs {provider.bookingCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span className="font-medium">Rs {provider.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">Rs {provider.serviceFee}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-sm sm:text-base">
                    <span>Total</span>
                    <span className="text-primary">
                      Rs{" "}
                      {provider.basePrice +
                        provider.bookingCharge +
                        provider.consultationFee +
                        provider.serviceFee}
                    </span>
                  </div>
                </div>
              </div>

              <Link to={`/booking/${provider.id}`} className="block">
                <Button size="lg" className="w-full rounded-xl mb-2 sm:mb-3 text-sm sm:text-base">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Book Now
                </Button>
              </Link>

              <Button
                size="lg"
                variant={isFavoriteProvider(provider.id) ? "default" : "outline"}
                className="w-full rounded-xl text-sm sm:text-base mb-2 sm:mb-3"
                onClick={() => toggleFavoriteProvider(provider.id)}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
                    isFavoriteProvider(provider.id) ? "fill-current" : ""
                  }`}
                />
                {isFavoriteProvider(provider.id) ? "Saved Provider" : "Save Provider"}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-xl text-sm sm:text-base"
                onClick={() => setMessage(`Message sent to ${provider.name}. They will respond shortly.`)}
              >
                Send Message
              </Button>

              <Separator className="my-4 sm:my-6" />

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span>Background verified</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span>Insurance covered</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span>Top rated provider</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
