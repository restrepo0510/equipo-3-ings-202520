// types/location.types.ts

/**
 * Location coordinates
 */
export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

/**
 * Location permission status
 */
export enum LocationPermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  UNDETERMINED = 'undetermined',
}

/**
 * Location error types
 */
export enum LocationErrorType {
  PERMISSION_DENIED = 'permission_denied',
  POSITION_UNAVAILABLE = 'position_unavailable',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown',
}

/**
 * Location error
 */
export interface LocationError {
  type: LocationErrorType;
  message: string;
}

/**
 * Location state
 */
export interface LocationState {
  location: Location | null;
  isLoading: boolean;
  error: LocationError | null;
  permissionStatus: LocationPermissionStatus;
}

/**
 * Nearby search parameters
 */
export interface NearbySearchParams {
  latitude: number;
  longitude: number;
  radius: number; // in kilometers
}

/**
 * Distance calculation result
 */
export interface DistanceResult {
  distanceKm: number;
  distanceMiles: number;
}

/**
 * Geolocation options
 */
export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/**
 * Type guard to check if location is valid
 */
export const isValidLocation = (location: Location | null): location is Location => {
  if (!location) return false;
  return (
    typeof location.latitude === 'number' &&
    typeof location.longitude === 'number' &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
};

/**
 * Calculate distance between two points (Haversine formula)
 */
export const calculateDistance = (
  loc1: Location,
  loc2: Location
): DistanceResult => {
  const R = 6371; // Earth radius in kilometers
  const dLat = toRad(loc2.latitude - loc1.latitude);
  const dLon = toRad(loc2.longitude - loc1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.latitude)) *
      Math.cos(toRad(loc2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  return {
    distanceKm: parseFloat(distanceKm.toFixed(2)),
    distanceMiles: parseFloat((distanceKm * 0.621371).toFixed(2)),
  };
};

/**
 * Convert degrees to radians
 */
const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Format distance for display
 */
export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
};