// hooks/useRestaurantsData.ts

import { useState, useCallback, useEffect } from 'react';
import { restaurantService, Restaurant } from '../services/restaurantService';
import { useRestaurants } from '@/context/RestaurantsContext';
import { DEFAULT_VALUES } from '../constants/home.constants';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface UseRestaurantsDataParams {
  location: LocationCoords | null;
  autoLoad?: boolean;
}

interface UseRestaurantsDataReturn {
  restaurants: Restaurant[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  loadRestaurants: (isRefresh?: boolean) => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for managing restaurant data
 * 
 * Handles:
 * - Loading restaurants from API
 * - Syncing with global context
 * - Error handling
 * - Refresh functionality
 * - Loading states
 * 
 * @param params - Hook configuration
 * @returns Restaurant data and control functions
 * 
 * @example
 * ```tsx
 * const { restaurants, isLoading, error, loadRestaurants, refresh } = useRestaurantsData({
 *   location,
 *   autoLoad: true
 * });
 * ```
 */
export const useRestaurantsData = ({
  location,
  autoLoad = true,
}: UseRestaurantsDataParams): UseRestaurantsDataReturn => {
  const { setRestaurants: setGlobalRestaurants } = useRestaurants();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load restaurants from API
   */
  const loadRestaurants = useCallback(
    async (isRefresh = false): Promise<void> => {
      if (!location) {
        setError('No se pudo obtener tu ubicación');
        return;
      }

      try {
        // Set appropriate loading state
        if (isRefresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        // Fetch nearby restaurants
        const data = await restaurantService.getNearby({
          latitude: location.latitude,
          longitude: location.longitude,
          radius: DEFAULT_VALUES.SEARCH_RADIUS_KM,
        });

        console.log('🍽️ Restaurants loaded:', data.length);

        // Update local and global state
        setRestaurants(data);
        setGlobalRestaurants(data);
      } catch (err) {
        console.error('❌ Error loading restaurants:', err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'No se pudieron cargar los restaurantes cercanos.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [location, setGlobalRestaurants]
  );

  /**
   * Refresh restaurants (convenience method)
   */
  const refresh = useCallback(async (): Promise<void> => {
    await loadRestaurants(true);
  }, [loadRestaurants]);

  /**
   * Auto-load on location change
   */
  useEffect(() => {
    if (autoLoad && location) {
      loadRestaurants();
    }
  }, [location, autoLoad]); // Don't include loadRestaurants to avoid loops

  return {
    restaurants,
    isLoading,
    isRefreshing,
    error,
    loadRestaurants,
    refresh,
  };
};