// services/restaurantService.ts

/**
 * Restaurant Service
 * Handles all API calls related to restaurants
 */

const API_URL = __DEV__
  ? 'http://192.168.20.22:3000/restaurants'
  : 'https://tu-api-production.com/restaurants';

/**
 * Restaurant data structure matching backend entity
 */
export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  category?: string;
  phone?: string;
  isActive: boolean;
  imageUrl?: string;
  openingTime?: string;
  closingTime?: string;
  distance?: number; // Calculated by backend in nearby endpoint
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * DTO for nearby restaurants query
 */
export interface NearbyRestaurantsDto {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}

/**
 * Restaurant Service
 * Provides methods to interact with the restaurants API
 */
export const restaurantService = {
  /**
   * Get all restaurants
   * @returns Promise<Restaurant[]>
   */
  async getAll(): Promise<Restaurant[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all restaurants:', error);
      throw error;
    }
  },

  /**
   * Get a single restaurant by ID
   * @param id Restaurant UUID
   * @returns Promise<Restaurant>
   */
  async getById(id: string): Promise<Restaurant> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Restaurant with ID ${id} not found`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching restaurant ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get nearby restaurants based on user location
   * @param dto NearbyRestaurantsDto with coordinates and optional radius/limit
   * @returns Promise<Restaurant[]> Sorted by distance
   */
  async getNearby(dto: NearbyRestaurantsDto): Promise<Restaurant[]> {
    try {
      const params = new URLSearchParams({
        latitude: dto.latitude.toString(),
        longitude: dto.longitude.toString(),
        radius: dto.radius?.toString() || '100',
        limit: dto.limit?.toString() || '20',
      });

      const response = await fetch(`${API_URL}/nearby?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch nearby restaurants');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      throw error;
    }
  },

  /**
   * Create a new restaurant
   * @param data Restaurant data without ID
   * @returns Promise<Restaurant>
   */
  async create(data: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Restaurant> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create restaurant');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating restaurant:', error);
      throw error;
    }
  },

  /**
   * Update an existing restaurant
   * @param id Restaurant UUID
   * @param data Partial restaurant data to update
   * @returns Promise<Restaurant>
   */
  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update restaurant');
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating restaurant ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a restaurant
   * @param id Restaurant UUID
   * @returns Promise<void>
   */
  async remove(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete restaurant');
      }
    } catch (error) {
      console.error(`Error deleting restaurant ${id}:`, error);
      throw error;
    }
  },
};