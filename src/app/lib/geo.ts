export type LatLng = [number, number];

const EARTH_RADIUS_KM = 6371;
const STORAGE_KEY = "apna_user_location";

export function distanceKm(from: LatLng, to: LatLng): number {
  const [lat1, lon1] = from;
  const [lat2, lon2] = to;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}

export function toLatLng(lat: number, lng: number): LatLng {
  return [lat, lng];
}

export function readStoredUserLocation(): LatLng | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      lat?: number;
      lng?: number;
    };
    if (typeof parsed.lat !== "number" || typeof parsed.lng !== "number") {
      return null;
    }
    return [parsed.lat, parsed.lng];
  } catch {
    return null;
  }
}

export function saveUserLocation(location: LatLng): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lat: location[0], lng: location[1] })
    );
  } catch {
    // best effort only
  }
}
