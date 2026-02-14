import { useState } from "react";
import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router";
import {
  Star,
  Calendar,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { mockUserBookings } from "../data/mock-data";

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("active");

  // Mock user stats
  const stats = {
    personalRating: 4.6,
    totalBookings: 24,
    cancelledBookings: 3,
    activeContracts: 1,
  };

  const cancellationRate = ((stats.cancelledBookings / stats.totalBookings) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your service bookings and view your history</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.personalRating}</div>
            <div className="text-sm text-gray-600">Your Rating</div>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(stats.personalRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalBookings}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
            <div className="text-xs text-gray-500 mt-2">All time</div>
          </Card>

          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              {Number(cancellationRate) > 10 && (
                <Badge className="bg-red-100 text-red-700 rounded-lg">High</Badge>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.cancelledBookings}
            </div>
            <div className="text-sm text-gray-600">Cancellations</div>
            <div className="text-xs text-red-600 mt-2">{cancellationRate}% rate</div>
          </Card>

          <Card className="p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.activeContracts}
            </div>
            <div className="text-sm text-gray-600">Active Contracts</div>
            <div className="text-xs text-gray-500 mt-2">Recurring services</div>
          </Card>
        </div>

        {/* Cancellation Warning */}
        {Number(cancellationRate) > 10 && (
          <Card className="p-4 rounded-xl bg-red-50 border-red-200 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-red-900 mb-1">
                  High Cancellation Rate Warning
                </div>
                <div className="text-red-800">
                  Your cancellation rate ({cancellationRate}%) is higher than average. Future
                  cancellations may result in additional fees and could affect your ability to
                  book premium providers.
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Personal Rating Breakdown */}
        <Card className="p-6 rounded-xl mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Your Rating Breakdown</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Excellent reliability! You qualify for priority booking with top-rated providers.
            </div>
          )}
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 rounded-xl">
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
            {mockUserBookings
              .filter((b) => b.status === "confirmed" || b.status === "pending")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.providerName}</h3>
                        <Badge
                          className={`rounded-lg ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${booking.amount}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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
                    <Link to={`/provider/${booking.providerId}`} className="flex-1">
                      <Button className="w-full rounded-xl" variant="outline">
                        View Provider
                      </Button>
                    </Link>
                    <Button className="flex-1 rounded-xl" variant="outline">
                      Reschedule
                    </Button>
                    <Button
                      className="flex-1 rounded-xl border-red-200 text-red-700 hover:bg-red-50"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-100 rounded-xl text-xs text-yellow-700 flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span>
                      Canceling within 24 hours will incur a $15 fee and may affect your user
                      rating
                    </span>
                  </div>
                </Card>
              ))}
            {mockUserBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
              .length === 0 && (
              <Card className="p-12 text-center rounded-xl">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No active bookings</p>
                <Link to="/search">
                  <Button className="rounded-xl">Browse Services</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Card className="p-4 rounded-xl bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-900">
                      {mockUserBookings.filter((b) => b.status === "completed").length}
                    </div>
                    <div className="text-sm text-green-700">Completed Bookings</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 rounded-xl bg-red-50 border-red-200">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold text-red-900">
                      {stats.cancelledBookings}
                    </div>
                    <div className="text-sm text-red-700">Cancelled Bookings</div>
                  </div>
                </div>
              </Card>
            </div>

            {mockUserBookings
              .filter((b) => b.status === "completed")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{booking.providerName}</h3>
                        <Badge className="bg-green-100 text-green-700 rounded-lg">Completed</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{booking.date}</span>
                        <span>•</span>
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">${booking.amount}</div>
                      <Button size="sm" variant="outline" className="rounded-lg mt-2">
                        Leave Review
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          {/* Contracts */}
          <TabsContent value="contracts" className="space-y-4">
            {mockUserBookings
              .filter((b) => b.type === "contract")
              .map((booking) => (
                <Card key={booking.id} className="p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.providerName}</h3>
                        <Badge className="bg-accent text-white rounded-lg">Active Contract</Badge>
                      </div>
                      <p className="text-gray-600">{booking.service}</p>
                      <p className="text-sm text-gray-500 mt-1">Recurring every week</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${booking.amount}</div>
                      <div className="text-xs text-gray-500">per service</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Next Appointment</div>
                      <div className="font-medium">{booking.date}</div>
                      <div className="text-sm text-gray-700">{booking.time}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Contract Started</div>
                      <div className="font-medium">2026-01-15</div>
                      <div className="text-sm text-gray-700">4 weeks ago</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 rounded-xl" variant="outline">
                      Manage Contract
                    </Button>
                    <Button className="flex-1 rounded-xl" variant="outline">
                      Pause Contract
                    </Button>
                  </div>
                </Card>
              ))}
            {mockUserBookings.filter((b) => b.type === "contract").length === 0 && (
              <Card className="p-12 text-center rounded-xl">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No active contracts</p>
                <Link to="/search">
                  <Button className="rounded-xl">Find Contract Services</Button>
                </Link>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
