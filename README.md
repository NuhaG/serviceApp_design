# Servzy Marketplace App

A frontend-only service marketplace demo built with React + Vite. Users can browse providers, filter/search services, view provider profiles on a map, and manage bookings through user/provider/admin dashboards.

## Tech Stack

- React 18
- TypeScript (TS/TSX)
- Vite 6
- React Router 7
- Tailwind CSS 4
- Radix UI primitives + custom UI wrappers in `src/app/components/ui`
- Lucide icons
- Leaflet + React Leaflet (map view)

## What This Project Includes

- Landing page with service categories and testimonials
- Search page with:
  - text/category filtering
  - price/rating/reliability/distance filters
  - list/map toggle
  - geolocation-based distance sorting
  - favorite provider toggling
- Provider profile page
- Booking confirmation flow
- User dashboard (active/history/contracts)
- Provider dashboard (requests/upcoming/history)
- Admin dashboard (overview/moderation workflows)
- Theme toggle (light/dark) with persisted preference

## Project Structure

```text
src/
  main.tsx
  styles/
    index.css
    theme.css
    tailwind.css
    fonts.css
  app/
    App.tsx
    routes.ts
    components/
      navigation.tsx
      provider-card.tsx
      ui/*
    pages/
      landing-page.tsx
      search-page.tsx
      provider-profile-page.tsx
      booking-confirmation-page.tsx
      user-dashboard.tsx
      provider-dashboard.tsx
      admin-dashboard.tsx
      not-found-page.tsx
    hooks/
      useThemeClass.tsx
      useMarketplaceData.ts
    data/
      mock-data.ts
    lib/
      geo.ts
public/
  images/*
```

## Routing

Defined in `src/app/routes.ts`:

- `/` -> Landing
- `/search` -> Search
- `/provider/:id` -> Provider profile
- `/booking/:providerId` -> Booking confirmation
- `/provider-dashboard` -> Provider dashboard
- `/user-dashboard` -> User dashboard
- `/admin` -> Admin dashboard
- `*` -> Not found

## Data Model and State

This app currently uses in-memory mock data from `src/app/data/mock-data.ts`.

Main entities:

- `Provider`
- `Booking`
- `Review`
- `PopularService`
- `CurrentUser`

`useMarketplaceData` (`src/app/hooks/useMarketplaceData.ts`) is the central client data layer. It handles:

- loading providers/bookings/popular services
- booking creation
- booking cancellation/rescheduling
- review submission
- moderation actions (flag/block/unblock)
- favorites management

Because data is in-memory mock state, changes reset on full reload.

## Local Storage Keys

- `theme` -> persisted dark/light mode
- `apna_favorite_providers` -> favorite provider IDs
- `apna_user_location` -> last geolocation coordinates used for distance calculations

## Map and Geolocation

- Map rendering uses React Leaflet (`search-page.tsx`)
- User location is requested via browser geolocation
- Distance calculations use Haversine utility in `src/app/lib/geo.ts`

## Theming

Theme tokens live in `src/styles/theme.css`.

- Light and dark palettes are configured via CSS variables
- Current palette direction: purple primary + green accent
- `Navigation` dispatches a `themechange` event and persists theme in local storage

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

<!-- ## Notes and Limitations

- No backend/API integration yet
- No automated tests configured yet
- `dist/` exists in the repository (generated build artifacts)
- Bundle size warning appears in production builds (single large chunk) -->

<!-- ## Suggested Next Improvements

1. Add API layer and replace mock data
2. Add form/input validation schemas and error states
3. Add unit/integration tests (Vitest + Testing Library)
4. Add route-level code splitting for bundle size reduction
5. Normalize status/semantic colors into reusable utility classes -->
