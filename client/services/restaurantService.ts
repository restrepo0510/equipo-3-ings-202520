// services/restaurantService.ts
import { API_URL } from '@/config/api';

export interface Restaurant {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address: string;
  description?: string;
  category?: string;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string; // ✅ Imagen de perfil del restaurante
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateRestaurantData {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  category?: string;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string; // ✅ Permitir actualizar la imagen
}

class RestaurantService {
  /**
   * Get restaurant by ID
   */
  async getById(restaurantId: string): Promise<Restaurant> {
    try {
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch restaurant');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw error;
    }
  }

  /**
   * Get all restaurants
   */
  async getAll(): Promise<Restaurant[]> {
    try {
      const response = await fetch(`${API_URL}/restaurants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  }

  /**
   * Update restaurant information
   */
  async update(
    restaurantId: string,
    updateData: UpdateRestaurantData,
    token: string
  ): Promise<Restaurant> {
    try {
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update restaurant');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating restaurant:', error);
      throw error;
    }
  }

  /**
   * Delete restaurant
   */
  async delete(restaurantId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete restaurant');
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      throw error;
    }
  }
}

export const restaurantService = new RestaurantService();
export default restaurantService;