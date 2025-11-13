// hooks/useRestaurantProducts.ts

import { useState, useEffect, useCallback } from 'react';
import { restaurantService } from '@/services/restaurantService';
import { productService } from '@/services/productService';
import { ReviewsAlertService } from '@/services/reviewsAlertService';
import { REVIEWS_CONSTANTS } from '@/constants/reviews.constants';
import type { RestaurantSummary, ProductSummary } from '@/types/reviews.types';

/**
 * Location interface (simplified)
 */
interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Hook return type
 */
interface UseRestaurantProductsReturn {
  restaurants: RestaurantSummary[];
  products: ProductSummary[];
  isLoadingRestaurants: boolean;
  isLoadingProducts: boolean;
  loadRestaurants: () => Promise<void>;
  loadProducts: (restaurantId: string) => Promise<void>;
}

/**
 * useRestaurantProducts Hook
 * 
 * Manages loading restaurants and products for review form
 * Encapsulates API calls and error handling
 * 
 * @param location - User location
 * @param token - JWT authentication token
 * @returns Restaurants and products state
 */
export const useRestaurantProducts = (
  location: Location | null,
  token: string | null
): UseRestaurantProductsReturn => {
  // ============================================================================
  // State
  // ============================================================================
  
  const [restaurants, setRestaurants] = useState<RestaurantSummary[]>([]);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // ============================================================================
  // Operations
  // ============================================================================

  /**
   * Loads nearby restaurants
   * ✅ CORREGIDO: Convierte Restaurant a RestaurantSummary
   */
  const loadRestaurants = useCallback(async (): Promise<void> => {
    if (!location) {
      console.log('⚠️ No location available');
      return;
    }

    setIsLoadingRestaurants(true);

    try {
      const nearby = await restaurantService.getNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: REVIEWS_CONSTANTS.LOCATION.DEFAULT_RADIUS_KM,
      });

      // ✅ Los datos ya vienen normalizados del service como Restaurant[]
      // Convertimos a RestaurantSummary[] (son compatibles ahora)
      const restaurantSummaries: RestaurantSummary[] = nearby.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        imageUrl: restaurant.imageUrl,
        category: restaurant.category,
        phone: restaurant.phone,
        email: restaurant.email,
        userId: restaurant.userId,
        isActive: restaurant.isActive,
        openingTime: restaurant.openingTime,
        closingTime: restaurant.closingTime,
        createdAt: restaurant.createdAt,
        updatedAt: restaurant.updatedAt,
        distance: restaurant.distance,
      }));

      setRestaurants(restaurantSummaries);
      console.log('✅ Restaurants loaded:', restaurantSummaries.length);
    } catch (error) {
      console.error('❌ Error loading restaurants:', error);
      ReviewsAlertService.showRestaurantsLoadError();
      setRestaurants([]);
    } finally {
      setIsLoadingRestaurants(false);
    }
  }, [location]);

  /**
   * Loads products for a specific restaurant
   */
  const loadProducts = useCallback(async (restaurantId: string): Promise<void> => {
    if (!token) {
      console.log('⚠️ No token available');
      return;
    }

    setIsLoadingProducts(true);

    try {
      const data = await productService.getByRestaurant(restaurantId, token);
      setProducts(data);
      console.log('✅ Products loaded:', data.length);
    } catch (error) {
      console.error('❌ Error loading products:', error);
      ReviewsAlertService.showProductsLoadError();
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [token]);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Load restaurants on mount if location is available
   */
  useEffect(() => {
    if (location) {
      loadRestaurants();
    }
  }, [location, loadRestaurants]);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    restaurants,
    products,
    isLoadingRestaurants,
    isLoadingProducts,
    loadRestaurants,
    loadProducts,
  };
};