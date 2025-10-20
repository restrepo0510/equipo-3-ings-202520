// services/restaurantService.ts
import { API_URL } from '@/config/api';

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  category?: string;
  phone?: string;
  email?: string;
  userId?: string;
  isActive: boolean;
  imageUrl?: string;
  openingTime?: string;
  closingTime?: string;
  createdAt: Date;
  updatedAt: Date;
  distance?: number; // Only present in nearby searches
}

interface NearbyParams {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}

class RestaurantService {
  /**
   * Get all restaurants
   */
  async getAll(): Promise<Restaurant[]> {
    try {
      const response = await fetch(`${API_URL}/restaurants`);
      
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
   * Get a single restaurant by ID
   */
  async getById(restaurantId: string): Promise<Restaurant> {
    try {
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`);
      
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
   * Get nearby restaurants based on user location
   */
  async getNearby(params: NearbyParams): Promise<Restaurant[]> {
    try {
      const { latitude, longitude, radius = 20, limit = 20 } = params;

      const queryParams = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        radius: radius.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(
        `${API_URL}/restaurants/nearby?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch nearby restaurants');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      throw error;
    }
  }

  /**
   * Create a new restaurant
   */
  async create(restaurantData: Partial<Restaurant>, token: string): Promise<Restaurant> {
    try {
      const response = await fetch(`${API_URL}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(restaurantData),
      });

      if (!response.ok) {
        throw new Error('Failed to create restaurant');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating restaurant:', error);
      throw error;
    }
  }

  /**
   * Update a restaurant
   */
  async update(
    restaurantId: string,
    updateData: Partial<Restaurant>,
    token: string
  ): Promise<Restaurant> {
    try {
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update restaurant');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating restaurant:', error);
      throw error;
    }
  }

  /**
   * Delete a restaurant
   */
  async delete(restaurantId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
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