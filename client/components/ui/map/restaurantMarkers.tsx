// components/ui/map/RestaurantMarkers.tsx

import React from 'react';
import { Marker } from 'react-native-maps';
import { MAP_MARKERS } from '@/constants/map.constants';
import type { Restaurant } from '@/types/restaurant.types';

/**
 * RestaurantMarkers Props
 */
interface RestaurantMarkersProps {
  /** List of restaurants to display */
  restaurants: Restaurant[];
  
  /** ID of currently selected restaurant */
  selectedRestaurantId?: string;
  
  /** Callback when a restaurant marker is pressed */
  onRestaurantPress: (restaurant: Restaurant) => void;
}

/**
 * RestaurantMarkers Component
 * 
 * Renders all restaurant markers on the map
 * Changes marker color for selected restaurant
 * 
 * @param props - Component props
 * @returns Collection of Marker components
 */
export const RestaurantMarkers: React.FC<RestaurantMarkersProps> = ({
  restaurants,
  selectedRestaurantId,
  onRestaurantPress,
}) => {
  /**
   * Determines marker color based on selection state
   */
  const getMarkerColor = (restaurantId: string): string => {
    return restaurantId === selectedRestaurantId
      ? MAP_MARKERS.RESTAURANT.SELECTED
      : MAP_MARKERS.RESTAURANT.DEFAULT;
  };

  return (
    <>
      {restaurants.map((restaurant) => {
        // ✅ Asegurar que sean números
        const latitude = Number(restaurant.latitude);
        const longitude = Number(restaurant.longitude);

        // Skip invalid coordinates
        if (isNaN(latitude) || isNaN(longitude)) {
          console.warn(`⚠️ Invalid coordinates for restaurant: ${restaurant.name}`, {
            lat: restaurant.latitude,
            latType: typeof restaurant.latitude,
            lon: restaurant.longitude,
            lonType: typeof restaurant.longitude,
          });
          return null;
        }

        // Additional validation
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
          console.warn(`⚠️ Out of range coordinates for: ${restaurant.name}`, { latitude, longitude });
          return null;
        }

        return (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude,
              longitude,
            }}
            title={restaurant.name}
            description={restaurant.description}
            onPress={() => onRestaurantPress(restaurant)}
            pinColor={getMarkerColor(restaurant.id)}
          />
        );
      })}
    </>
  );
};