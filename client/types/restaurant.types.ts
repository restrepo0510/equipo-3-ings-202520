// types/restaurant.types.ts

/**
 * Location coordinates interface
 * Re-exported for convenience
 */
export interface LocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Restaurant Entity
 * Represents a restaurant with location and complete information
 * Matches backend Restaurant entity from NestJS + TypeORM
 */
export interface Restaurant {
  /** Unique identifier (UUID) */
  id: string;
  
  /** Restaurant name */
  name: string;
  
  /** Restaurant description */
  description?: string;
  
  /** Physical address */
  address: string;
  
  /** Latitude coordinate (stored as decimal in DB) */
  latitude: number;
  
  /** Longitude coordinate (stored as decimal in DB) */
  longitude: number;
  
  /** Restaurant category/type (e.g., "Italian", "Fast Food") */
  category?: string;
  
  /** Contact phone number */
  phone?: string;
  
  /** Contact email */
  email?: string;
  
  /** User ID of the restaurant owner */
  userId?: string;
  
  /** Whether the restaurant is active/visible */
  isActive: boolean;
  
  /** Restaurant image URL */
  imageUrl?: string;
  
  /** Opening time (e.g., "08:00 AM") */
  openingTime?: string;
  
  /** Closing time (e.g., "10:00 PM") */
  closingTime?: string;
  
  /** Creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt: Date;
  
  /** Distance from user location (only present in nearby searches) */
  distance?: number;
}

/**
 * Restaurant with required distance field
 * Used when fetching nearby restaurants
 */
export interface RestaurantWithDistance extends Restaurant {
  /** Distance from user in kilometers */
  distance: number;
}

/**
 * Create Restaurant Input
 * Data Transfer Object for creating new restaurants
 * Matches CreateRestaurantDto from backend
 */
export interface CreateRestaurantInput {
  name: string;
  description?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  phone?: string;
  email?: string;
  userId?: string;
  isActive?: boolean;
  imageUrl?: string;
  openingTime?: string;
  closingTime?: string;
}

/**
 * Update Restaurant Input
 * Data Transfer Object for updating restaurants
 * All fields are optional
 */
export interface UpdateRestaurantInput {
  name?: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  phone?: string;
  email?: string;
  userId?: string;
  isActive?: boolean;
  imageUrl?: string;
  openingTime?: string;
  closingTime?: string;
}

/**
 * Nearby Restaurants Query Parameters
 * Used for searching restaurants by location
 */
export interface NearbyRestaurantsParams {
  /** User's latitude */
  latitude: number;
  
  /** User's longitude */
  longitude: number;
  
  /** Search radius in kilometers (default: 30km, max: 50km) */
  radius?: number;
  
  /** Maximum number of results (default: 20, max: 100) */
  limit?: number;
}

/**
 * Restaurant List Response
 * Paginated response for restaurant lists
 */
export interface RestaurantListResponse {
  restaurants: Restaurant[];
  total: number;
  page?: number;
  limit?: number;
}

/**
 * Restaurant Search Filters
 * Additional filters for restaurant queries
 */
export interface RestaurantSearchFilters {
  /** Filter by category */
  category?: string;
  
  /** Filter by active status */
  isActive?: boolean;
  
  /** Search term for name/description */
  searchTerm?: string;
  
  /** Filter by user/owner ID */
  userId?: string;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Validates if restaurant has valid coordinates
 * 
 * @param restaurant - Restaurant object to validate
 * @returns true if coordinates are valid
 * 
 * @example
 * if (hasValidCoordinates(restaurant)) {
 *   // Safe to use latitude and longitude
 * }
 */
export const hasValidCoordinates = (restaurant: Restaurant): boolean => {
  const lat = Number(restaurant.latitude);
  const lon = Number(restaurant.longitude);
  
  return (
    !isNaN(lat) &&
    !isNaN(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
};

/**
 * Validates if restaurant has all required data for map display
 * 
 * @param restaurant - Restaurant object to validate
 * @returns true if restaurant can be displayed on map
 * 
 * @example
 * const validRestaurants = restaurants.filter(hasMapData);
 */
export const hasMapData = (restaurant: Restaurant): boolean => {
  return !!(
    restaurant.id &&
    restaurant.name &&
    restaurant.isActive &&
    hasValidCoordinates(restaurant)
  );
};

/**
 * Type guard to check if restaurant is active
 * 
 * @param restaurant - Restaurant object to check
 * @returns true if restaurant is active
 */
export const isActiveRestaurant = (restaurant: Restaurant): boolean => {
  return restaurant.isActive === true;
};

/**
 * Type guard to check if restaurant has distance data
 * 
 * @param restaurant - Restaurant object to check
 * @returns true if restaurant has distance property
 */
export const hasDistance = (
  restaurant: Restaurant
): restaurant is RestaurantWithDistance => {
  return typeof restaurant.distance === 'number' && restaurant.distance >= 0;
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Formats opening hours for display
 * 
 * @param openingTime - Opening time string
 * @param closingTime - Closing time string
 * @returns Formatted hours string or undefined
 * 
 * @example
 * formatOpeningHours("08:00", "22:00") // "08:00 - 22:00"
 */
export const formatOpeningHours = (
  openingTime?: string,
  closingTime?: string
): string | undefined => {
  if (!openingTime || !closingTime) return undefined;
  return `${openingTime} - ${closingTime}`;
};

/**
 * Gets restaurant display image
 * Returns imageUrl or default placeholder
 * 
 * @param restaurant - Restaurant object
 * @returns Image URL string
 */
export const getRestaurantImage = (restaurant: Restaurant): string => {
  return (
    restaurant.imageUrl ||
    'https://cdn-icons-png.flaticon.com/512/2921/2921822.png'
  );
};

/**
 * Checks if restaurant is currently open (basic check)
 * Note: This is a simple time-based check, doesn't account for timezones or days
 * 
 * @param restaurant - Restaurant object
 * @returns true if current time is within opening hours
 */
export const isRestaurantOpen = (restaurant: Restaurant): boolean => {
  if (!restaurant.openingTime || !restaurant.closingTime) {
    return true; // Assume open if hours not set
  }

  // This is a simplified check - you might want to add more sophisticated logic
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  return (
    currentTime >= restaurant.openingTime &&
    currentTime <= restaurant.closingTime
  );
};