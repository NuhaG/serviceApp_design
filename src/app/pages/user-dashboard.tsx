import { useState } from "react";
import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import {
  Star,
  Calendar,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { useThemeClass } from "../hooks/useThemeClass";
import { useMarketplaceData } from "../hooks/useMarketplaceData";

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("active");
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const themeClass = useThemeClass();
  const {
    currentUser,
    userBookings,
    providers,
    loading,
    addReview,
    cancelUserBooking,
    rescheduleBooking,
    favoriteProviderIds,
  } = useMarketplaceData();
  const savedProviders = providers.filter((provider) => favoriteProviderIds.includes(provider.id));

  // Calculate stats from mock data
  const activeBookings = userBookings.filter(b => b.status === "confirmed" || b.status === "pending");
  const cancelledBookings = userBookings.filter(b => b.status === "cancelled");
  const completedBookings = userBookings.filter(b => b.status === "completed");
  const contractBookings = userBookings.filter(
    (b) => b.type === "contract" && (b.status === "pending" || b.status === "confirmed")
  );

  // Get average rating from providers
  const avgRating = providers.length > 0
    ? (providers.reduce((sum, p) => sum + p.rating, 0) / providers.length).toFixed(1)
    : 0;

  const stats = {
    personalRating: avgRating,
    totalBookings: userBookings.length,
    cancelledBookings: cancelledBookings.length,
    activeContracts: contractBookings.length,
  };

  const cancellationRate = stats.totalBookings > 0
    ? ((stats.cancelledBookings / stats.totalBookings) * 100).toFixed(1)
    : 0;
  const reviewedProviderIds = new Set(
    providers
      .filter((provider) =>
        provider.reviews.some((review) => review.userName === (currentUser?.name ?? ""))
      )
      .map((provider) => provider.id)
  );

  const handleReviewSubmit = async (providerId: string) => {
    if (!reviewComment.trim()) {
      setReviewMessage("Please enter a review comment before submitting.");
      return;
    }

    await addReview(providerId, reviewRating, reviewComment);
    setReviewMessage("Review submitted successfully.");
    setEditingBookingId(null);
    setReviewRating(5);
    setReviewComment("");
  };

  const handleCancelBooking = async (bookingId: string) => {
    await cancelUserBooking(bookingId);
    setActionMessage("Booking cancelled successfully.");
  };

  const handleRescheduleBooking = async (bookingId: string) => {
    if (!rescheduleDate || !rescheduleTime) {
      setActionMessage("Choose both a new date and time to reschedule.");
      return;
    }
    await rescheduleBooking(bookingId, rescheduleDate, rescheduleTime);
    setActionMessage("Booking rescheduled successfully.");
    setRescheduleBookingId(null);
    setRescheduleDate("");
    setRescheduleTime("");
  };

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6 overflow-hidden border-border/70 rounded-lg">
          <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary/30" />
          <div className="p-4 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{currentUser?.name ?? "User"} Booking Hub</h1>
              <p className="text-muted-foreground">Track upcoming services, history, and contracts in one place.</p>
            </div>
            <Badge variant="outline" className="w-fit rounded-md border-primary/30 text-primary">
              {activeBookings.length} active bookings
            </Badge>
          </div>
        </Card>
        {reviewMessage && (
          <Card className="p-4 rounded-lg mb-6 border-emerald-500/30 bg-emerald-500/10">
            <p className="text-emerald-700 dark:text-emerald-300 text-sm">{reviewMessage}</p>
          </Card>
        )}
        {actionMessage && (
          <Card className="p-4 rounded-lg mb-6 border-blue-500/30 bg-blue-500/10">
            <p className="text-blue-700 dark:text-blue-300 text-sm">{actionMessage}</p>
          </Card>
        )}
        {loading && (
          <Card className="p-4 rounded-lg mb-6">
            <p className="text-muted-foreground">Loading bookings...</p>
          </Card>
        )}
        {savedProviders.length > 0 && (
          <Card className="p-4 sm:p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-3">Saved Providers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedProviders.slice(0, 6).map((provider) => (
                <Link key={provider.id} to={`/provider/${provider.id}`}>
                  <div className="p-3 rounded-lg border hover:border-primary/40 transition-colors">
                    <div className="font-medium text-sm">{provider.name}</div>
                    <div className="text-xs text-muted-foreground">{provider.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 sm:p-5 rounded-lg border-l-4 border-l-amber-400">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.personalRating}</div>
            <div className="text-sm text-muted-foreground">Your Rating</div>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(stats.personalRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground"
                    }`}
                />
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-5 rounded-lg border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalBookings}</div>
            <div className="text-sm text-muted-foreground">Total Bookings</div>
            <div className="text-xs text-muted-foreground mt-2">All time</div>
          </Card>

          <Card className="p-4 sm:p-5 rounded-lg border-l-4 border-l-rose-500">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-500/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 dark:text-rose-500" />
              </div>
              {Number(cancellationRate) > 10 && (
                <Badge className="bg-rose-500/20 text-rose-600 dark:text-rose-500 rounded-lg">High</Badge>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">
              {stats.cancelledBookings}
            </div>
            <div className="text-sm text-muted-foreground">Cancellations</div>
            <div className="text-xs text-rose-600 dark:text-rose-500 mt-2">{cancellationRate}% rate</div>
          </Card>

          <Card className="p-4 sm:p-5 rounded-lg border-l-4 border-l-accent">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              {stats.activeContracts}
            </div>
            <div className="text-sm text-muted-foreground">Active Contracts</div>
            <div className="text-xs text-muted-foreground mt-2">Recurring services</div>
          </Card>
        </div>

        {/* Cancellation Warning */}
        {Number(cancellationRate) > 10 && (
          <Card className="p-4 rounded-lg bg-rose-500/10 border-rose-500/20 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-rose-700 dark:text-rose-600 mb-1">
                  High Cancellation Rate Warning
                </div>
                <div className="text-rose-600 dark:text-rose-500">
                  Your cancellation rate ({cancellationRate}%) is higher than average. Future
                  cancellations may result in additional fees and could affect your ability to
                  book premium providers.
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Personal Rating Breakdown */}
        <Card className="p-4 sm:p-6 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-semibold">Your Rating Breakdown</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-sm font-bold text-primary">{stats.personalRating}/5.0</span>
              </div>
              <Progress value={(stats.personalRating / 5) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Reliability</span>
                <span className="text-sm font-bold text-accent">
                  {(100 - Number(cancellationRate)).toFixed(0)}%
                </span>
              </div>
              <Progress value={100 - Number(cancellationRate)} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Provider Feedback</span>
                <span className="text-sm font-bold text-primary">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-3" />
            </div>
          </div>
          {Number(cancellationRate) < 5 && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-sm text-emerald-700 dark:text-emerald-300">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Excellent reliability! You qualify for priority booking with top-rated providers.
            </div>
          )}
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full sm:max-w-md grid-cols-3 rounded-md">
            <TabsTrigger value="active" className="rounded-lg">
              Active
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg">
              History
            </TabsTrigger>
            <TabsTrigger value="contracts" className="rounded-lg">
              Contracts
            </TabsTrigger>
          </TabsList>

          {/* Active Bookings */}
          <TabsContent value="active" className="space-y-4">
            {userBookings
              .filter((b) => b.status === "confirmed" || b.status === "pending")
              .map((booking) => (
                <Card key={booking.id} className="p-4 sm:p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.providerName}</h3>
                        <Badge
                          className={`rounded-lg ${booking.status === "confirmed"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                            }`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">Rs {booking.amount}</div>
                    </div>
                  </div>
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {booking.date}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                      <Clock className="w-3.5 h-3.5" />
                      {booking.time}
                    </span>
                    <Badge variant="outline" className="rounded-md capitalize">
                      {booking.type}
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to={`/provider/${booking.providerId}`} className="flex-1">
                      <Button className="w-full rounded-lg" variant="outline">
                        View Provider
                      </Button>
                    </Link>
                    <Button
                      className="flex-1 rounded-lg"
                      variant="outline"
                      onClick={() =>
                        setRescheduleBookingId(
                          rescheduleBookingId === booking.id ? null : booking.id
                        )
                      }
                    >
                      Reschedule
                    </Button>
                    <Button
                      className="flex-1 rounded-lg border-rose-600 text-rose-600 dark:text-rose-500 hover:bg-rose-500/10"
                      variant="outline"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                  {rescheduleBookingId === booking.id && (
                    <div className="mt-3 p-3 rounded-lg border bg-muted/30">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Input
                          type="date"
                          value={rescheduleDate}
                          onChange={(event) => setRescheduleDate(event.target.value)}
                        />
                        <Input
                          type="time"
                          value={rescheduleTime}
                          onChange={(event) => setRescheduleTime(event.target.value)}
                        />
                      </div>
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={() => handleRescheduleBooking(booking.id)}
                      >
                        Confirm Reschedule
                      </Button>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-muted-foreground">
                    Late cancellation fee may apply within 24 hours.
                  </p>
                </Card>
              ))}
            {userBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
              .length === 0 && (
                <Card className="p-12 text-center rounded-lg">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No active bookings</p>
                  <Link to="/search">
                    <Button className="rounded-lg">Browse Services</Button>
                  </Link>
                </Card>
              )}
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Card className="p-4 rounded-lg bg-emerald-500/10 border-emerald-500/25">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
                      {userBookings.filter((b) => b.status === "completed").length}
                    </div>
                    <div className="text-sm text-emerald-700 dark:text-emerald-300">Completed Bookings</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 rounded-lg bg-rose-500/10 border-rose-500/20">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-500" />
                  <div>
                    <div className="text-2xl font-bold text-rose-700 dark:text-rose-600">
                      {stats.cancelledBookings}
                    </div>
                    <div className="text-sm text-rose-600 dark:text-rose-500">Cancelled Bookings</div>
                  </div>
                </div>
              </Card>
            </div>

            {userBookings
              .filter((b) => b.status === "completed")
              .map((booking) => (
                <Card key={booking.id} className="p-4 sm:p-6 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{booking.providerName}</h3>
                        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-lg">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <div className="flex items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                        <span>{booking.date}</span>
                        <span>|</span>
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <div className="text-xl font-bold">Rs {booking.amount}</div>
                      {reviewedProviderIds.has(booking.providerId) ? (
                        <Badge className="rounded-lg mt-2 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                          Review submitted
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg mt-2"
                          onClick={() => {
                            setReviewMessage(null);
                            setEditingBookingId(
                              editingBookingId === booking.id ? null : booking.id
                            );
                          }}
                        >
                          {editingBookingId === booking.id ? "Close Review" : "Leave Review"}
                        </Button>
                      )}
                    </div>
                  </div>
                  {editingBookingId === booking.id && (
                    <div className="mt-4 border rounded-lg p-4 bg-muted/30">
                      <p className="text-sm font-medium mb-3">Add your review</p>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            size="sm"
                            variant={reviewRating === rating ? "default" : "outline"}
                            onClick={() => setReviewRating(rating)}
                          >
                            {rating} Star
                          </Button>
                        ))}
                      </div>
                      <Textarea
                        value={reviewComment}
                        onChange={(event) => setReviewComment(event.target.value)}
                        placeholder="Write your experience..."
                        className="mb-3"
                      />
                      <Button onClick={() => handleReviewSubmit(booking.providerId)}>
                        Submit Review
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
          </TabsContent>

          {/* Contracts */}
          <TabsContent value="contracts" className="space-y-4">
            {userBookings
              .filter((b) => b.type === "contract" && (b.status === "pending" || b.status === "confirmed"))
              .map((booking) => (
                <Card key={booking.id} className="p-4 sm:p-6 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.providerName}</h3>
                        <Badge className="bg-accent text-white rounded-lg">Active Contract</Badge>
                      </div>
                      <p className="text-muted-foreground">{booking.service}</p>
                      <p className="text-sm text-muted-foreground mt-1">Recurring every week</p>
                    </div>
                    <div className="sm:text-right">
                      <div className="text-2xl font-bold text-primary">Rs {booking.amount}</div>
                      <div className="text-xs text-muted-foreground">per service</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Next Appointment</div>
                      <div className="font-medium">{booking.date}</div>
                      <div className="text-sm text-muted-foreground">{booking.time}</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Contract Started</div>
                      <div className="font-medium">2026-01-15</div>
                      <div className="text-sm text-muted-foreground">4 weeks ago</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 rounded-lg"
                      variant="outline"
                      onClick={() =>
                        setActionMessage(`Contract management panel opened for ${booking.providerName}.`)
                      }
                    >
                      Manage Contract
                    </Button>
                    <Button
                      className="flex-1 rounded-lg"
                      variant="outline"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Pause Contract
                    </Button>
                  </div>
                </Card>
              ))}
            {userBookings.filter((b) => b.type === "contract" && (b.status === "pending" || b.status === "confirmed")).length === 0 && (
              <Card className="p-8 sm:p-12 text-center rounded-lg">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No active contracts</p>
                <Link to="/search">
                  <Button className="rounded-lg">Find Contract Services</Button>
                </Link>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
