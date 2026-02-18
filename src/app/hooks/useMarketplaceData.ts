import { useEffect, useState } from "react";
import {
  addProviderReview,
  Booking,
  createUserBooking,
  CurrentUser,
  fetchPopularServices,
  fetchProviderBookings,
  fetchCurrentUser,
  fetchProviders,
  fetchUserBookings,
  PopularService,
  Provider,
  rescheduleUserBooking,
  updateProviderModeration,
  updateUserBookingStatus,
} from "../data/mock-data";

type MarketplaceDataState = {
  currentUser: CurrentUser | null;
  providers: Provider[];
  userBookings: Booking[];
  providerBookings: Booking[];
  popularServices: PopularService[];
  loading: boolean;
  favoriteProviderIds: string[];
  reload: () => Promise<void>;
  addReview: (providerId: string, rating: number, comment: string) => Promise<void>;
  bookProvider: (
    providerId: string,
    date: string,
    time: string,
    type: "one-time" | "contract"
  ) => Promise<void>;
  cancelUserBooking: (bookingId: string) => Promise<void>;
  rescheduleBooking: (bookingId: string, date: string, time: string) => Promise<void>;
  moderateProvider: (providerId: string, action: "flag" | "block" | "unblock") => Promise<void>;
  toggleFavoriteProvider: (providerId: string) => void;
  isFavoriteProvider: (providerId: string) => boolean;
};

const FAVORITES_KEY = "apna_favorite_providers";

export function useMarketplaceData(): MarketplaceDataState {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [providerBookings, setProviderBookings] = useState<Booking[]>([]);
  const [popularServices, setPopularServices] = useState<PopularService[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteProviderIds, setFavoriteProviderIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  });

  async function loadData() {
    const [nextCurrentUser, nextProviders, nextUserBookings, nextProviderBookings, nextPopularServices] =
      await Promise.all([
        fetchCurrentUser(),
        fetchProviders(),
        fetchUserBookings(),
        fetchProviderBookings(),
        fetchPopularServices(),
      ]);

    setCurrentUser(nextCurrentUser);
    setProviders(nextProviders);
    setUserBookings(nextUserBookings);
    setProviderBookings(nextProviderBookings);
    setPopularServices(nextPopularServices);
    setLoading(false);
  }

  useEffect(() => {
    let mounted = true;

    loadData().catch(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  async function addReview(providerId: string, rating: number, comment: string) {
    if (!currentUser) return;
    if (!comment.trim()) return;

    await addProviderReview(providerId, {
      userName: currentUser.name,
      rating,
      comment,
    });

    const nextProviders = await fetchProviders();
    setProviders(nextProviders);
  }

  async function bookProvider(
    providerId: string,
    date: string,
    time: string,
    type: "one-time" | "contract"
  ) {
    await createUserBooking({ providerId, date, time, type });
    await loadData();
  }

  async function cancelUserBooking(bookingId: string) {
    await updateUserBookingStatus(bookingId, "cancelled");
    await loadData();
  }

  async function rescheduleBooking(bookingId: string, date: string, time: string) {
    await rescheduleUserBooking(bookingId, date, time);
    await loadData();
  }

  async function moderateProvider(providerId: string, action: "flag" | "block" | "unblock") {
    await updateProviderModeration(providerId, action);
    await loadData();
  }

  function persistFavorites(nextFavorites: string[]) {
    setFavoriteProviderIds(nextFavorites);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    } catch {
      // best effort
    }
  }

  function toggleFavoriteProvider(providerId: string) {
    const exists = favoriteProviderIds.includes(providerId);
    if (exists) {
      persistFavorites(favoriteProviderIds.filter((id) => id !== providerId));
      return;
    }
    persistFavorites([...favoriteProviderIds, providerId]);
  }

  function isFavoriteProvider(providerId: string) {
    return favoriteProviderIds.includes(providerId);
  }

  return {
    currentUser,
    providers,
    userBookings,
    providerBookings,
    popularServices,
    loading,
    favoriteProviderIds,
    reload: loadData,
    addReview,
    bookProvider,
    cancelUserBooking,
    rescheduleBooking,
    moderateProvider,
    toggleFavoriteProvider,
    isFavoriteProvider,
  };
}
