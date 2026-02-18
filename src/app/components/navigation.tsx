import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  User,
  Briefcase,
  Shield,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  // Initialize and listen for theme changes
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    // Set initial theme from DOM
    updateTheme();

    // Listen for theme changes from CustomEvent (dispatched by toggle button)
    window.addEventListener('themechange', updateTheme);
    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', updateTheme);
    // Listen for direct class changes on html element
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener('themechange', updateTheme);
      window.removeEventListener('storage', updateTheme);
      observer.disconnect();
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItem = (path: string) =>
    `
    relative rounded-xl transition-all duration-200
    ${isActive(path)
      ? "bg-primary text-primary-foreground shadow-sm"
      : "hover:bg-[var(--color-secondary-hover)] hover:text-foreground"
    }
  `;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <div className="flex items-center justify-start transition-transform duration-200 group-hover:scale-105">
  <img 
    src="/images/servzy-Photoroom.png"
    alt="Servzy Logo"
    className="h-32 object-contain"
  />
</div>


             
          </Link>
           
     

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">

            <Link to="/search">
              <Button
                variant="ghost"
                className={navItem("/search")}
              >
                Find Services
              </Button>
            </Link>

            <Link to="/user-dashboard">
              <Button
                variant="ghost"
                className={navItem("/user-dashboard")}
              >
                <User className="w-4 h-4 mr-2" />
                My Bookings
              </Button>
            </Link>

            <Link to="/provider-dashboard">
              <Button
                variant="ghost"
                className={navItem("/provider-dashboard")}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Provider
              </Button>
            </Link>

            <Link to="/admin">
              <Button
                variant="ghost"
                size="icon"
                className={navItem("/admin")}
              >
                <Shield className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const isDark = document.documentElement.classList.contains('dark');
                const next = isDark ? 'light' : 'dark';
                // Update state immediately for instant UI feedback
                setTheme(next);
                // Update DOM
                if (next === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                // Update storage
                try { localStorage.setItem('theme', next); } catch (e) {}
                // Dispatch event to notify other listeners
                try { window.dispatchEvent(new CustomEvent('themechange', { detail: next })); } catch (e) {}
              }}
              className="rounded-xl hover:bg-[var(--color-secondary-hover)]"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="rounded-xl hover:bg-[var(--color-secondary-hover)]"
            >
              {open ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-6 space-y-3">

            <Link to="/search" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${navItem("/search")}`}
              >
                Find Services
              </Button>
            </Link>

            <Link to="/user-dashboard" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${navItem("/user-dashboard")}`}
              >
                <User className="w-4 h-4 mr-2" />
                My Bookings
              </Button>
            </Link>

            <Link to="/provider-dashboard" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${navItem("/provider-dashboard")}`}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Provider
              </Button>
            </Link>

            <Link to="/admin" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${navItem("/admin")}`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>

            <div className="pt-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  const isDark = document.documentElement.classList.contains('dark');
                  const next = isDark ? 'light' : 'dark';
                  // Update state immediately for instant UI feedback
                  setTheme(next);
                  // Update DOM
                  if (next === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  // Update storage
                  try { localStorage.setItem('theme', next); } catch (e) {}
                  // Dispatch event to notify other listeners
                  try { window.dispatchEvent(new CustomEvent('themechange', { detail: next })); } catch (e) {}
                }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 mr-2" />
                ) : (
                  <Moon className="w-4 h-4 mr-2" />
                )}
                Toggle Theme
              </Button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}

// initialize theme state on mount
// (placed after component to keep logic colocated)
function useInitializeTheme(setTheme: (t: 'dark'|'light'|null)=>void) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        document.documentElement.classList.add('dark');
        setTheme('dark');
        return;
      }
      if (stored === 'light') {
        document.documentElement.classList.remove('dark');
        setTheme('light');
        return;
      }
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    } catch (e) {
      setTheme('light');
    }
  }, [setTheme]);
}
