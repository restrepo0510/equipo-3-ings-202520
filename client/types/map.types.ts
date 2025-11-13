// types/map.types.ts

/**
 * Map Screen Route Parameters
 * Compatible with Expo Router's useLocalSearchParams
 * 
 * Note: Expo Router params are always string or string[] at runtime
 * We handle the type extraction in the component
 */
export type MapScreenParams = {
  /** Optional restaurant ID to pre-select */
  restaurantId?: string | string[];
  
  /** Optional latitude for initial center */
  latitude?: string | string[];
  
  /** Optional longitude for initial center */
  longitude?: string | string[];
  
  /** Allow any additional params from Expo Router */
  [key: string]: string | string[] | undefined;
};

/**
 * Location Coordinates
 */
export interface LocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Map Region Configuration
 */
export interface MapRegion extends LocationCoords {
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * Nearby Search Parameters
 */
export interface NearbySearchParams extends LocationCoords {
  /** Search radius in kilometers */
  radius?: number;
  
  /** Maximum number of results */
  limit?: number;
}

/**
 * Map Marker Props
 */
export interface MapMarkerProps {
  /** Marker coordinate */
  coordinate: LocationCoords;
  
  /** Marker title */
  title?: string;
  
  /** Marker description */
  description?: string;
  
  /** Marker color */
  color?: string;
  
  /** Whether marker is selected */
  isSelected?: boolean;
}

/**
 * Map View Configuration
 */
export interface MapViewConfig {
  /** Initial region */
  initialRegion?: MapRegion;
  
  /** Show user location */
  showsUserLocation?: boolean;
  
  /** Show location button */
  showsMyLocationButton?: boolean;
  
  /** Show compass */
  showsCompass?: boolean;
  
  /** Enable zoom controls */
  zoomEnabled?: boolean;
  
  /** Enable scroll */
  scrollEnabled?: boolean;
}

/**
 * Type guard to check if params have valid coordinates
 */
export const hasValidParamCoordinates = (
  params: MapScreenParams
): boolean => {
  if (!params.latitude || !params.longitude) return false;
  
  const latStr = Array.isArray(params.latitude) ? params.latitude[0] : params.latitude;
  const lonStr = Array.isArray(params.longitude) ? params.longitude[0] : params.longitude;
  
  if (!latStr || !lonStr) return false;
  
  const lat = Number(latStr);
  const lon = Number(lonStr);
  
  return (
    !isNaN(lat) &&
    !isNaN(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
};

/**
 * Parse coordinate from string or string array param
 */
export const parseCoordinate = (value: string | string[] | undefined): number | undefined => {
  if (!value) return undefined;
  
  const stringValue = Array.isArray(value) ? value[0] : value;
  if (!stringValue) return undefined;
  
  const parsed = Number(stringValue);
  
  return isNaN(parsed) ? undefined : parsed;
};

/**
 * Extract string value from param (handles both string and string[])
 */
export const extractStringParam = (value: string | string[] | undefined): string | undefined => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};