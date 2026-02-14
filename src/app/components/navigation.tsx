import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { User, Briefcase, Shield } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">ServiceHub</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/search">
              <Button
                variant={location.pathname === "/search" ? "default" : "ghost"}
                className="rounded-xl"
              >
                Find Services
              </Button>
            </Link>
            <Link to="/user-dashboard">
              <Button
                variant={location.pathname === "/user-dashboard" ? "default" : "outline"}
                className="rounded-xl"
              >
                <User className="w-4 h-4 mr-2" />
                My Bookings
              </Button>
            </Link>
            <Link to="/provider-dashboard">
              <Button
                variant={location.pathname === "/provider-dashboard" ? "default" : "outline"}
                className="rounded-xl bg-accent hover:bg-accent/90 text-white border-accent"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Provider
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant={location.pathname === "/admin" ? "default" : "ghost"}
                size="icon"
                className="rounded-xl"
              >
                <Shield className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
