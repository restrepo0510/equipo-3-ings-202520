// services/favoritesApiService.ts

import { API_URL } from '@/config/api';
import { FAVORITES_ENDPOINTS } from '@/constants/favorites.constants';
import type { Favorite, FavoriteResponse, FavoritesApiError } from '@/types/favorites.types';

/**
 * HTTP request configuration
 */
const createHeaders = (token: string) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Handles API response and errors
 */
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: FavoritesApiError = await response.json().catch(() => ({
      message: 'Unknown error occurred',
      statusCode: response.status,
    }));
    throw error;
  }

  return response.json();
};

/**
 * Maps API response to Favorite entity
 */
const mapFavoriteResponse = (response: FavoriteResponse): Favorite => ({
  id: response.id,
  productId: response.productId,
  userId: response.userId,
  product: response.product,
  createdAt: new Date(response.createdAt),
});

/**
 * FavoritesApiService
 * 
 * Handles all API communication for favorites feature
 * Single Responsibility: HTTP requests only
 */
export class FavoritesApiService {
  /**
   * Adds a product to favorites
   * 
   * @param productId - Product ID to add
   * @param token - JWT authentication token
   * @throws FavoritesApiError if request fails
   */
  static async addFavorite(productId: string, token: string): Promise<void> {
    try {
      const response = await fetch(
        `${API_URL}${FAVORITES_ENDPOINTS.BY_PRODUCT(productId)}`,
        {
          method: 'POST',
          headers: createHeaders(token),
        }
      );

      await handleApiResponse<void>(response);
    } catch (error) {
      console.error('❌ Error adding favorite:', error);
      throw error;
    }
  }

  /**
   * Removes a product from favorites
   * 
   * @param productId - Product ID to remove
   * @param token - JWT authentication token
   * @throws FavoritesApiError if request fails
   */
  static async removeFavorite(productId: string, token: string): Promise<void> {
    try {
      const response = await fetch(
        `${API_URL}${FAVORITES_ENDPOINTS.BY_PRODUCT(productId)}`,
        {
          method: 'DELETE',
          headers: createHeaders(token),
        }
      );

      if (!response.ok) {
        throw new Error('Error removing favorite');
      }
    } catch (error) {
      console.error('❌ Error removing favorite:', error);
      throw error;
    }
  }

  /**
   * Gets all user favorites
   * 
   * @param token - JWT authentication token
   * @returns Array of user favorites
   * @throws FavoritesApiError if request fails
   */
  static async getUserFavorites(token: string): Promise<Favorite[]> {
    try {
      const response = await fetch(
        `${API_URL}${FAVORITES_ENDPOINTS.BASE}`,
        {
          method: 'GET',
          headers: createHeaders(token),
        }
      );

      const data = await handleApiResponse<FavoriteResponse[]>(response);
      return data.map(mapFavoriteResponse);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
      throw error;
    }
  }

  /**
   * Checks if a product is in favorites
   * 
   * @param productId - Product ID to check
   * @param token - JWT authentication token
   * @returns true if product is in favorites
   */
  static async isFavorite(productId: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_URL}${FAVORITES_ENDPOINTS.CHECK(productId)}`,
        {
          method: 'GET',
          headers: createHeaders(token),
        }
      );

      if (!response.ok) return false;
      
      return response.json();
    } catch (error) {
      console.error('❌ Error checking favorite:', error);
      return false;
    }
  }
}