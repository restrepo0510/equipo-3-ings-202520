// screens/HomeScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Hooks and services
import { useLocation } from '../../hooks/useLocation';
import { restaurantService, Restaurant } from '../../services/restaurantService';

// Components
import { BottomNavigation } from '../../components/ui/BottomNavigation';

// Styles and constants
import { styles, COLORS } from '../../styles/homeScreen.styles';
import { DEFAULT_VALUES, PLACEHOLDER_IMAGES } from '../../constants/homeScreen.constants';

// Navigation helper
import { createNavItems } from '../../utils/navigationHelpers';

/**
 * HomeScreen Component
 * 
 * Main screen that displays nearby restaurants in different layouts:
 * - Search bar for filtering restaurants
 * - Grid view for featured restaurants
 * - TOP 1 highlighted restaurant
 * - List view for additional restaurants
 * - Bottom navigation bar
 * 
 * Uses geolocation to fetch restaurants within a specified radius.
 */
export default function HomeScreen() {
  // ============================================================================
  // Navigation
  // ============================================================================
  
  const router = useRouter();
  const navItems = createNavItems('home', router);

  // ============================================================================
  // State Management
  // ============================================================================
  
  const { location } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchText, setSearchText] = useState('');
  const [userName] = useState(DEFAULT_VALUES.DEFAULT_USER_NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Data Fetching
  // ============================================================================

  /**
   * Loads restaurants from the service based on user's location
   * Fetches restaurants within the default radius
   */
  const loadRestaurants = useCallback(async () => {
    if (!location) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await restaurantService.getNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: DEFAULT_VALUES.SEARCH_RADIUS_KM,
      });
      
      console.log('📍 Restaurants loaded:', data.length);
      setRestaurants(data);
    } catch (error) {
      console.error('❌ Error loading restaurants:', error);
      setError('Could not load restaurants');
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // ============================================================================
  // Data Processing
  // ============================================================================

  /**
   * Filters restaurants based on search text
   * Case-insensitive search on restaurant names
   */
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  /**
   * Finds the top restaurant (first active one)
   */
  const topRestaurant = filteredRestaurants.find(r => r.isActive);

  /**
   * Gets other restaurants excluding the top one
   * Only includes active restaurants
   */
  const otherRestaurants = filteredRestaurants.filter(
    r => r.id !== topRestaurant?.id && r.isActive
  );

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleRestaurantPress = useCallback((restaurant: Restaurant) => {
    console.log('Restaurant selected:', restaurant.name);
    // navigation.navigate('RestaurantDetail', { id: restaurant.id });
  }, []);

  // ============================================================================
  // Render Functions
  // ============================================================================

  /**
   * Renders a grid restaurant card
   */
  const renderGridCard = (restaurant: Restaurant, index: number) => (
    <TouchableOpacity
      key={restaurant.id}
      style={[
        styles.gridCard,
        index % 2 === 0 ? styles.gridCardLeft : styles.gridCardRight,
      ]}
      onPress={() => handleRestaurantPress(restaurant)}
      accessibilityRole="button"
      accessibilityLabel={`Restaurant ${restaurant.name}`}
    >
      <View style={styles.gridCardInner}>
        {/* Circular Logo at Top */}
        <View style={styles.gridLogoContainer}>
          <Image
            source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LOGO }}
            style={styles.gridLogo}
          />
        </View>
        
        {/* Restaurant Image with Margins */}
        <View style={styles.gridImageContainer}>
          <Image
            source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_CARD }}
            style={styles.gridImage}
          />
        </View>
        
        {/* Restaurant Name */}
        <View style={styles.gridInfo}>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {restaurant.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  /**
   * Renders the TOP 1 restaurant section with images side by side
   */
  const renderTopRestaurant = (restaurant: Restaurant) => (
    <View style={styles.topSection}>
      {/* TOP 1 Badge */}
      <View style={styles.topBadge}>
        <Ionicons name="trophy" size={20} color="#FFF" />
        <Text style={styles.topBadgeText}>TOP 1</Text>
      </View>

      <TouchableOpacity
        style={styles.topCard}
        onPress={() => handleRestaurantPress(restaurant)}
        accessibilityRole="button"
        accessibilityLabel={`Top restaurant ${restaurant.name}`}
      >
        {/* Decorative Leaf - Left */}
        <Image
          source={require('../../assets/img/leaf.png')}
          style={styles.topLeafLeft}
          resizeMode="contain"
        />
        
        {/* Decorative Leaf - Right */}
        <Image
          source={require('../../assets/img/leaf.png')}
          style={styles.topLeafRight}
          resizeMode="contain"
        />

        {/* Images Row - Main image and Logo side by side */}
        <View style={styles.topImagesRow}>
          {/* Main Restaurant Image (Left) */}
          <View style={styles.topImageContainer}>
            <Image
              source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_TOP }}
              style={styles.topImage}
              resizeMode="cover"
            />
          </View>
          
          {/* Restaurant Logo (Right, Square) */}
          <View style={styles.topLogoContainer}>
            <Image
              source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LOGO }}
              style={styles.topLogoImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Restaurant Name (Right aligned) */}
        <View style={styles.topInfo}>
          <Text style={styles.topTitle}>{restaurant.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  /**
   * Renders a list restaurant card
   */
  const renderListCard = (restaurant: Restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.listCard}
      onPress={() => handleRestaurantPress(restaurant)}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LIST }}
        style={styles.listImage}
      />
      <View style={styles.listInfo}>
        <Text style={styles.listTitle}>{restaurant.name}</Text>
        <Text style={styles.listAddress} numberOfLines={1}>
          {restaurant.address}
        </Text>
        {restaurant.distance !== undefined && (
          <Text style={styles.listDistance}>
            📍 {restaurant.distance.toFixed(1)} km
          </Text>
        )}
      </View>
      {restaurant.isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  // ============================================================================
  // Main Render
  // ============================================================================

  // Loading state
  if (isLoading && restaurants.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.text.secondary }}>
          Loading restaurants...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: COLORS.error, marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity
          onPress={loadRestaurants}
          style={{ padding: 10, backgroundColor: COLORS.primary, borderRadius: 8 }}
        >
          <Text style={{ color: COLORS.white }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo2.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="App logo"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.text.secondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={COLORS.text.placeholder}
            accessibilityLabel="Search restaurants"
          />
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            <Text style={styles.greetingBold}>Bienvenido</Text>{' '}
            <Text style={styles.greetingName}>{userName}</Text>
          </Text>
        </View>

        {/* Grid of Featured Restaurants */}
        <View style={[styles.gridContainer, { marginTop: 30 }]}>
          {otherRestaurants
            .slice(0, DEFAULT_VALUES.GRID_RESTAURANT_COUNT)
            .map(renderGridCard)}
        </View>

        {/* TOP 1 Restaurant */}
        {topRestaurant && renderTopRestaurant(topRestaurant)}

        {/* Additional Restaurants List */}
        <View style={styles.moreSection}>
          {otherRestaurants
            .slice(DEFAULT_VALUES.TOP_RESTAURANT_SLICE_START)
            .map(renderListCard)}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}