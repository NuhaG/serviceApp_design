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
  DollarSign,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { mockProviders } from "../data/mock-data";

export function ProviderProfilePage() {
  const { id } = useParams();
  const provider = mockProviders.find((p) => p.id === id);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Provider not found</h1>
        </div>
      </div>
    );
  }

  const cancellationRate = ((provider.cancellations / provider.totalBookings) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="p-8 rounded-xl">
              <div className="flex gap-6 mb-6">
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{provider.name}</h1>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-gray-500 text-sm">
                            ({provider.reviews.length} reviews)
                          </span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {provider.distance} away
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-accent text-white rounded-lg px-4 py-2">
                      <Shield className="w-4 h-4 mr-1 inline" />
                      Verified
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {provider.services.map((service) => (
                      <Badge key={service} variant="outline" className="rounded-lg">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{provider.totalBookings}</div>
                  <div className="text-sm text-gray-600 mt-1">Total Bookings</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-accent">{provider.acceptRate}%</div>
                  <div className="text-sm text-gray-600 mt-1">Accept Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">
                    {provider.reliabilityScore}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Reliability</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-red-600">{provider.cancellations}</div>
                  <div className="text-sm text-gray-600 mt-1">Cancellations</div>
                </div>
              </div>
            </Card>

            {/* Reliability Score Breakdown */}
            <Card className="p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Reliability Score Breakdown</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Reliability</span>
                    <span className="text-sm font-bold text-primary">
                      {provider.reliabilityScore}%
                    </span>
                  </div>
                  <Progress value={provider.reliabilityScore} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Accept Rate</span>
                    <span className="text-sm font-bold text-accent">{provider.acceptRate}%</span>
                  </div>
                  <Progress value={provider.acceptRate} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Cancellation Rate</span>
                    <span className="text-sm font-bold text-red-600">{cancellationRate}%</span>
                  </div>
                  <Progress value={Number(cancellationRate)} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm font-bold text-primary">
                      {((provider.rating / 5) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(provider.rating / 5) * 100} className="h-3" />
                </div>
              </div>

              {provider.cancellations > 5 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold text-red-900 mb-1">
                      Cancellation History Notice
                    </div>
                    <div className="text-red-700">
                      This provider has {provider.cancellations} cancellations ({cancellationRate}%
                      cancellation rate). Please review their reliability score before booking.
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Reviews */}
            <Card className="p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
              <div className="space-y-4">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{review.userName}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-xl sticky top-24">
              <div className="mb-6">
                <div className="text-3xl font-bold text-primary mb-1">
                  ${provider.basePrice}
                  <span className="text-base font-normal text-gray-500">/service</span>
                </div>
                <div className="text-sm text-gray-600">Base price</div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 mb-6">
                <h3 className="font-semibold">Pricing Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium">${provider.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Charge</span>
                    <span className="font-medium">${provider.bookingCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-medium">${provider.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">${provider.serviceFee}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-primary">
                      $
                      {provider.basePrice +
                        provider.bookingCharge +
                        provider.consultationFee +
                        provider.serviceFee}
                    </span>
                  </div>
                </div>
              </div>

              <Link to={`/booking/${provider.id}`}>
                <Button size="lg" className="w-full rounded-xl mb-3">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </Link>

              <Button size="lg" variant="outline" className="w-full rounded-xl">
                Send Message
              </Button>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Background verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Insurance covered</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-primary" />
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
