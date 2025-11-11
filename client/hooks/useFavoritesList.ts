// hooks/useFavoritesList.ts

import { useState, useEffect, useCallback } from 'react';
import { FavoritesApiService } from '@/services/favoriteService';
import { FavoritesAlertService } from '@/services/favoritesAlertService';
import type { Favorite } from '@/types/favorites.types';

/**
 * Hook return type
 */
interface UseFavoritesListReturn {
  favorites: Favorite[];
  isLoading: boolean;
  error: string | null;
  loadFavorites: () => Promise<void>;
  removeFavoriteFromList: (productId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

/**
 * useFavoritesList Hook
 * 
 * Manages favorites list state and operations for FavoritesScreen
 * Encapsulates loading and removal logic
 * 
 * @param token - JWT authentication token
 * @returns Favorites list state and operations
 */
export const useFavoritesList = (token: string | null): UseFavoritesListReturn => {
  // ============================================================================
  // State
  // ============================================================================
  
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Load favorites on mount
   */
  useEffect(() => {
    loadFavorites();
  }, [token]);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Loads user favorites from API
   */
  const loadFavorites = useCallback(async (): Promise<void> => {
    if (!token) {
      setIsLoading(false);
      setError('No authentication token');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const data = await FavoritesApiService.getUserFavorites(token);
      setFavorites(data);
      
      console.log('✅ Favorites loaded:', data.length);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
      setError('Failed to load favorites');
      FavoritesAlertService.showLoadError();
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Removes a favorite from the list
   * Optimistic update with rollback on error
   */
  const removeFavoriteFromList = useCallback(async (productId: string): Promise<void> => {
    if (!token) {
      FavoritesAlertService.showLoginRequired();
      return;
    }

    // Store original state for rollback
    const originalFavorites = [...favorites];

    try {
      // Optimistic update
      setFavorites(prev => prev.filter(f => f.product.id !== productId));

      // Call API
      await FavoritesApiService.removeFavorite(productId, token);
      
      console.log('✅ Favorite removed:', productId);
    } catch (error) {
      console.error('❌ Error removing favorite:', error);
      
      // Rollback on error
      setFavorites(originalFavorites);
      FavoritesAlertService.showRemoveFavoriteError();
    }
  }, [token, favorites]);

  /**
   * Refreshes favorites list
   */
  const refreshFavorites = useCallback(async (): Promise<void> => {
    await loadFavorites();
  }, [loadFavorites]);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    favorites,
    isLoading,
    error,
    loadFavorites,
    removeFavoriteFromList,
    refreshFavorites,
  };
};