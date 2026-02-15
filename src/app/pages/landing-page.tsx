import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router";
import { useThemeClass } from "../hooks/useThemeClass";
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
  const themeClass = useThemeClass();
  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground relative overflow-hidden`}>
      <Navigation />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT */}
        <div className="flex-1 text-center lg:text-left">
          <Badge className="mb-6 rounded-full bg-accent/15 text-accent border-accent/20">
            Trusted by 50,000+ users
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Reliable Services,
            <br />
            <span className="text-primary">Real People</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            Connect with verified professionals near you. Transparent pricing, reliability scores, and instant booking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap">
            <Link to="/search">
              <Button size="lg" className="rounded-2xl px-8 py-4 sm:py-6 text-lg shadow-lg w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Book a Service
              </Button>
            </Link>

            <Link to="/provider-dashboard">
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-8 py-4 sm:py-6 text-lg w-full sm:w-auto"
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex-1 w-full max-w-lg lg:max-w-full">
          <div className="absolute inset-0 rounded-3xl bg-black/20 z-10 lg:hidden" />
          <img
            src="/images/hero-image.jpg"
            alt="Service provider helping customer"
            className="rounded-3xl shadow-2xl object-cover w-full h-[300px] sm:h-[350px] lg:h-[400px]"
          />
          <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-xl z-20 border border-border text-sm sm:text-base">
            <p className="font-medium">⭐ 4.9 Rated Provider</p>
            <p className="text-xs text-muted-foreground">Completed 250+ services</p>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Popular Services</h2>
          <p className="text-lg text-muted-foreground">Browse our most requested services</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {popularServices.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link key={service.name} to="/search">
                <Card className="p-4 sm:p-6 text-center rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer bg-card border border-border">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 sm:w-7 h-5 sm:h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{service.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{service.count} providers</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <img
            src="/images/service-action.jpg"
            alt="Service in action"
            className="rounded-3xl shadow-xl object-cover w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-[350px]"
          />

          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Book With Confidence</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Every provider is verified and rated. Transparent pricing and secure booking ensure peace of mind.
            </p>
            <Button size="lg" className="rounded-2xl px-8 py-4 sm:py-6">Explore Services</Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Riya Sharma",
                image: "/images/user1.jpg",
                title: "Happy Customer",
                review: "Service was punctual and professional. Very happy with the overall experience!"
              },
              {
                name: "Arjun Mehta",
                image: "/images/user2.jpg",
                title: "Happy Customer",
                review: "Transparent pricing and excellent communication. Will definitely book again."
              },
              {
                name: "Raj Singh",
                image: "/images/user3.jpg",
                title: "Happy Customer",
                review: "Highly recommended! The provider was courteous and the service was top-notch."
              }
            ].map((user, idx) => (
              <Card
                key={idx}
                className="flex flex-row items-center p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition bg-card border border-border"
              >
                <div className="flex-shrink-0 w-1/3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full aspect-square rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1 pl-4">
                  <p className="font-semibold text-sm sm:text-base">{user.name}</p>
                  <p className="text-sm sm:text-base text-muted-foreground">{user.review}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
        <Card className="p-8 sm:p-12 bg-primary text-primary-foreground rounded-3xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Join thousands of satisfied customers and providers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <Link to="/search">
              <Button size="lg" variant="secondary" className="rounded-2xl px-8 py-4 sm:py-6 w-full sm:w-auto">
                Find a Service Provider
              </Button>
            </Link>
            <Link to="/provider-dashboard">
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-8 py-4 sm:py-6 w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Apply as a Provider
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">© 2026 ApnaSahara. All rights reserved.</p>
          <p className="text-xs mt-2">Your trusted marketplace for professional services</p>
        </div>
      </footer>
    </div>
  );
}

