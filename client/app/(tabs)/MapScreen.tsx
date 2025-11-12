// app/(tabs)/MapScreen.tsx

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Hooks and services
import { useLocation } from '@/hooks/useLocation';
import { restaurantService } from '@/services/restaurantService';

// Components
import { BottomNavigation } from '@/components/ui/bottomNavigation';
import { UserLocationMarker } from '@/components/ui/map/userLocationMarker';
import { RestaurantMapCard } from '@/components/ui/map/restaurantMapCard';
import { RestaurantMarkers } from '@/components/ui/map/restaurantMarkers';
import { MapHeader } from '@/components/ui/map/mapHeader';

// Utils and helpers
import { createNavItems } from '@/utils/navigationHelpers';
import { MapUtils } from '@/utils/map.utils';

// Types and constants
import { MAP_CONFIG, MAP_TEXT } from '@/constants/map.constants';
import { mapStyles } from '@/styles/mapScreen.styles';
import type { Restaurant } from '@/types/restaurant.types';
import { extractStringParam, parseCoordinate } from '@/types/map.types';

/**
 * MapScreen Component
 * 
 * Interactive map displaying user location and nearby restaurants
 * 
 * @responsibilities
 * - Display user's current location
 * - Show nearby restaurants as markers
 * - Handle restaurant selection
 * - Navigate to restaurant products
 * - Center map on selected restaurant from HomeScreen
 * 
 * @features
 * - Real-time location tracking
 * - Restaurant markers with custom colors
 * - Restaurant info card on selection
 * - Navigation to ProductsScreen
 * - Bottom navigation bar
 */
export default function MapScreen(): React.ReactElement {
  // ============================================================================
  // Hooks & Router
  // ============================================================================
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  const navItems = createNavItems('map', router);

  // Type-safe params extraction using helper functions
  const restaurantId = extractStringParam(params.restaurantId);
  const paramLatitude = extractStringParam(params.latitude);
  const paramLongitude = extractStringParam(params.longitude);

  // ============================================================================
  // State Management
  // ============================================================================

  const { location, error: locationError, loading: locationLoading } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState<boolean>(true);
  const [restaurantsError, setRestaurantsError] = useState<string | null>(null);

  // ============================================================================
  // Data Fetching
  // ============================================================================

  /**
   * Loads nearby restaurants based on user's location
   * Handles initial restaurant selection from params
   */
  const loadNearbyRestaurants = useCallback(async (): Promise<void> => {
    if (!location) return;

    try {
      setIsLoadingRestaurants(true);
      setRestaurantsError(null);

      const nearbyRestaurants = await restaurantService.getNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: MAP_CONFIG.DEFAULT_SEARCH_RADIUS_KM,
      });

      console.log('🗺️ Nearby restaurants loaded:', nearbyRestaurants.length);
      setRestaurants(nearbyRestaurants);

      // Handle pre-selected restaurant from HomeScreen
      if (restaurantId) {
        handleInitialRestaurantSelection(nearbyRestaurants, restaurantId);
      }
    } catch (error) {
      console.error('❌ Error loading restaurants:', error);
      setRestaurantsError(MAP_TEXT.ERRORS.LOAD_RESTAURANTS_FAILED);
    } finally {
      setIsLoadingRestaurants(false);
    }
  }, [location, restaurantId]);

  /**
   * Handles initial restaurant selection from route params
   */
  const handleInitialRestaurantSelection = useCallback(
    (restaurantsList: Restaurant[], restaurantId: string): void => {
      const targetRestaurant = restaurantsList.find(r => r.id === restaurantId);
      
      if (targetRestaurant) {
        setSelectedRestaurant(targetRestaurant);
        centerMapOnRestaurant(targetRestaurant);
      }
    },
    []
  );

  /**
   * Centers map on selected restaurant with animation
   */
  const centerMapOnRestaurant = useCallback((restaurant: Restaurant): void => {
    setTimeout(() => {
      mapRef.current?.animateToRegion(
        MapUtils.createRestaurantRegion(restaurant),
        MAP_CONFIG.ANIMATION_DURATION
      );
    }, MAP_CONFIG.INITIAL_ANIMATION_DELAY);
  }, []);

  // Load restaurants when location is available
  useEffect(() => {
    loadNearbyRestaurants();
  }, [loadNearbyRestaurants]);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  /**
   * Handles restaurant marker press
   * Shows info card and centers map
   */
  const handleRestaurantSelect = useCallback((restaurant: Restaurant): void => {
    setSelectedRestaurant(restaurant);
    
    mapRef.current?.animateToRegion(
      MapUtils.createRestaurantRegion(restaurant),
      MAP_CONFIG.ANIMATION_DURATION
    );
  }, []);

  /**
   * Navigates to ProductsScreen for selected restaurant
   */
  const handleViewProducts = useCallback((restaurant: Restaurant): void => {
    console.log('📦 Navigating to products from:', restaurant.name);
    
    router.push({
      pathname: '/(tabs)/ProductsScreen',
      params: { restaurantId: restaurant.id },
    });
  }, [router]);

  /**
   * Navigates back to previous screen
   */
  const handleGoBack = useCallback((): void => {
    router.back();
  }, [router]);

  /**
   * Centers map on user's current location
   */
  const handleCenterOnUser = useCallback((): void => {
    if (!location) return;
    
    mapRef.current?.animateToRegion(
      MapUtils.createUserRegion(location),
      MAP_CONFIG.ANIMATION_DURATION
    );
  }, [location]);

  // ============================================================================
  // Map Configuration
  // ============================================================================

  /**
   * Calculates initial map region
   * Priority: Route params > User location
   */
  const getInitialRegion = useCallback((): Region | undefined => {
    // Try to use coordinates from params
    if (paramLatitude && paramLongitude) {
      const lat = parseCoordinate(paramLatitude);
      const lon = parseCoordinate(paramLongitude);
      
      if (lat !== undefined && lon !== undefined) {
        return MapUtils.createRegionFromCoords(lat, lon);
      }
    }

    // Fallback to user location
    if (location) {
      return MapUtils.createUserRegion(location);
    }

    return undefined;
  }, [location, paramLatitude, paramLongitude]);

  // ============================================================================
  // Loading State
  // ============================================================================

  if (locationLoading || isLoadingRestaurants) {
    return (
      <View style={mapStyles.centeredContainer}>
        <ActivityIndicator size="large" color={mapStyles.loader.color} />
        <Text style={mapStyles.loadingText}>
          {MAP_TEXT.LOADING.MESSAGE}
        </Text>
      </View>
    );
  }

  // ============================================================================
  // Error State
  // ============================================================================

  if (locationError || restaurantsError) {
    return (
      <View style={mapStyles.centeredContainer}>
        <Ionicons 
          name="alert-circle-outline" 
          size={64} 
          color={mapStyles.error.color} 
        />
        <Text style={mapStyles.errorText}>
          {locationError || restaurantsError}
        </Text>
        <TouchableOpacity
          style={mapStyles.retryButton}
          onPress={loadNearbyRestaurants}
        >
          <Text style={mapStyles.retryButtonText}>
            {MAP_TEXT.BUTTONS.RETRY}
          </Text>
        </TouchableOpacity>
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
          showsMyLocationButton={false}
          showsCompass={true}
        >
          {/* User Location Marker */}
          <UserLocationMarker
            latitude={location.latitude}
            longitude={location.longitude}
            title={MAP_TEXT.MARKERS.USER_LOCATION}
          />

          {/* Restaurant Markers */}
          <RestaurantMarkers
            restaurants={restaurants}
            selectedRestaurantId={selectedRestaurant?.id}
            onRestaurantPress={handleRestaurantSelect}
          />
        </MapView>
      )}

      {/* Header with back button and title */}
      <MapHeader
        title={MAP_TEXT.HEADER.TITLE}
        onBackPress={handleGoBack}
        onCenterPress={handleCenterOnUser}
      />

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