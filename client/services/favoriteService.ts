import { API_URL } from '@/config/api';
import { Product } from './productService';

export interface Favorite {
  id: string;
  product: Product;
  createdAt: Date;
}

class FavoriteService {
  async addFavorite(productId: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/favorites/${productId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error adding favorite');
    }
  }

  async removeFavorite(productId: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/favorites/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error removing favorite');
    }
  }

  async getUserFavorites(token: string): Promise<Favorite[]> {
    const response = await fetch(`${API_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error loading favorites');
    }

    return response.json();
  }

  async isFavorite(productId: string, token: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/favorites/check/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return false;
    return response.json();
  }
}

export const favoriteService = new FavoriteService();