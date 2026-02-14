import { useState } from "react";
import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Calendar } from "../components/ui/calendar";
import { useParams, useNavigate } from "react-router";
import {
  Star,
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { mockProviders } from "../data/mock-data";

export function BookingConfirmationPage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const provider = mockProviders.find((p) => p.id === providerId);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("10:00");
  const [bookingType, setBookingType] = useState<"one-time" | "contract">("one-time");

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

  const hasPreviousCancellations = provider.cancellations > 0;
  const cancellationFee = hasPreviousCancellations ? 15 : 0;
  const total =
    provider.basePrice +
    provider.bookingCharge +
    provider.consultationFee +
    provider.serviceFee +
    cancellationFee;

  const handleConfirmBooking = () => {
    // In a real app, this would make an API call
    navigate("/user-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Booking</h1>
          <p className="text-gray-600">
            Review the details and complete your service booking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Info */}
            <Card className="p-6 rounded-xl">
              <h2 className="font-semibold mb-4">Selected Provider</h2>
              <div className="flex gap-4">
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <Badge variant="secondary" className="rounded-lg">
                      {provider.reliabilityScore}% Reliability
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {provider.services.slice(0, 3).map((service) => (
                      <Badge key={service} variant="outline" className="text-xs rounded-lg">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Date & Time Selection */}
            <Card className="p-6 rounded-xl">
              <h2 className="font-semibold mb-4">Select Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-3 block">
                    <CalendarIcon className="w-4 h-4 inline mr-2" />
                    Choose Date
                  </Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div>
                  <Label className="mb-3 block">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Choose Time
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "09:00",
                      "10:00",
                      "11:00",
                      "12:00",
                      "14:00",
                      "15:00",
                      "16:00",
                      "17:00",
                    ].map((t) => (
                      <Button
                        key={t}
                        variant={time === t ? "default" : "outline"}
                        onClick={() => setTime(t)}
                        className="rounded-xl"
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Booking Type */}
            <Card className="p-6 rounded-xl">
              <h2 className="font-semibold mb-4">Booking Type</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  onClick={() => setBookingType("one-time")}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    bookingType === "one-time"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">One-time Service</h3>
                    {bookingType === "one-time" && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Book for a single service appointment
                  </p>
                </div>
                <div
                  onClick={() => setBookingType("contract")}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    bookingType === "contract"
                      ? "border-accent bg-accent/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Contract-based</h3>
                    {bookingType === "contract" && (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Regular service with recurring appointments
                  </p>
                </div>
              </div>
            </Card>

            {/* Warnings */}
            {provider.cancellations > 3 && (
              <Card className="p-4 rounded-xl bg-yellow-50 border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold text-yellow-900 mb-1">
                      Provider Cancellation Notice
                    </div>
                    <div className="text-yellow-800">
                      This provider has {provider.cancellations} previous cancellations. If they
                      cancel this booking, their reliability score will drop by 5-10 points.
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-4 rounded-xl bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-blue-900 mb-1">Cancellation Policy</div>
                  <div className="text-blue-800">
                    If you cancel within 24 hours of the appointment, a $15 cancellation fee will
                    apply and your user rating may be affected.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-xl sticky top-24">
              <h2 className="font-semibold mb-4">Booking Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-600 mb-1">Date & Time</div>
                  <div className="font-medium">
                    {date?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-sm text-gray-700">{time}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-600 mb-1">Booking Type</div>
                  <div className="font-medium capitalize">{bookingType}</div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2 mb-4">
                <h3 className="font-semibold mb-3">Price Breakdown</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-medium">${provider.basePrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking Charge</span>
                  <span className="font-medium">${provider.bookingCharge}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-medium">${provider.consultationFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">${provider.serviceFee}</span>
                </div>
                {hasPreviousCancellations && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      Cancellation Insurance
                      <AlertTriangle className="w-3 h-3 text-yellow-600" />
                    </span>
                    <span className="font-medium text-yellow-700">${cancellationFee}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total}</span>
                </div>
              </div>

              {hasPreviousCancellations && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800">
                  Cancellation insurance added due to provider's previous cancellations
                </div>
              )}

              <Button
                size="lg"
                className="w-full rounded-xl mb-3"
                onClick={handleConfirmBooking}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Confirm & Pay ${total}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Separator className="my-4" />

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
