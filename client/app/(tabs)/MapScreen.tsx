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
 * =============================================================
 * MapScreen Component
 * =============================================================
 * Interactive map displaying user location and nearby restaurants.
 *
 * @description
 * This screen manages:
 * - User current location tracking
 * - Restaurant markers display
 * - Restaurant info card selection
 * - Navigation to the Products screen
 * - Map centering animations and error/loading states
 *
 * @features
 * - Real-time geolocation updates
 * - Marker-based restaurant selection
 * - Contextual restaurant details
 * - Navigation to related products
 * - Responsive UI with bottom navigation
 */
export default function MapScreen(): React.ReactElement {
  // =============================================================
  // 🔹 Hooks & Router
  // =============================================================

  const router = useRouter();
  const params = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);

  // Create bottom navigation items for "Map" context
  const navItems = createNavItems('map', router);

  // Extract parameters safely from route using helper functions
  const restaurantId = extractStringParam(params.restaurantId);
  const paramLatitude = extractStringParam(params.latitude);
  const paramLongitude = extractStringParam(params.longitude);

  // =============================================================
  // 🔹 State Management
  // =============================================================

  const { location, error: locationError, loading: locationLoading } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState<boolean>(true);
  const [restaurantsError, setRestaurantsError] = useState<string | null>(null);

  // =============================================================
  // 🔹 Data Fetching Logic
  // =============================================================

  /**
   * Load nearby restaurants based on user's geolocation.
   * Handles automatic selection if a restaurantId param exists.
   */
  const loadNearbyRestaurants = useCallback(async (): Promise<void> => {
    if (!location) return;

    try {
      setIsLoadingRestaurants(true);
      setRestaurantsError(null);

      // Fetch nearby restaurants using location coordinates
      const nearbyRestaurants = await restaurantService.getNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: MAP_CONFIG.DEFAULT_SEARCH_RADIUS_KM,
      });

      // Debug log (disabled in production)
      console.log('🗺️ Nearby restaurants loaded:', nearbyRestaurants.length);
      setRestaurants(nearbyRestaurants);

      // Handle case when user navigates from Home with a restaurant selected
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
   * Handles initial selection of restaurant when navigating from Home.
   * @param restaurantsList - List of fetched nearby restaurants
   * @param restaurantId - The ID received from route params
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
   * Smoothly center map on the given restaurant coordinates.
   */
  const centerMapOnRestaurant = useCallback((restaurant: Restaurant): void => {
    setTimeout(() => {
      mapRef.current?.animateToRegion(
        MapUtils.createRestaurantRegion(restaurant),
        MAP_CONFIG.ANIMATION_DURATION
      );
    }, MAP_CONFIG.INITIAL_ANIMATION_DELAY);
  }, []);

  // Load restaurants once user location becomes available
  useEffect(() => {
    loadNearbyRestaurants();
  }, [loadNearbyRestaurants]);

  // =============================================================
  // 🔹 Event Handlers
  // =============================================================

  /**
   * Handle marker press: show restaurant card and re-center map.
   */
  const handleRestaurantSelect = useCallback((restaurant: Restaurant): void => {
    setSelectedRestaurant(restaurant);

    mapRef.current?.animateToRegion(
      MapUtils.createRestaurantRegion(restaurant),
      MAP_CONFIG.ANIMATION_DURATION
    );
  }, []);

  /**
   * Navigate to the Products screen for selected restaurant.
   */
  const handleViewProducts = useCallback((restaurant: Restaurant): void => {
    console.log('📦 Navigating to products from:', restaurant.name);

    router.push({
      pathname: '/(tabs)/ProductsScreen',
      params: { restaurantId: restaurant.id },
    });
  }, [router]);

  /**
   * Go back to the previous screen.
   */
  const handleGoBack = useCallback((): void => {
    router.back();
  }, [router]);

  /**
   * Center the map on the user's current location.
   */
  const handleCenterOnUser = useCallback((): void => {
    if (!location) return;

    mapRef.current?.animateToRegion(
      MapUtils.createUserRegion(location),
      MAP_CONFIG.ANIMATION_DURATION
    );
  }, [location]);

  // =============================================================
  // 🔹 Map Configuration Helpers
  // =============================================================

  /**
   * Determine the initial map region to display.
   * Priority order:
   *  1. Coordinates from navigation params
   *  2. User's geolocation
   */
  const getInitialRegion = useCallback((): Region | undefined => {
    if (paramLatitude && paramLongitude) {
      const lat = parseCoordinate(paramLatitude);
      const lon = parseCoordinate(paramLongitude);

      if (lat !== undefined && lon !== undefined) {
        return MapUtils.createRegionFromCoords(lat, lon);
      }
    }

    if (location) {
      return MapUtils.createUserRegion(location);
    }

    return undefined;
  }, [location, paramLatitude, paramLongitude]);

  // =============================================================
  // 🔹 Loading State
  // =============================================================

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

  // =============================================================
  // 🔹 Error State
  // =============================================================

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

        {/* Retry button to reload restaurants */}
        <TouchableOpacity
          style={mapStyles.retryButton}
          onPress={loadNearbyRestaurants}
        >
          <Text style={mapStyles.retryButtonText}>
            {MAP_TEXT.BUTTONS.RETRY}
          </Text>
        </TouchableOpacity>

        {/* Persistent bottom navigation */}
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // =============================================================
  // 🔹 Main Render
  // =============================================================

  return (
    <View style={mapStyles.container}>
      {/* Map container */}
      {location && (
        <MapView
          ref={mapRef}
          style={mapStyles.map}
          initialRegion={getInitialRegion()}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
        >
          {/* User marker */}
          <UserLocationMarker
            latitude={location.latitude}
            longitude={location.longitude}
            title={MAP_TEXT.MARKERS.USER_LOCATION}
          />

          {/* Restaurant markers */}
          <RestaurantMarkers
            restaurants={restaurants}
            selectedRestaurantId={selectedRestaurant?.id}
            onRestaurantPress={handleRestaurantSelect}
          />
        </MapView>
      )}

      {/* Header with navigation and centering controls */}
      <MapHeader
        title={MAP_TEXT.HEADER.TITLE}
        onBackPress={handleGoBack}
        onCenterPress={handleCenterOnUser}
      />

      {/* Restaurant detail card */}
      {selectedRestaurant && (
        <RestaurantMapCard
          restaurant={selectedRestaurant}
          onViewProducts={() => handleViewProducts(selectedRestaurant)}
        />
      )}

      {/* Bottom persistent navigation bar */}
      <BottomNavigation items={navItems} />
    </View>
  );
}
