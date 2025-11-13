// hooks/useProductsList.ts

import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/productService';
import { restaurantService } from '@/services/restaurantService';
import { ProductsAlertService } from '@/services/productsAlertService';
import type { Product } from '@/types/product.types';
import type { Restaurant } from '@/services/restaurantService';

/**
 * Hook return type
 */
interface UseProductsListReturn {
  products: Product[];
  restaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

/**
 * useProductsList Hook
 * 
 * Manages products list state and operations
 * Encapsulates API calls and error handling
 * 
 * @param restaurantId - Restaurant ID
 * @param token - JWT authentication token
 * @returns Products and restaurant state
 */
export const useProductsList = (
  restaurantId: string | string[] | undefined,
  token: string | null
): UseProductsListReturn => {
  // ============================================================================
  // State
  // ============================================================================
  
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Validation
  // ============================================================================

  /**
   * Validates required parameters
   */
  const validateParams = (): boolean => {
    if (!restaurantId) {
      setError('No se especificó un restaurante');
      setIsLoading(false);
      return false;
    }

    if (!token) {
      setError('No hay token de autenticación');
      setIsLoading(false);
      return false;
    }

    return true;
  };

  // ============================================================================
  // Data Loading
  // ============================================================================

  /**
   * Loads restaurant information
   */
  const loadRestaurant = useCallback(async (): Promise<void> => {
    if (!restaurantId) return;

    try {
      const restaurantData = await restaurantService.getById(
        restaurantId as string
      );
      setRestaurant(restaurantData);
      console.log('✅ Restaurant loaded:', restaurantData.name);
    } catch (error) {
      console.error('❌ Error loading restaurant:', error);
      ProductsAlertService.showRestaurantLoadError();
    }
  }, [restaurantId]);

  /**
   * Loads products for restaurant
   */
  const loadProducts = useCallback(async (): Promise<void> => {
    if (!validateParams()) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await productService.getByRestaurant(
        restaurantId as string,
        token!
      );

      setProducts(data);
      console.log(`📦 Products loaded: ${data.length}`);
    } catch (error: any) {
      console.error('❌ Error loading products:', error);
      setError(error.message || 'No se pudieron cargar los productos');
      ProductsAlertService.showProductsLoadError(error);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId, token]);

  /**
   * Refreshes products list
   */
  const refreshProducts = useCallback(async (): Promise<void> => {
    await Promise.all([loadRestaurant(), loadProducts()]);
  }, [loadRestaurant, loadProducts]);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Load data on mount
   */
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    products,
    restaurant,
    isLoading,
    error,
    refreshProducts,
  };
};