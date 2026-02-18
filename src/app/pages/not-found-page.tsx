import { Link } from "react-router";
import { Navigation } from "../components/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useThemeClass } from "../hooks/useThemeClass";

export function NotFoundPage() {
  const themeClass = useThemeClass();

  return (
    <div className={`${themeClass} min-h-screen bg-background text-foreground`}>
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Card className="p-8 sm:p-12 rounded-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">404</h1>
          <p className="text-muted-foreground mb-6">
            This page does not exist or may have been moved.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/">
              <Button>Go Home</Button>
            </Link>
            <Link to="/search">
              <Button variant="outline">Find Services</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
