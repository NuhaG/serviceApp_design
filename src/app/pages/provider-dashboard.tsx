import { useEffect, useMemo, useState } from "react";
import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  TrendingUp,
  IndianRupee,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useThemeClass } from "../hooks/useThemeClass";
import { useMarketplaceData } from "../hooks/useMarketplaceData";
import { Booking } from "../data/mock-data";

export function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  const [bookingSearch, setBookingSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "confirmed" | "completed" | "cancelled"
  >("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const themeClass = useThemeClass();
  const { providerBookings, providers, loading } = useMarketplaceData();

  useEffect(() => {
    setBookings(providerBookings);
  }, [providerBookings]);

  useEffect(() => {
    if (!selectedProviderId && providers.length > 0) {
      setSelectedProviderId(providers[0].id);
    }
  }, [providers, selectedProviderId]);

  const selectedProvider = useMemo(
    () => providers.find((provider) => provider.id === selectedProviderId) ?? null,
    [providers, selectedProviderId]
  );

  const providerBookingsOnly = useMemo(
    () => bookings.filter((booking) => booking.providerId === selectedProviderId),
    [bookings, selectedProviderId]
  );

  const filteredBookings = useMemo(() => {
    const normalized = bookingSearch.trim().toLowerCase();
    return providerBookingsOnly.filter((booking) => {
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      const matchesSearch =
        normalized.length === 0 ||
        booking.providerName.toLowerCase().includes(normalized) ||
        booking.service.toLowerCase().includes(normalized);
      return matchesStatus && matchesSearch;
    });
  }, [providerBookingsOnly, statusFilter, bookingSearch]);

  const pendingBookings = providerBookingsOnly.filter((booking) => booking.status === "pending");
  const confirmedBookings = providerBookingsOnly.filter(
    (booking) => booking.status === "confirmed"
  );
  const completedBookings = providerBookingsOnly.filter(
    (booking) => booking.status === "completed"
  );
  const cancelledBookings = providerBookingsOnly.filter(
    (booking) => booking.status === "cancelled"
  );

  const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.amount, 0);
  const monthlyEarnings = Math.round(totalEarnings * 0.24);
  const totalHandled = providerBookingsOnly.length;
  const acceptedCount = completedBookings.length + confirmedBookings.length;
  const liveAcceptRate = totalHandled > 0 ? Math.round((acceptedCount / totalHandled) * 100) : 0;

  const stats = {
    reliabilityScore: selectedProvider?.reliabilityScore ?? 0,
    totalEarnings: Math.round(totalEarnings),
    monthlyEarnings,
    pendingRequests: pendingBookings.length,
    upcomingBookings: confirmedBookings.length,
    cancellations: cancelledBookings.length,
    acceptRate: liveAcceptRate,
  };

  const handleStatusChange = (bookingId: string, nextStatus: Booking["status"], note: string) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === bookingId ? { ...booking, status: nextStatus } : booking
      )
    );
    setInfoMessage(note);
  };

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6 overflow-hidden border-border/70 rounded-lg">
          <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary/40" />
          <div className="p-4 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Provider Operations</h1>
              <p className="text-muted-foreground">
                {selectedProvider?.name ?? "Selected provider"} in {selectedProvider?.location ?? "India"}
              </p>
            </div>
            <Badge variant="outline" className="w-fit rounded-md border-primary/30 text-primary">
              {stats.pendingRequests} requests awaiting action
            </Badge>
          </div>
        </Card>
        {loading && (
          <Card className="p-4 rounded-lg mb-6">
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </Card>
        )}
        {infoMessage && (
          <Card className="p-4 rounded-lg mb-6 border-emerald-500/30 bg-emerald-500/10">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">{infoMessage}</p>
          </Card>
        )}

        <Card className="p-4 sm:p-6 rounded-lg mb-6 border-border/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Select Provider</p>
              <Select value={selectedProviderId} onValueChange={setSelectedProviderId}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Choose provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name} - {provider.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Search Bookings</p>
              <Input
                value={bookingSearch}
                onChange={(event) => setBookingSearch(event.target.value)}
                placeholder="Search customer or service..."
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Status Filter</p>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 rounded-lg border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-lg">
                Live
              </Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.reliabilityScore}%</div>
            <div className="text-sm text-muted-foreground">Reliability Score</div>
            <Progress value={stats.reliabilityScore} className="h-2 mt-3" />
          </Card>

          <Card className="p-5 rounded-lg border-l-4 border-l-accent">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">Rs {stats.monthlyEarnings}</div>
            <div className="text-sm text-muted-foreground">Estimated This Month</div>
            <div className="text-xs text-muted-foreground mt-2">
              Total: Rs {stats.totalEarnings.toLocaleString()}
            </div>
          </Card>

          <Card className="p-5 rounded-lg border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              {stats.pendingRequests > 0 && (
                <Badge className="bg-rose-500/20 text-rose-600 dark:text-rose-500 rounded-lg">
                  {stats.pendingRequests} New
                </Badge>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">{stats.upcomingBookings}</div>
            <div className="text-sm text-muted-foreground">Upcoming Bookings</div>
            <div className="text-xs text-muted-foreground mt-2">
              {stats.pendingRequests} pending requests
            </div>
          </Card>

          <Card className="p-5 rounded-lg border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.acceptRate}%</div>
            <div className="text-sm text-muted-foreground">Current Accept Rate</div>
            <div className="text-xs text-muted-foreground mt-2">
              {stats.cancellations} cancellations
            </div>
          </Card>
        </div>

        <Card className="p-4 rounded-lg bg-amber-500/10 border-amber-500/25 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Reliability Score Impact Notice
              </div>
              <div className="text-amber-700 dark:text-amber-300">
                Accepting and completing jobs improves reliability. Rejections and cancellations
                lower ranking and visibility.
              </div>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 rounded-md">
            <TabsTrigger value="requests" className="rounded-lg">
              Requests ({pendingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="rounded-lg">
              Upcoming ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg">
              History ({completedBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {filteredBookings
              .filter((booking) => booking.status === "pending")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-lg">
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
                      <div className="text-2xl font-bold text-primary">Rs {booking.amount}</div>
                      <div className="text-xs text-muted-foreground">Your earnings</div>
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
                    <Button
                      className="flex-1 rounded-lg bg-accent hover:bg-accent/90"
                      onClick={() =>
                        handleStatusChange(booking.id, "confirmed", "Booking accepted and moved to upcoming.")
                      }
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-lg border-rose-600 text-rose-600 dark:text-rose-500 hover:bg-rose-500/10"
                      onClick={() =>
                        handleStatusChange(booking.id, "cancelled", "Booking rejected and moved to cancelled.")
                      }
                    >
                      <XCircle className="w-4 h-4 mr-2 text-rose-600 dark:text-rose-500" />
                      Reject
                    </Button>
                  </div>
                </Card>
              ))}
            {filteredBookings.filter((booking) => booking.status === "pending").length === 0 && (
              <Card className="p-12 text-center rounded-lg">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No pending requests for this provider.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {filteredBookings
              .filter((booking) => booking.status === "confirmed")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-lg">
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
                    <Button
                      className="flex-1 rounded-lg"
                      onClick={() =>
                        handleStatusChange(booking.id, "completed", "Booking marked as completed.")
                      }
                    >
                      Mark Completed
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-lg border-rose-600 text-rose-600 dark:text-rose-500 hover:bg-rose-500/10"
                      onClick={() =>
                        handleStatusChange(booking.id, "cancelled", "Booking cancelled by provider.")
                      }
                    >
                      Cancel Booking
                    </Button>
                  </div>
                </Card>
              ))}
            {filteredBookings.filter((booking) => booking.status === "confirmed").length === 0 && (
              <Card className="p-12 text-center rounded-lg">
                <p className="text-muted-foreground">No upcoming bookings match this filter.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {filteredBookings
              .filter((booking) => booking.status === "completed" || booking.status === "cancelled")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-lg opacity-85">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{booking.providerName}</h3>
                        <Badge
                          variant="outline"
                          className={`rounded-lg ${booking.status === "cancelled" ? "text-rose-600 border-rose-300" : ""}`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{booking.date}</span>
                        <span>|</span>
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">Rs {booking.amount}</div>
                    </div>
                  </div>
                </Card>
              ))}
            {filteredBookings.filter((booking) => booking.status === "completed" || booking.status === "cancelled")
              .length === 0 && (
              <Card className="p-12 text-center rounded-lg">
                <p className="text-muted-foreground">No history available for this provider.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
