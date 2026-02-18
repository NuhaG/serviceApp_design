import { useMemo, useState } from "react";
import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Users,
  Briefcase,
  ShieldAlert,
  TrendingDown,
  Flag,
  Ban,
  Search,
  Star,
  AlertTriangle,
} from "lucide-react";
import { useThemeClass } from "../hooks/useThemeClass";
import { useMarketplaceData } from "../hooks/useMarketplaceData";
import { Link } from "react-router";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchText, setSearchText] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const themeClass = useThemeClass();
  const { providers, userBookings, loading, moderateProvider } = useMarketplaceData();

  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredProviders = useMemo(
    () =>
      providers.filter((provider) => {
        if (!normalizedSearch) return true;
        return (
          provider.name.toLowerCase().includes(normalizedSearch) ||
          provider.location.toLowerCase().includes(normalizedSearch) ||
          provider.services.some((service) => service.toLowerCase().includes(normalizedSearch))
        );
      }),
    [providers, normalizedSearch]
  );

  const lowRatedProviders = providers.filter((provider) => provider.reliabilityScore < 90);
  const avgReliability =
    providers.length > 0
      ? Math.round(
          providers.reduce((sum, provider) => sum + provider.reliabilityScore, 0) / providers.length
        )
      : 0;

  const stats = {
    totalProviders: providers.length,
    totalUsers: Math.max(userBookings.length * 3, 8934),
    blockedProviders: providers.filter((provider) => provider.blocked).length,
    lowRatedUsers: lowRatedProviders.length,
    flaggedAccounts: providers.filter((provider) => (provider.flaggedCount ?? 0) > 0).length,
    avgReliability,
  };

  const providerQualityPct =
    providers.length > 0
      ? (providers.filter((provider) => provider.reliabilityScore >= 90).length / providers.length) *
        100
      : 0;

  const flaggedProviders = providers.filter((provider) => (provider.flaggedCount ?? 0) > 0);
  const uniqueUsers = Array.from(new Set(userBookings.map((booking) => booking.providerName))).slice(
    0,
    10
  );

  const handleModeration = async (providerId: string, action: "flag" | "block" | "unblock") => {
    await moderateProvider(providerId, action);
    if (action === "flag") setNotice("Provider flagged for manual review.");
    if (action === "block") setNotice("Provider blocked successfully.");
    if (action === "unblock") setNotice("Provider unblocked successfully.");
  };

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <Card className="p-4 mb-6">
            <p className="text-muted-foreground">Loading platform data...</p>
          </Card>
        )}
        {notice && (
          <Card className="p-4 mb-6 border-blue-500/30 bg-blue-500/10">
            <p className="text-sm text-blue-700 dark:text-blue-300">{notice}</p>
          </Card>
        )}

        <Card className="mb-8 overflow-hidden border-border/70 rounded-lg">
          <div className="h-1.5 bg-gradient-to-r from-rose-500 via-accent to-primary" />
          <div className="p-4 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary rounded-md flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Control Center</h1>
                <p className="text-muted-foreground">Platform management and monitoring</p>
              </div>
            </div>
            <Badge variant="outline" className="w-fit rounded-md border-rose-500/40 text-rose-600 dark:text-rose-500">
              {stats.flaggedAccounts} flagged accounts
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 border-t-2 border-t-primary/60">
            <Briefcase className="w-6 h-6 text-primary mb-2" />
            <div className="text-xl font-semibold">{stats.totalProviders}</div>
            <div className="text-xs text-muted-foreground">Total Providers</div>
          </Card>
          <Card className="p-4 border-t-2 border-t-accent/60">
            <Users className="w-6 h-6 text-accent mb-2" />
            <div className="text-xl font-semibold">{stats.totalUsers}</div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </Card>
          <Card className="p-4 bg-rose-500/10 border border-rose-500/30">
            <Ban className="w-6 h-6 text-rose-600 dark:text-rose-500 mb-2" />
            <div className="text-xl font-semibold text-rose-600 dark:text-rose-500">
              {stats.blockedProviders}
            </div>
            <div className="text-xs text-rose-600 dark:text-rose-500">Blocked Providers</div>
          </Card>
          <Card className="p-4 bg-accent/10 border border-accent/30">
            <TrendingDown className="w-6 h-6 text-accent mb-2" />
            <div className="text-xl font-semibold text-accent">{stats.lowRatedUsers}</div>
            <div className="text-xs text-accent">Low-Reliability Providers</div>
          </Card>
          <Card className="p-4 bg-accent/10 border border-accent/30">
            <Flag className="w-6 h-6 text-accent mb-2" />
            <div className="text-xl font-semibold text-accent">{stats.flaggedAccounts}</div>
            <div className="text-xs text-accent">Flagged Accounts</div>
          </Card>
          <Card className="p-4 border-t-2 border-t-primary/40">
            <Star className="w-6 h-6 text-primary mb-2" />
            <div className="text-xl font-semibold">{stats.avgReliability}%</div>
            <div className="text-xs text-muted-foreground">Avg Reliability</div>
          </Card>
        </div>

        <Card className="p-4 mb-8 rounded-lg border-border/80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search providers by name, location, or service..."
              className="pl-10 h-12"
            />
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-2 sm:grid-cols-4 mb-6 rounded-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="flagged">Flagged ({stats.flaggedAccounts})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Platform Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Reliability</span>
                    <span>{stats.avgReliability}%</span>
                  </div>
                  <Progress value={stats.avgReliability} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Provider Quality (90%+)</span>
                    <span>{providerQualityPct.toFixed(0)}%</span>
                  </div>
                  <Progress value={providerQualityPct} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Blocked Providers Ratio</span>
                    <span>
                      {providers.length > 0
                        ? ((stats.blockedProviders / providers.length) * 100).toFixed(1)
                        : "0.0"}
                      %
                    </span>
                  </div>
                  <Progress
                    value={providers.length > 0 ? (stats.blockedProviders / providers.length) * 100 : 0}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            {filteredProviders.map((provider) => {
              const cancellationRate = ((provider.cancellations / provider.totalBookings) * 100).toFixed(
                1
              );
              const isLowReliability = provider.reliabilityScore < 90;
              const hasHighCancel = Number(cancellationRate) > 5;

              return (
                <Card key={provider.id} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                    <div className="flex gap-4">
                      <img
                        src={provider.photo}
                        alt={provider.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{provider.name}</h4>
                        <div className="text-sm text-muted-foreground">ID: {provider.id}</div>
                        <div className="text-xs text-muted-foreground">{provider.location}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Badge
                        className={
                          isLowReliability
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-500"
                            : "bg-primary/10 text-primary"
                        }
                      >
                        {provider.reliabilityScore}% Reliability
                      </Badge>
                      {provider.blocked && (
                        <Badge className="bg-rose-500/20 text-rose-700 dark:text-rose-300">Blocked</Badge>
                      )}
                      {(provider.flaggedCount ?? 0) > 0 && (
                        <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300">
                          Flagged x{provider.flaggedCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground">Accept Rate</div>
                      <div className="font-semibold">{provider.acceptRate}%</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground">Cancellations</div>
                      <div className="font-semibold">{provider.cancellations}</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground">Cancel Rate</div>
                      <div
                        className={
                          hasHighCancel
                            ? "font-semibold text-rose-600 dark:text-rose-500"
                            : "font-semibold"
                        }
                      >
                        {cancellationRate}%
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className={provider.blocked ? "font-semibold text-rose-600" : "font-semibold text-primary"}>
                        {provider.blocked ? "Blocked" : "Active"}
                      </div>
                    </div>
                  </div>

                  {(isLowReliability || hasHighCancel) && (
                    <div className="mb-4 p-3 bg-accent/10 border border-accent/30 rounded-lg text-sm">
                      <AlertTriangle className="w-4 h-4 inline mr-2 text-accent" />
                      {isLowReliability && "Low reliability detected. "}
                      {hasHighCancel && "High cancellation rate requires review."}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Link to={`/provider/${provider.id}`}>
                      <Button variant="outline">View Profile</Button>
                    </Link>
                    <Button variant="outline" onClick={() => handleModeration(provider.id, "flag")}>
                      <Flag className="w-4 h-4 mr-2" />
                      Flag Account
                    </Button>
                    {provider.blocked ? (
                      <Button variant="outline" onClick={() => handleModeration(provider.id, "unblock")}>
                        Unblock Provider
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="text-rose-600 dark:text-rose-500 border-rose-500/40"
                        onClick={() => handleModeration(provider.id, "block")}
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Block Provider
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
            {filteredProviders.length === 0 && (
              <Card className="p-10 text-center rounded-lg">
                <p className="text-muted-foreground">No providers matched your search.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {uniqueUsers.map((userName, index) => {
              const userBookingsCount = userBookings.filter(
                (booking) => booking.providerName === userName
              ).length;

              return (
                <Card key={userName} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold">{userName}</h4>
                      <div className="text-sm text-muted-foreground">ID: U{1000 + index}</div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      {userBookingsCount} bookings
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => setNotice(`Viewing history for ${userName}.`)}>
                      View History
                    </Button>
                    <Button variant="outline" onClick={() => setNotice(`Warning sent to ${userName}.`)}>
                      Send Warning
                    </Button>
                    <Button
                      variant="outline"
                      className="text-rose-600 dark:text-rose-500 border-rose-500/40"
                      onClick={() => setNotice(`Booking privileges restricted for ${userName}.`)}
                    >
                      Restrict Booking
                    </Button>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="flagged" className="space-y-6">
            {flaggedProviders.map((provider) => (
              <Card key={provider.id} className="p-6 border-2 border-accent/40">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Flags: {provider.flaggedCount ?? 0} | Location: {provider.location}
                    </p>
                  </div>
                  <Badge className="bg-accent/10 text-accent">Flagged</Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg mb-4 text-sm">
                  Provider was flagged due to reliability or cancellation risk. Review details and
                  take action.
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to={`/provider/${provider.id}`}>
                    <Button>Review Details</Button>
                  </Link>
                  <Button variant="outline" onClick={() => handleModeration(provider.id, "unblock")}>
                    Dismiss Flag
                  </Button>
                  <Button
                    variant="outline"
                    className="text-rose-600 dark:text-rose-500 border-rose-500/40"
                    onClick={() => handleModeration(provider.id, "block")}
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Block Account
                  </Button>
                </div>
              </Card>
            ))}
            {flaggedProviders.length === 0 && (
              <Card className="p-10 text-center rounded-lg">
                <p className="text-muted-foreground">No flagged providers right now.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
