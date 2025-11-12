// types/favorites.types.ts

import type { Product } from './product.types';

/**
 * Favorite entity structure
 */
export interface Favorite {
  id: string;
  productId: string;
  userId: number;
  product: Product;
  createdAt: Date;
}

/**
 * Favorite API response
 */
export interface FavoriteResponse {
  id: string;
  productId: string;
  userId: number;
  product: Product;
  createdAt: string;
}

/**
 * Favorites state
 */
export interface FavoritesState {
  favorites: Set<string>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Favorites context value
 */
export interface FavoritesContextValue extends FavoritesState {
  loadFavorites: () => Promise<void>;
  addFavorite: (productId: string) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  clearError: () => void;
}

/**
 * API Error for favorites
 */
export interface FavoritesApiError {
  message: string;
  statusCode?: number;
}