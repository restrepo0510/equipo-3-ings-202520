// screens/MapScreen.tsx

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Hooks and services
import { useLocation } from '../../hooks/useLocation';
import { restaurantService, Restaurant } from '../../services/restaurantService';

// Components
import { BottomNavigation } from '../../components/ui/BottomNavigation';
import { UserLocationMarker } from '../../components/ui/map/UserLocationMarker';
import { RestaurantMapCard } from '../../components/ui/map/RestaurantMapCard';
import { createNavItems } from '../../utils/navigationHelpers';

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
  const router = useRouter();
  const { restaurantId, latitude, longitude } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  
  // ============================================================================
  // Navigation
  // ============================================================================
  
  const navItems = createNavItems('map', router);

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

        console.log('🗺️ Nearby restaurants loaded:', data.length);
        setRestaurants(data);

        // ✅ Si viene un restaurantId desde HomeScreen, seleccionarlo
        if (restaurantId) {
          const targetRestaurant = data.find(r => r.id === restaurantId);
          if (targetRestaurant) {
            setSelectedRestaurant(targetRestaurant);
            
            // Centrar el mapa en el restaurante seleccionado
            setTimeout(() => {
              mapRef.current?.animateToRegion({
                latitude: Number(targetRestaurant.latitude),
                longitude: Number(targetRestaurant.longitude),
                latitudeDelta: MAP_DELTA.LATITUDE / 3,
                longitudeDelta: MAP_DELTA.LONGITUDE / 3,
              }, 1000);
            }, 500);
          }
        }
      } catch (err) {
        const errorMessage = 'Could not load restaurants';
        console.error('❌ Error loading restaurants:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, [location, restaurantId]);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  /**
   * Handles restaurant marker press
   * Shows the restaurant info card at the bottom
   */
  const handleMarkerPress = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    
    // Centrar el mapa en el restaurante seleccionado
    mapRef.current?.animateToRegion({
      latitude: Number(restaurant.latitude),
      longitude: Number(restaurant.longitude),
      latitudeDelta: MAP_DELTA.LATITUDE / 3,
      longitudeDelta: MAP_DELTA.LONGITUDE / 3,
    }, 500);
  }, []);

  /**
   * Handles "View products" button press
   * Navigates to ProductsScreen with restaurantId
   */
  const handleViewProducts = useCallback((restaurant: Restaurant) => {
    console.log('📦 Navigating to products from:', restaurant.name);
    router.push({
      pathname: '/(tabs)/ProductsScreen',
      params: { restaurantId: restaurant.id },
    });
  }, [router]);

  // ============================================================================
  // Map Configuration
  // ============================================================================

  /**
   * Calculates initial map region based on user's location or selected restaurant
   */
  const getInitialRegion = useCallback((): Region | undefined => {
    // Si viene desde HomeScreen con coordenadas específicas
    if (latitude && longitude) {
      return {
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: MAP_DELTA.LATITUDE / 2,
        longitudeDelta: MAP_DELTA.LONGITUDE / 2,
      };
    }

    // Ubicación del usuario por defecto
    if (location) {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: MAP_DELTA.LATITUDE,
        longitudeDelta: MAP_DELTA.LONGITUDE,
      };
    }

    return undefined;
  }, [location, latitude, longitude]);

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
          ref={mapRef}
          style={mapStyles.map}
          initialRegion={getInitialRegion()}
          showsUserLocation={false}
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
              pinColor={restaurant.id === selectedRestaurant?.id ? '#27AE60' : '#FF6B6B'}
            />
          ))}
        </MapView>
      )}

      {/* Restaurant Info Card */}
      {selectedRestaurant && (
        <RestaurantMapCard
          restaurant={selectedRestaurant}
          onViewProducts={() => handleViewProducts(selectedRestaurant)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}