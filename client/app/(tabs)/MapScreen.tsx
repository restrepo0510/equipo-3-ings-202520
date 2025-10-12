// screens/MapScreen.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

// Hooks and services
import { useLocation } from '../../hooks/useLocation';
import { restaurantService, Restaurant } from '../../services/restaurantService';

// Components
import { BottomNavigation, NavItem } from '../../components/ui/BottomNavigation';
import { UserLocationMarker } from '../../components/ui/map/UserLocationMarker';
import { RestaurantMapCard } from '../../components/ui/map/RestaurantMapCard';

// Styles and constants
import { mapStyles } from '../../styles/mapScreen.styles';
import { COLORS } from '../../styles/homeScreen.styles';
import {
  DEFAULT_SEARCH_RADIUS_KM,
  MAP_DELTA,
} from '../../constants/mapScreen.constants';

/**
 * MapScreen Component
 * 
 * Displays an interactive map showing:
 * - User's current location (blue marker)
 * - Nearby restaurants (standard markers)
 * - Restaurant info card when a marker is selected
 * - Bottom navigation bar
 * 
 * Fetches restaurants within a specified radius from the user's location.
 */
export default function MapScreen() {
  // ============================================================================
  // State Management
  // ============================================================================

  const { location } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Data Fetching
  // ============================================================================

  /**
   * Loads nearby restaurants based on user's location
   * Uses the default search radius defined in constants
   */
  useEffect(() => {
    const loadRestaurants = async () => {
      if (!location) return;

      try {
        setIsLoading(true);
        setError(null);

        const data = await restaurantService.getNearby({
          latitude: location.latitude,
          longitude: location.longitude,
          radius: DEFAULT_SEARCH_RADIUS_KM,
        });

        console.log('📍 Nearby restaurants loaded:', data.length);
        setRestaurants(data);
      } catch (err) {
        const errorMessage = 'Could not load restaurants';
        console.error('❌ Error loading restaurants:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, [location]);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  /**
   * Handles restaurant marker press
   * Shows the restaurant info card at the bottom
   */
  const handleMarkerPress = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  /**
   * Handles "View products" button press
   * TODO: Navigate to restaurant products screen
   */
  const handleViewProducts = useCallback((restaurant: Restaurant) => {
    console.log('View products from:', restaurant.name);
    // navigation.navigate('RestaurantProducts', { id: restaurant.id });
  }, []);

  /**
   * Bottom navigation items configuration
   */
const navItems: NavItem[] = [
  {
    id: 'map',
    icon: 'location',
    onPress: () => console.log('Map pressed'),
    isActive: true, // SÍ activo en Map
  },
  {
    id: 'favorites',
    icon: 'heart-outline',
    onPress: () => {
      console.log('Favorites pressed');
      // navigation.navigate('Favorites');
    },
    isActive: false,
  },
  {
    id: 'chat',
    icon: 'chatbubbles-outline',
    onPress: () => {
      console.log('Chat pressed');
      // navigation.navigate('Chat');
    },
    isActive: false,
  },
  {
    id: 'profile',
    icon: 'person-outline',
    onPress: () => {
      console.log('Profile pressed');
      // navigation.navigate('Profile');
    },
    isActive: false,
  },
];
  // ============================================================================
  // Map Configuration
  // ============================================================================

  /**
   * Calculates initial map region based on user's location
   */
  const getInitialRegion = useCallback((): Region | undefined => {
    if (!location) return undefined;

    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: MAP_DELTA.LATITUDE,
      longitudeDelta: MAP_DELTA.LONGITUDE,
    };
  }, [location]);

  // ============================================================================
  // Loading State
  // ============================================================================

  if (isLoading) {
    return (
      <View style={mapStyles.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryDark} />
        <Text style={mapStyles.loadingText}>Loading restaurants...</Text>
      </View>
    );
  }

  // ============================================================================
  // Error State
  // ============================================================================

  if (error) {
    return (
      <View style={mapStyles.centeredContainer}>
        <Text style={mapStyles.errorText}>{error}</Text>
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // ============================================================================
  // Main Render
  // ============================================================================

  return (
    <View style={mapStyles.container}>
      {/* Map View */}
      {location && (
        <MapView
          style={mapStyles.map}
          initialRegion={getInitialRegion()}
          showsUserLocation={false} // We use custom marker instead
          showsMyLocationButton
          showsCompass
        >
          {/* User Location Marker */}
          <UserLocationMarker
            latitude={location.latitude}
            longitude={location.longitude}
            title="Your location"
          />

          {/* Restaurant Markers */}
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: Number(restaurant.latitude) || 0,
                longitude: Number(restaurant.longitude) || 0,
              }}
              title={restaurant.name}
              description={restaurant.description}
              onPress={() => handleMarkerPress(restaurant)}
            />
          ))}
        </MapView>
      )}

      {/* Restaurant Info Card */}
      {selectedRestaurant && (
        <RestaurantMapCard
          restaurant={selectedRestaurant}
          onViewProducts={handleViewProducts}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}