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
import { mockProviders } from "../data/mock-data";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock admin stats
  const stats = {
    totalProviders: 1247,
    totalUsers: 8934,
    blockedProviders: 23,
    lowRatedUsers: 156,
    flaggedAccounts: 12,
    avgReliability: 94,
  };

  const lowRatedProviders = mockProviders.filter((p) => p.reliabilityScore < 90);
  const highCancellationProviders = mockProviders.filter(
    (p) => (p.cancellations / p.totalBookings) * 100 > 5
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Platform management and monitoring</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalProviders}</div>
            <div className="text-xs text-gray-600">Total Providers</div>
          </Card>

          <Card className="p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
            <div className="text-xs text-gray-600">Total Users</div>
          </Card>

          <Card className="p-4 rounded-xl bg-red-50 border-red-200">
            <div className="flex items-center justify-between mb-2">
              <Ban className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-900">{stats.blockedProviders}</div>
            <div className="text-xs text-red-700">Blocked Providers</div>
          </Card>

          <Card className="p-4 rounded-xl bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-900">{stats.lowRatedUsers}</div>
            <div className="text-xs text-yellow-700">Low-Rated Users</div>
          </Card>

          <Card className="p-4 rounded-xl bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <Flag className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-900">{stats.flaggedAccounts}</div>
            <div className="text-xs text-orange-700">Flagged Accounts</div>
          </Card>

          <Card className="p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.avgReliability}%</div>
            <div className="text-xs text-gray-600">Avg Reliability</div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4 rounded-xl mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search providers or users by name, email, or ID..."
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="providers" className="rounded-lg">
              Providers
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg">
              Users
            </TabsTrigger>
            <TabsTrigger value="flagged" className="rounded-lg">
              Flagged ({stats.flaggedAccounts})
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-xl">
                <h3 className="font-semibold mb-4">Platform Health</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Average Reliability Score</span>
                      <span className="font-semibold">{stats.avgReliability}%</span>
                    </div>
                    <Progress value={stats.avgReliability} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Provider Quality (90%+ reliability)</span>
                      <span className="font-semibold">
                        {((mockProviders.filter((p) => p.reliabilityScore >= 90).length /
                          mockProviders.length) *
                          100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={
                        (mockProviders.filter((p) => p.reliabilityScore >= 90).length /
                          mockProviders.length) *
                        100
                      }
                      className="h-3"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Active Users</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <Progress value={87} className="h-3" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 rounded-xl">
                <h3 className="font-semibold mb-4">Recent Alerts</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-red-900">High Cancellation Rate</div>
                      <div className="text-red-700">
                        Provider #1247 has 15% cancellation rate
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-900">Low Rating Alert</div>
                      <div className="text-yellow-700">User #8934 rating dropped below 3.0</div>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                    <Flag className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-orange-900">Account Flagged</div>
                      <div className="text-orange-700">Multiple complaints on Provider #543</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Providers */}
          <TabsContent value="providers" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Provider Monitoring</h3>
              <Badge className="rounded-lg">
                {lowRatedProviders.length} Low Reliability
              </Badge>
            </div>

            {mockProviders.map((provider) => {
              const cancellationRate = (
                (provider.cancellations / provider.totalBookings) *
                100
              ).toFixed(1);
              const isLowReliability = provider.reliabilityScore < 90;
              const hasHighCancellations = Number(cancellationRate) > 5;

              return (
                <Card key={provider.id} className="p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-4">
                      <img
                        src={provider.photo}
                        alt={provider.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{provider.name}</h4>
                          <span className="text-sm text-gray-500">ID: {provider.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{provider.rating}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-600">
                            {provider.totalBookings} bookings
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`rounded-lg ${
                          isLowReliability
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {provider.reliabilityScore}% Reliability
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Accept Rate</div>
                      <div className="text-lg font-semibold">{provider.acceptRate}%</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Cancellations</div>
                      <div className="text-lg font-semibold">{provider.cancellations}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Cancel Rate</div>
                      <div
                        className={`text-lg font-semibold ${
                          hasHighCancellations ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {cancellationRate}%
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Status</div>
                      <div className="text-lg font-semibold text-green-600">Active</div>
                    </div>
                  </div>

                  {(isLowReliability || hasHighCancellations) && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
                      <AlertTriangle className="w-4 h-4 inline mr-2" />
                      {isLowReliability && "Low reliability score detected. "}
                      {hasHighCancellations && "High cancellation rate may require review."}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl">
                      View Profile
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Flag className="w-4 h-4 mr-2" />
                      Flag Account
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Block Provider
                    </Button>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">User Management</h3>
              <Badge className="rounded-lg">{stats.lowRatedUsers} Low-Rated</Badge>
            </div>

            {Array.from({ length: 5 }).map((_, i) => {
              const isLowRated = i === 2 || i === 4;
              return (
                <Card key={i} className="p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">User {1000 + i}</h4>
                          <span className="text-sm text-gray-500">ID: U{1000 + i}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{isLowRated ? "2.8" : "4.5"}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-600">{15 + i * 3} bookings</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={`rounded-lg ${
                        isLowRated ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isLowRated ? "Low Rating" : "Good Standing"}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Total Bookings</div>
                      <div className="text-lg font-semibold">{15 + i * 3}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Cancellations</div>
                      <div
                        className={`text-lg font-semibold ${
                          isLowRated ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {isLowRated ? 5 : 1}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Cancel Rate</div>
                      <div
                        className={`text-lg font-semibold ${
                          isLowRated ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {isLowRated ? "22%" : "5%"}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Status</div>
                      <div className="text-lg font-semibold text-green-600">Active</div>
                    </div>
                  </div>

                  {isLowRated && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
                      <AlertTriangle className="w-4 h-4 inline mr-2" />
                      Low rating and high cancellation rate. Consider restrictions or warning.
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl">
                      View History
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      Send Warning
                    </Button>
                    {isLowRated && (
                      <Button
                        variant="outline"
                        className="rounded-xl border-red-200 text-red-700 hover:bg-red-50"
                      >
                        Restrict Booking
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          {/* Flagged */}
          <TabsContent value="flagged" className="space-y-4">
            <Card className="p-6 rounded-xl bg-orange-50 border-orange-200">
              <div className="flex items-start gap-3">
                <Flag className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">
                    Flagged Accounts Require Review
                  </h3>
                  <p className="text-sm text-orange-800">
                    These accounts have been flagged for policy violations, complaints, or
                    suspicious activity. Review and take appropriate action.
                  </p>
                </div>
              </div>
            </Card>

            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 rounded-xl border-2 border-orange-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Flag className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">Provider {543 + i}</h4>
                        <Badge className="bg-orange-100 text-orange-700 rounded-lg">
                          Flagged
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Flagged on: 2026-02-{10 + i}
                      </p>
                      <p className="text-sm text-orange-800 font-medium">
                        Reason: {i === 0 && "Multiple customer complaints"}
                        {i === 1 && "Suspected fraudulent activity"}
                        {i === 2 && "Policy violation - inappropriate behavior"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-orange-200 rounded-xl mb-4">
                  <div className="text-sm text-gray-700">
                    <strong>Details:</strong> {i === 0 && "3 complaints in the last week about service quality and no-shows."}
                    {i === 1 && "Unusual booking patterns and payment discrepancies detected."}
                    {i === 2 && "Customer reported unprofessional conduct during service."}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="rounded-xl bg-accent hover:bg-accent/90">
                    Review Details
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Dismiss Flag
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl border-red-200 text-red-700 hover:bg-red-50"
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
