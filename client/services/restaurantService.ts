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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch restaurants');
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
      console.log(`🔍 Fetching restaurant: ${restaurantId}`);
      
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch restaurant');
      }

      const data = await response.json();
      console.log('✅ Restaurant fetched:', data.name);
      return data;
    } catch (error) {
      console.error('❌ Error fetching restaurant:', error);
      throw error;
    }
  }

  /**
   * Get nearby restaurants based on user location
   */
  async getNearby(params: NearbyParams): Promise<Restaurant[]> {
    try {
      const { latitude, longitude, radius = 20, limit = 30 } = params;

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch nearby restaurants');
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
      console.log('📝 Creating restaurant:', restaurantData);
      
      const response = await fetch(`${API_URL}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(restaurantData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create restaurant');
      }

      const data = await response.json();
      console.log('✅ Restaurant created:', data.id);
      return data;
    } catch (error) {
      console.error('❌ Error creating restaurant:', error);
      throw error;
    }
  }

  /**
   * Update a restaurant
   * Uses PUT method to match NestJS controller
   */
  async update(
    restaurantId: string,
    updateData: Partial<Restaurant>,
    token: string
  ): Promise<Restaurant> {
    try {
      console.log(`📝 Updating restaurant: ${restaurantId}`, updateData);
      
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'PUT', // ✅ Changed from PATCH to PUT
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response:', response.status, errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || 'Failed to update restaurant' };
        }
        
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Restaurant updated:', data.name);
      return data;
    } catch (error: any) {
      console.error('❌ Error updating restaurant:', error.message);
      throw error;
    }
  }

  /**
   * Delete a restaurant
   */
  async delete(restaurantId: string, token: string): Promise<void> {
    try {
      console.log(`🗑️ Deleting restaurant: ${restaurantId}`);
      
      const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete restaurant');
      }

      console.log('✅ Restaurant deleted');
    } catch (error) {
      console.error('❌ Error deleting restaurant:', error);
      throw error;
    }
  }
}

export const restaurantService = new RestaurantService();
export default restaurantService;