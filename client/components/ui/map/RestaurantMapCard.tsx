// components/map/RestaurantMapCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Restaurant } from '../../../services/restaurantService';
import { mapStyles } from '../../../styles/mapScreen.styles';
import { PLACEHOLDER_IMAGE_URL } from '../../../constants/mapScreen.constants';

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
  return (
    <View style={mapStyles.restaurantCardContainer}>
      <View style={mapStyles.restaurantCard}>
        {/* Restaurant circular image */}
        <Image
          source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGE_URL }}
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
          <Text style={mapStyles.viewProductsButtonText}>View products</Text>
        </TouchableOpacity>

        {/* Restaurant name */}
        <Text
          style={mapStyles.restaurantName}
          numberOfLines={2}
          accessibilityRole="text"
        >
          {restaurant.name}
        </Text>
      </View>
    </View>
  );
};

// Default export for compatibility
export default RestaurantMapCard;