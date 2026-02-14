import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { SearchPage } from "./pages/search-page";
import { ProviderProfilePage } from "./pages/provider-profile-page";
import { BookingConfirmationPage } from "./pages/booking-confirmation-page";
import { ProviderDashboard } from "./pages/provider-dashboard";
import { UserDashboard } from "./pages/user-dashboard";
import { AdminDashboard } from "./pages/admin-dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: "/provider/:id",
    Component: ProviderProfilePage,
  },
  {
    path: "/booking/:providerId",
    Component: BookingConfirmationPage,
  },
  {
    path: "/provider-dashboard",
    Component: ProviderDashboard,
  },
  {
    path: "/user-dashboard",
    Component: UserDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
