import { useState } from "react";
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
import { mockProviders, mockUserBookings } from "../data/mock-data";
import { useThemeClass } from "../hooks/useThemeClass";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const themeClass = useThemeClass();

  // Calculate stats from mock data
  const lowRatedProviders = mockProviders.filter(p => p.reliabilityScore < 90);
  const avgReliability = mockProviders.length > 0
    ? Math.round(mockProviders.reduce((sum, p) => sum + p.reliabilityScore, 0) / mockProviders.length)
    : 0;

  const stats = {
    totalProviders: mockProviders.length,
    totalUsers: Math.max(mockUserBookings.length * 3, 8934), // Estimate users from bookings
    blockedProviders: Math.round(mockProviders.length * 0.018), // ~1.8%
    lowRatedUsers: lowRatedProviders.length,
    flaggedAccounts: Math.round(mockProviders.length * 0.01), // ~1%
    avgReliability: avgReliability,
  };

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Platform management and monitoring
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">

          <Card className="p-4">
            <Briefcase className="w-6 h-6 text-primary mb-2" />
            <div className="text-xl font-semibold">{stats.totalProviders}</div>
            <div className="text-xs text-muted-foreground">
              Total Providers
            </div>
          </Card>

          <Card className="p-4">
            <Users className="w-6 h-6 text-accent mb-2" />
            <div className="text-xl font-semibold">{stats.totalUsers}</div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </Card>

          <Card className="p-4 bg-rose-500/10 border border-rose-500/30">
            <Ban className="w-6 h-6 text-rose-600 dark:text-rose-500 mb-2" />
            <div className="text-xl font-semibold text-rose-600 dark:text-rose-500">
              {stats.blockedProviders}
            </div>
            <div className="text-xs text-rose-600 dark:text-rose-500">
              Blocked Providers
            </div>
          </Card>

          <Card className="p-4 bg-accent/10 border border-accent/30">
            <TrendingDown className="w-6 h-6 text-accent mb-2" />
            <div className="text-xl font-semibold text-accent">
              {stats.lowRatedUsers}
            </div>
            <div className="text-xs text-accent">
              Low-Rated Users
            </div>
          </Card>

          <Card className="p-4 bg-accent/10 border border-accent/30">
            <Flag className="w-6 h-6 text-accent mb-2" />
            <div className="text-xl font-semibold text-accent">
              {stats.flaggedAccounts}
            </div>
            <div className="text-xs text-accent">
              Flagged Accounts
            </div>
          </Card>

          <Card className="p-4">
            <Star className="w-6 h-6 text-primary mb-2" />
            <div className="text-xl font-semibold">
              {stats.avgReliability}%
            </div>
            <div className="text-xs text-muted-foreground">
              Avg Reliability
            </div>
          </Card>

        </div>

        {/* Search */}
        <Card className="p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search providers or users..."
              className="pl-10 h-12"
            />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>

          <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="flagged">
              Flagged ({stats.flaggedAccounts})
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
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
                    <span>
                      {(
                        (mockProviders.filter(
                          (p) => p.reliabilityScore >= 90
                        ).length /
                          mockProviders.length) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (mockProviders.filter(
                        (p) => p.reliabilityScore >= 90
                      ).length /
                        mockProviders.length) *
                      100
                    }
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Active Users</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} />
                </div>
              </div>
            </Card>

          </TabsContent>

          {/* PROVIDERS */}
          <TabsContent value="providers" className="space-y-6">

            {mockProviders.map((provider) => {
              const cancellationRate = (
                (provider.cancellations / provider.totalBookings) *
                100
              ).toFixed(1);

              const isLowReliability = provider.reliabilityScore < 90;
              const hasHighCancel = Number(cancellationRate) > 5;

              return (
                <Card key={provider.id} className="p-6">

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">

                    <div className="flex gap-4">
                      <img
                        src={provider.photo}
                        alt={provider.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{provider.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          ID: {provider.id}
                        </div>
                      </div>
                    </div>

                    <Badge
                      className={
                        isLowReliability
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-500"
                          : "bg-primary/10 text-primary"
                      }
                    >
                      {provider.reliabilityScore}% Reliability
                    </Badge>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="p-3 bg-muted rounded-xl">
                      <div className="text-xs text-muted-foreground">
                        Accept Rate
                      </div>
                      <div className="font-semibold">
                        {provider.acceptRate}%
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-xl">
                      <div className="text-xs text-muted-foreground">
                        Cancellations
                      </div>
                      <div className="font-semibold">
                        {provider.cancellations}
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-xl">
                      <div className="text-xs text-muted-foreground">
                        Cancel Rate
                      </div>
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

                    <div className="p-3 bg-muted rounded-xl">
                      <div className="text-xs text-muted-foreground">
                        Status
                      </div>
                      <div className="font-semibold text-primary">
                        Active
                      </div>
                    </div>
                  </div>

                  {(isLowReliability || hasHighCancel) && (
                    <div className="mb-4 p-3 bg-accent/10 border border-accent/30 rounded-xl text-sm">
                      <AlertTriangle className="w-4 h-4 inline mr-2 text-accent" />
                      {isLowReliability && "Low reliability detected. "}
                      {hasHighCancel &&
                        "High cancellation rate requires review."}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">View Profile</Button>
                    <Button variant="outline">
                      <Flag className="w-4 h-4 mr-2" />
                      Flag Account
                    </Button>
                    <Button
                      variant="outline"
                      className="text-rose-600 dark:text-rose-500 border-rose-500/40"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Block Provider
                    </Button>
                  </div>

                </Card>
              );
            })}

          </TabsContent>

          {/* USERS */}
          <TabsContent value="users" className="space-y-6">

            {Array.from({ length: 5 }).map((_, i) => {
              const isLowRated = i === 2 || i === 4;

              return (
                <Card key={i} className="p-6">

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold">
                        User {1000 + i}
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        ID: U{1000 + i}
                      </div>
                    </div>

                    <Badge
                      className={
                        isLowRated
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-500"
                          : "bg-primary/10 text-primary"
                      }
                    >
                      {isLowRated ? "Low Rating" : "Good Standing"}
                    </Badge>
                  </div>

                  {isLowRated && (
                    <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-sm text-rose-600 dark:text-rose-500">
                      <AlertTriangle className="w-4 h-4 inline mr-2" />
                      Low rating and high cancellation rate.
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">View History</Button>
                    <Button variant="outline">Send Warning</Button>
                    {isLowRated && (
                      <Button
                        variant="outline"
                        className="text-rose-600 dark:text-rose-500 border-rose-500/40"
                      >
                        Restrict Booking
                      </Button>
                    )}
                  </div>

                </Card>
              );
            })}

          </TabsContent>

          {/* FLAGGED */}
          <TabsContent value="flagged" className="space-y-6">

            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 border-2 border-accent/40">

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold">
                      Provider {543 + i}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Flagged on: 2026-02-{10 + i}
                    </p>
                  </div>

                  <Badge className="bg-accent/10 text-accent">
                    Flagged
                  </Badge>
                </div>

                <div className="p-4 bg-muted rounded-xl mb-4 text-sm">
                  {i === 0 &&
                    "3 complaints in the last week about service quality."}
                  {i === 1 &&
                    "Unusual booking patterns detected."}
                  {i === 2 &&
                    "Customer reported inappropriate behavior."}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button>Review Details</Button>
                  <Button variant="outline">Dismiss Flag</Button>
                  <Button
                    variant="outline"
                    className="text-rose-600 dark:text-rose-500 border-rose-500/40"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Block Account
                  </Button>
                </div>

              </Card>
            ))}

          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
