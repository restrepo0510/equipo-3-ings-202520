// context/RestaurantsContext.tsx

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Restaurant } from '@/types/restaurant.types';

/**
 * Restaurants Context Type
 */
type RestaurantsContextType = {
  /** List of all restaurants */
  restaurants: Restaurant[];
  
  /** Set restaurants list */
  setRestaurants: (data: Restaurant[]) => void;
  
  /** Get restaurant by ID */
  getRestaurantById: (id: string) => Restaurant | undefined;
  
  /** Clear all restaurants */
  clearRestaurants: () => void;
  
  /** Add a single restaurant */
  addRestaurant: (restaurant: Restaurant) => void;
  
  /** Update a restaurant */
  updateRestaurant: (id: string, updates: Partial<Restaurant>) => void;
  
  /** Remove a restaurant */
  removeRestaurant: (id: string) => void;
};

/**
 * Restaurants Context
 */
const RestaurantsContext = createContext<RestaurantsContextType>({
  restaurants: [],
  setRestaurants: () => {},
  getRestaurantById: () => undefined,
  clearRestaurants: () => {},
  addRestaurant: () => {},
  updateRestaurant: () => {},
  removeRestaurant: () => {},
});

/**
 * Restaurants Provider Props
 */
interface RestaurantsProviderProps {
  children: React.ReactNode;
}

/**
 * Restaurants Provider Component
 * 
 * Provides global state management for restaurants
 * 
 * @example
 * ```tsx
 * <RestaurantsProvider>
 *   <App />
 * </RestaurantsProvider>
 * ```
 */
export const RestaurantsProvider: React.FC<RestaurantsProviderProps> = ({
  children,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  /**
   * Get restaurant by ID
   */
  const getRestaurantById = useCallback(
    (id: string): Restaurant | undefined => {
      return restaurants.find((r) => r.id === id);
    },
    [restaurants]
  );

  /**
   * Clear all restaurants
   */
  const clearRestaurants = useCallback(() => {
    setRestaurants([]);
  }, []);

  /**
   * Add a single restaurant
   */
  const addRestaurant = useCallback((restaurant: Restaurant) => {
    setRestaurants((prev) => {
      // Avoid duplicates
      if (prev.some((r) => r.id === restaurant.id)) {
        return prev;
      }
      return [...prev, restaurant];
    });
  }, []);

  /**
   * Update a restaurant
   */
  const updateRestaurant = useCallback(
    (id: string, updates: Partial<Restaurant>) => {
      setRestaurants((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
      );
    },
    []
  );

  /**
   * Remove a restaurant
   */
  const removeRestaurant = useCallback((id: string) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const value: RestaurantsContextType = {
    restaurants,
    setRestaurants,
    getRestaurantById,
    clearRestaurants,
    addRestaurant,
    updateRestaurant,
    removeRestaurant,
  };

  return (
    <RestaurantsContext.Provider value={value}>
      {children}
    </RestaurantsContext.Provider>
  );
};

/**
 * Hook to use Restaurants Context
 * 
 * @returns Restaurants context value
 * @throws Error if used outside RestaurantsProvider
 * 
 * @example
 * ```tsx
 * const { restaurants, addRestaurant } = useRestaurants();
 * ```
 */
export const useRestaurants = (): RestaurantsContextType => {
  const context = useContext(RestaurantsContext);
  
  if (!context) {
    throw new Error('useRestaurants must be used within RestaurantsProvider');
  }
  
  return context;
};