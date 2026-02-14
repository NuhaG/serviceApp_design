import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router";
import {
  Search,
  UserCheck,
  Calendar,
  Home,
  Wrench,
  Zap,
  PawPrint,
  Flower2,
  Wind,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import { popularServices } from "../data/mock-data";

const iconMap: Record<string, any> = {
  Home,
  Wrench,
  Zap,
  PawPrint,
  Flower2,
  Wind,
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <Badge className="mb-4 rounded-full bg-accent/10 text-accent border-accent/20">
            Trusted by 50,000+ users
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Professional Services
            <br />
            <span className="text-primary">At Your Doorstep</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified, reliable service providers in your area. Book with confidence.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/search">
              <Button size="lg" className="rounded-xl px-8 py-6 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Book a Service
              </Button>
            </Link>
            <Link to="/provider-dashboard">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 py-6 text-lg bg-accent hover:bg-accent/90 text-white border-accent"
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center rounded-xl border-2 border-primary/10">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Verified Providers</h3>
            <p className="text-sm text-gray-600">Background checks & verified credentials</p>
          </Card>
          <Card className="p-6 text-center rounded-xl border-2 border-accent/10">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">4.8+ Average Rating</h3>
            <p className="text-sm text-gray-600">Based on 100,000+ verified reviews</p>
          </Card>
          <Card className="p-6 text-center rounded-xl border-2 border-primary/10">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">97% Reliability</h3>
            <p className="text-sm text-gray-600">Transparent reliability scoring system</p>
          </Card>
        </div>
      </section>

      {/* Popular Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Services</h2>
          <p className="text-lg text-gray-600">Browse our most requested services</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularServices.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link key={service.name} to="/search">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer rounded-xl group">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{service.name}</h3>
                  <p className="text-xs text-gray-500">{service.count} providers</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Get started in three simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
            <p className="text-gray-600">
              Browse providers by location, price, rating, and reliability score
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Review & Select</h3>
            <p className="text-gray-600">
              Check ratings, reviews, and reliability scores to make an informed choice
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Book & Confirm</h3>
            <p className="text-gray-600">
              Schedule your service with transparent pricing and instant confirmation
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Card className="p-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers and trusted providers
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/search">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-xl px-8 py-6 text-lg bg-white text-primary hover:bg-gray-100"
              >
                Find a Service Provider
              </Button>
            </Link>
            <Link to="/provider-dashboard">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 py-6 text-lg border-white text-white hover:bg-white/10"
              >
                Apply as a Provider
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p className="text-sm">© 2026 ServiceHub. All rights reserved.</p>
          <p className="text-xs mt-2">Your trusted marketplace for professional services</p>
        </div>
      </footer>
    </div>
  );
}
