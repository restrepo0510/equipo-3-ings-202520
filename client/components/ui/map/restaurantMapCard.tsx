// components/ui/map/RestaurantMapCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
 * Card horizontal con layout: Imagen | Información | Botón
 * Diseñado según la referencia visual proporcionada
 * 
 * Layout:
 * - Izquierda: Imagen del restaurante con badge "Ver prod..."
 * - Centro: Nombre, categoría, dirección, distancia
 * - Derecha: Botón de flecha circular
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
  const imageUrl = restaurant.imageUrl || MAP_PLACEHOLDERS.RESTAURANT_IMAGE;

  return (
    <View style={mapStyles.restaurantCardContainer}>
      <TouchableOpacity
        style={mapStyles.restaurantCard}
        onPress={() => onViewProducts(restaurant)}
        activeOpacity={0.95}
        accessibilityRole="button"
        accessibilityLabel={`Ver productos de ${restaurant.name}`}
      >
        {/* ========================================
            SECCIÓN IZQUIERDA: IMAGEN
        ======================================== */}
        <View style={mapStyles.imageSection}>
          <Image
            source={{ uri: imageUrl }}
            style={mapStyles.restaurantImage}
            accessibilityLabel={`Imagen de ${restaurant.name}`}
            accessibilityIgnoresInvertColors
          />
          
          
        </View>

        {/* ========================================
            SECCIÓN CENTRO: INFORMACIÓN
        ======================================== */}
        <View style={mapStyles.infoSection}>
          {/* Nombre del restaurante */}
          <Text
            style={mapStyles.restaurantName}
            numberOfLines={1}
            accessibilityRole="text"
          >
            {restaurant.name}
          </Text>

          {/* Categoría */}
          {restaurant.category && (
            <Text
              style={mapStyles.restaurantCategory}
              numberOfLines={1}
              accessibilityRole="text"
            >
              {restaurant.category}
            </Text>
          )}

          {/* Dirección */}
          {restaurant.address && (
            <Text
              style={mapStyles.restaurantAddress}
              numberOfLines={1}
              accessibilityRole="text"
            >
              📍 {restaurant.address}
            </Text>
          )}

          {/* Distancia */}
          {restaurant.distance !== undefined && (
            <Text
              style={mapStyles.restaurantDistance}
              accessibilityRole="text"
            >
              {restaurant.distance.toFixed(1)} km de distancia
            </Text>
          )}
        </View>

        {/* ========================================
            SECCIÓN DERECHA: BOTÓN FLECHA
        ======================================== */}
        <View style={mapStyles.buttonSection}>
            <View style={mapStyles.viewProductsButton}>
            <Text style={mapStyles.viewProductsButtonText}>Ver prod...</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Default export for compatibility
export default RestaurantMapCard;