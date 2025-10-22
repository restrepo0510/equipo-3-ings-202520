// hooks/useLocation.ts
import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';

/**
 * Represents geographic coordinates
 */
interface LocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Return type for the useLocation hook
 */
interface UseLocationReturn {
  location: LocationCoords | null;
  error: string | null;
  loading: boolean;
  requestLocation: () => Promise<void>;
}

/**
 * Custom hook for handling device location
 * 
 * Provides location data with loading states and error handling
 * Automatically requests location on mount with manual refresh capability
 * 
 * @returns Object containing location data, loading state, errors, and refresh function
 * 
 * @example
 * const { location, error, loading, requestLocation } = useLocation();
 * 
 * if (loading) return <Text>Getting location...</Text>;
 * if (error) return <Text>Error: {error}</Text>;
 * if (location) return <Text>Lat: {location.latitude}, Lng: {location.longitude}</Text>;
 */
export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Requests current device location with permission handling
   * 
   * @async
   * @returns Promise that resolves when location is obtained or fails
   * 
   * @throws Will update error state if location cannot be retrieved
   */
  const requestLocation = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      // Get current position with balanced accuracy
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // Good balance between accuracy and battery
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (err) {
      setError('Failed to get location');
      console.error('Location error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically request location when component mounts
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { 
    location, 
    error, 
    loading, 
    requestLocation 
  };
};