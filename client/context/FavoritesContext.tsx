// context/FavoritesContext.tsx

import React, { createContext, useState, useContext, useCallback } from 'react';
import { FavoritesApiService } from '@/services/favoriteService';
import { FavoritesAlertService } from '@/services/favoritesAlertService';
import { useAuth } from './AuthContext';
import type { FavoritesContextValue } from '@/types/favorites.types';

/**
 * Favorites Context
 */
const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

/**
 * Favorites Provider Props
 */
interface FavoritesProviderProps {
  children: React.ReactNode;
}

/**
 * FavoritesProvider Component
 * 
 * Manages favorites state across the entire app
 * Handles add, remove, and check operations with optimistic updates
 * 
 * @example
 * ```tsx
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 * ```
 */
export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  // ============================================================================
  // State Management
  // ============================================================================
  
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Favorites Operations
  // ============================================================================

  /**
   * Loads all user favorites from API
   */
  const loadFavorites = useCallback(async (): Promise<void> => {
    if (!token) {
      console.log('⚠️ No token available for loading favorites');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userFavorites = await FavoritesApiService.getUserFavorites(token);
      const favoriteIds = new Set(userFavorites.map(fav => fav.product.id));
      
      setFavorites(favoriteIds);
      console.log('✅ Favorites loaded:', favoriteIds.size);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
      setError('Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Adds a product to favorites
   * Optimistic update with rollback on error
   * 
   * @param productId - Product ID to add
   * @throws Error if operation fails
   */
  const addFavorite = useCallback(async (productId: string): Promise<void> => {
    if (!token) {
      FavoritesAlertService.showLoginRequired();
      throw new Error('No authentication token');
    }

    // Optimistic update
    setFavorites(prev => new Set(prev).add(productId));
    console.log('⏳ Adding favorite:', productId);

    try {
      await FavoritesApiService.addFavorite(productId, token);
      console.log('✅ Favorite added:', productId);
    } catch (error) {
      console.error('❌ Error adding favorite:', error);
      
      // Rollback on error
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      
      FavoritesAlertService.showAddFavoriteError();
      throw error;
    }
  }, [token]);

  /**
   * Removes a product from favorites
   * Optimistic update with rollback on error
   * 
   * @param productId - Product ID to remove
   * @throws Error if operation fails
   */
  const removeFavorite = useCallback(async (productId: string): Promise<void> => {
    if (!token) {
      FavoritesAlertService.showLoginRequired();
      throw new Error('No authentication token');
    }

    // Optimistic update
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
    console.log('⏳ Removing favorite:', productId);

    try {
      await FavoritesApiService.removeFavorite(productId, token);
      console.log('✅ Favorite removed:', productId);
    } catch (error) {
      console.error('❌ Error removing favorite:', error);
      
      // Rollback on error
      setFavorites(prev => new Set(prev).add(productId));
      
      FavoritesAlertService.showRemoveFavoriteError();
      throw error;
    }
  }, [token]);

  /**
   * Checks if a product is in favorites
   * 
   * @param productId - Product ID to check
   * @returns true if product is in favorites
   */
  const isFavorite = useCallback((productId: string): boolean => {
    return favorites.has(productId);
  }, [favorites]);

  /**
   * Clears error state
   */
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: FavoritesContextValue = {
    favorites,
    isLoading,
    error,
    loadFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearError,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * useFavorites Hook
 * 
 * Provides access to favorites state and operations
 * Must be used within FavoritesProvider
 * 
 * @example
 * ```tsx
 * const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
 * ```
 * 
 * @throws Error if used outside FavoritesProvider
 */
export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};