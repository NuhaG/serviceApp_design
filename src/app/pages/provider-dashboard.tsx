import { useState } from "react";
import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { mockProviderBookings, mockProviders } from "../data/mock-data";
import { useThemeClass } from "../hooks/useThemeClass";

export function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("requests");

  const themeClass = useThemeClass();

  // Calculate stats from mock data
  const pendingBookings = mockProviderBookings.filter(b => b.status === "pending");
  const confirmedBookings = mockProviderBookings.filter(b => b.status === "confirmed");
  const completedBookings = mockProviderBookings.filter(b => b.status === "completed");
  const cancelledBookings = mockProviderBookings.filter(b => b.status === "cancelled");
  
  // Use first provider's stats as reference
  const firstProvider = mockProviders[0];
  const totalEarnings = mockProviderBookings
    .filter(b => b.status === "completed")
    .reduce((sum, b) => sum + b.amount, 0);
  
  const monthlyEarnings = totalEarnings * 0.19; // Approximate last month

  const stats = {
    reliabilityScore: firstProvider?.reliabilityScore || 98,
    totalEarnings: Math.round(totalEarnings),
    monthlyEarnings: Math.round(monthlyEarnings),
    pendingRequests: pendingBookings.length,
    upcomingBookings: confirmedBookings.length,
    cancellations: cancelledBookings.length,
    acceptRate: firstProvider?.acceptRate || 95,
  };

  const handleAccept = (bookingId: string) => {
    console.log("Accepted booking:", bookingId);
  };

  const handleReject = (bookingId: string) => {
    console.log("Rejected booking:", bookingId);
  };

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and track your performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-lg">Excellent</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.reliabilityScore}%</div>
            <div className="text-sm text-muted-foreground">Reliability Score</div>
            <Progress value={stats.reliabilityScore} className="h-2 mt-3" />
          </Card>

          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">₹{stats.monthlyEarnings}</div>
            <div className="text-sm text-muted-foreground">This Month</div>
            <div className="text-xs text-muted-foreground mt-2">Total: ₹{stats.totalEarnings.toLocaleString()}</div>
          </Card>

          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              {stats.pendingRequests > 0 && (
                <Badge className="bg-rose-500/20 text-rose-600 dark:text-rose-500 rounded-lg">
                  {stats.pendingRequests} New
                </Badge>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">{stats.upcomingBookings}</div>
            <div className="text-sm text-muted-foreground">Upcoming Bookings</div>
            <div className="text-xs text-muted-foreground mt-2">{stats.pendingRequests} pending requests</div>
          </Card>

          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.acceptRate}%</div>
            <div className="text-sm text-muted-foreground">Accept Rate</div>
            <div className="text-xs text-muted-foreground mt-2">{stats.cancellations} cancellations</div>
          </Card>
        </div>

        {/* Reliability Impact Notice */}
        <Card className="p-4 rounded-xl bg-amber-50 border-amber-200 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-amber-900 mb-1">
                Reliability Score Impact Notice
              </div>
              <div className="text-amber-800">
                Canceling a booking will reduce your reliability score by 5-10 points. Rejecting
                too many requests may also impact your visibility to customers.
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 rounded-xl">
            <TabsTrigger value="requests" className="rounded-lg">
              Requests ({stats.pendingRequests})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="rounded-lg">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg">
              History
            </TabsTrigger>
          </TabsList>

          {/* Incoming Requests */}
          <TabsContent value="requests" className="space-y-4">
            {mockProviderBookings
              .filter((b) => b.status === "pending")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.providerName}</h3>
                        <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-lg">
                          Pending
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{booking.amount}</div>
                      <div className="text-xs text-muted-foreground">Your earnings</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="rounded-lg capitalize">
                        {booking.type}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 rounded-xl bg-accent hover:bg-accent/90"
                      onClick={() => handleAccept(booking.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-rose-600 text-rose-600 dark:text-rose-500 hover:bg-rose-500/10"
                      onClick={() => handleReject(booking.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2 text-rose-600 dark:text-rose-500" />
                      Reject
                    </Button>
                  </div>

                  <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-600 dark:text-rose-500">
                    <AlertTriangle className="w-3 h-3 inline mr-1 text-rose-600 dark:text-rose-500" />
                    Rejecting this request will decrease your accept rate and may affect your
                    ranking
                  </div>
                </Card>
              ))}
            {mockProviderBookings.filter((b) => b.status === "pending").length === 0 && (
              <Card className="p-12 text-center rounded-xl">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No pending requests at the moment</p>
              </Card>
            )}
          </TabsContent>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {mockProviderBookings
              .filter((b) => b.status === "confirmed")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.providerName}</h3>
                        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-lg">
                          Confirmed
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{booking.amount}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="rounded-lg capitalize">
                        {booking.type}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex gap-3">
                    <Button className="flex-1 rounded-xl" variant="outline">
                      View Details
                    </Button>
                    <Button className="flex-1 rounded-xl" variant="outline">
                      Contact Customer
                    </Button>
                  </div>

                  <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span>
                      Canceling this confirmed booking will reduce your reliability score by 8-10
                      points
                    </span>
                  </div>
                </Card>
              ))}
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            {mockProviderBookings
              .filter((b) => b.status === "completed")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-xl opacity-75">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{booking.providerName}</h3>
                        <Badge variant="outline" className="rounded-lg">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{booking.date}</span>
                        <span>•</span>
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">₹{booking.amount}</div>
                    </div>
                  </div>
                </Card>
              ))}
            <Card className="p-12 text-center rounded-xl">
              <p className="text-muted-foreground">
                Showing recent completed bookings. View full history in your account settings.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
