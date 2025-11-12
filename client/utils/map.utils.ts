// utils/map.utils.ts

import type { Region } from 'react-native-maps';
import type { Restaurant, LocationCoords } from '@/types/restaurant.types';
import { MAP_CONFIG } from '@/constants/map.constants';

/**
 * Map Utilities
 * Helper functions for map calculations and region creation
 */
export class MapUtils {
  /**
   * Creates a map region centered on a restaurant with focused zoom
   * 
   * @param restaurant - Restaurant to center on
   * @returns Map region configuration
   */
  static createRestaurantRegion(restaurant: Restaurant): Region {
    // ✅ LIMPIEZA: Ya no necesitamos Number() porque son number
    return {
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      latitudeDelta: MAP_CONFIG.ZOOM.FOCUSED.LATITUDE_DELTA,
      longitudeDelta: MAP_CONFIG.ZOOM.FOCUSED.LONGITUDE_DELTA,
    };
  }

  /**
   * Creates a map region centered on user's location with default zoom
   * 
   * @param location - User's current location
   * @returns Map region configuration
   */
  static createUserRegion(location: LocationCoords): Region {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: MAP_CONFIG.ZOOM.DEFAULT.LATITUDE_DELTA,
      longitudeDelta: MAP_CONFIG.ZOOM.DEFAULT.LONGITUDE_DELTA,
    };
  }

  /**
   * Creates a map region from raw coordinates with default zoom
   * 
   * @param latitude - Latitude coordinate
   * @param longitude - Longitude coordinate
   * @returns Map region configuration
   */
  static createRegionFromCoords(latitude: number, longitude: number): Region {
    return {
      latitude,
      longitude,
      latitudeDelta: MAP_CONFIG.ZOOM.DEFAULT.LATITUDE_DELTA,
      longitudeDelta: MAP_CONFIG.ZOOM.DEFAULT.LONGITUDE_DELTA,
    };
  }

  /**
   * Calculates distance between two coordinates using Haversine formula
   * 
   * @param lat1 - First latitude
   * @param lon1 - First longitude
   * @param lat2 - Second latitude
   * @param lon2 - Second longitude
   * @returns Distance in kilometers
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Calculates distance between a restaurant and a location
   * 
   * @param restaurant - Restaurant object
   * @param location - Location coordinates
   * @returns Distance in kilometers
   */
  static calculateRestaurantDistance(
    restaurant: Restaurant,
    location: LocationCoords
  ): number {
    // ✅ LIMPIEZA: Directamente usamos las propiedades sin conversión
    return this.calculateDistance(
      restaurant.latitude,
      restaurant.longitude,
      location.latitude,
      location.longitude
    );
  }

  /**
   * Converts degrees to radians
   * 
   * @param degrees - Angle in degrees
   * @returns Angle in radians
   */
  private static toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Formats distance for display
   * 
   * @param distance - Distance in kilometers
   * @returns Formatted distance string
   */
  static formatDistance(distance: number): string {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
  }

  /**
   * Validates if coordinates are within valid ranges
   * 
   * @param latitude - Latitude to validate
   * @param longitude - Longitude to validate
   * @returns true if coordinates are valid
   */
  static areValidCoordinates(latitude: number, longitude: number): boolean {
    return (
      !isNaN(latitude) &&
      !isNaN(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
  }

  /**
   * Validates if restaurant has valid coordinates
   * 
   * @param restaurant - Restaurant to validate
   * @returns true if coordinates are valid
   */
  static hasValidCoordinates(restaurant: Restaurant): boolean {
    return this.areValidCoordinates(restaurant.latitude, restaurant.longitude);
  }
}