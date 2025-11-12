// components/ui/map/RestaurantMapCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { mapStyles } from '@/styles/mapScreen.styles';
import { MAP_PLACEHOLDERS } from '@/constants/map.constants';
import type { Restaurant } from '@/types/restaurant.types';

/**
 * Props for RestaurantMapCard component
 */
interface RestaurantMapCardProps {
  /** Restaurant data to display */
  restaurant: Restaurant;
  /** Callback when "View products" button is pressed */
  onViewProducts: (restaurant: Restaurant) => void;
}

/**
 * RestaurantMapCard Component
 * 
 * Displays a floating card with restaurant information when a marker is selected.
 * Shows restaurant image, name, and a button to view products.
 * 
 * @example
 * ```tsx
 * <RestaurantMapCard
 *   restaurant={selectedRestaurant}
 *   onViewProducts={(restaurant) => navigate('Products', { id: restaurant.id })}
 * />
 * ```
 */
export const RestaurantMapCard: React.FC<RestaurantMapCardProps> = ({
  restaurant,
  onViewProducts,
}) => {
  // ✅ LIMPIEZA: Usamos la función helper del tipo
  const imageUrl = restaurant.imageUrl || MAP_PLACEHOLDERS.RESTAURANT_IMAGE;

  return (
    <View style={mapStyles.restaurantCardContainer}>
      <View style={mapStyles.restaurantCard}>
        {/* Restaurant circular image */}
        <Image
          source={{ uri: imageUrl }}
          style={mapStyles.restaurantImage}
          accessibilityLabel={`${restaurant.name} image`}
        />

        {/* View products button */}
        <TouchableOpacity
          style={mapStyles.viewProductsButton}
          onPress={() => onViewProducts(restaurant)}
          accessibilityRole="button"
          accessibilityLabel={`View products from ${restaurant.name}`}
        >
          <Text style={mapStyles.viewProductsButtonText}>Ver productos</Text>
        </TouchableOpacity>

        {/* Restaurant name */}
        <Text
          style={mapStyles.restaurantName}
          numberOfLines={2}
          accessibilityRole="text"
        >
          {restaurant.name}
        </Text>

        {/* ✅ OPCIONAL: Mostrar información adicional */}
        {restaurant.address && (
          <Text
            style={mapStyles.restaurantAddress}
            numberOfLines={1}
            accessibilityRole="text"
          >
            {restaurant.address}
          </Text>
        )}

        {/* ✅ OPCIONAL: Mostrar distancia si está disponible */}
        {restaurant.distance !== undefined && (
          <Text
            style={mapStyles.restaurantDistance}
            accessibilityRole="text"
          >
            📍 {restaurant.distance.toFixed(1)} km
          </Text>
        )}
      </View>
    </View>
  );
};

// Default export for compatibility
export default RestaurantMapCard;