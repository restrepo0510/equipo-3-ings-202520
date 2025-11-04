// context/FavoritesContext.tsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { favoriteService } from '@/services/favoriteService';
import { useAuth } from './AuthContext';

interface FavoritesContextValue {
  favorites: Set<string>;
  loadFavorites: () => Promise<void>;
  addFavorite: (productId: string) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const userFavorites = await favoriteService.getUserFavorites(token);
      const favoriteIds = new Set(userFavorites.map(fav => fav.product.id));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const addFavorite = useCallback(async (productId: string) => {
    if (!token) throw new Error('No token');
    
    setFavorites(prev => new Set(prev).add(productId));
    
    try {
      await favoriteService.addFavorite(productId, token);
    } catch (error) {
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      throw error;
    }
  }, [token]);

  const removeFavorite = useCallback(async (productId: string) => {
    if (!token) throw new Error('No token');
    
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
    
    try {
      await favoriteService.removeFavorite(productId, token);
    } catch (error) {
      setFavorites(prev => new Set(prev).add(productId));
      throw error;
    }
  }, [token]);

  const isFavorite = useCallback((productId: string) => {
    return favorites.has(productId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      loadFavorites, 
      addFavorite, 
      removeFavorite,
      isFavorite,
      isLoading 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};