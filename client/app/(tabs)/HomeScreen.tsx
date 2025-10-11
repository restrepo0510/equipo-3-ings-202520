// screens/HomeScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocation } from '../../hooks/useLocation';
import { restaurantService, Restaurant } from '../../services/restaurantService';
import { BottomNavigation, NavItem } from '../../components/ui/BottomNavigation';
import { styles, COLORS } from '../../styles/homeScreen.styles';
import { DEFAULT_VALUES, PLACEHOLDER_IMAGES } from '../../constants/homeScreen.constants';

export default function HomeScreen() {
  const { location } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchText, setSearchText] = useState('');
  const [userName] = useState(DEFAULT_VALUES.DEFAULT_USER_NAME);
 const PLACEHOLDER_IMAGES = {
  RESTAURANT_CARD: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
  RESTAURANT_TOP: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
  RESTAURANT_LIST: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
};

  // ============================================================================
  // Cargar restaurantes cercanos
  // ============================================================================
  const loadRestaurants = useCallback(async () => {
    if (!location) return;
    try {
      const data = await restaurantService.getNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: DEFAULT_VALUES.SEARCH_RADIUS_KM,
      });
      setRestaurants(data);
    } catch (error) {
      console.error('Error loading restaurants:', error);
    }
  }, [location]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // ============================================================================
  // Filtrado y organización de datos
  // ============================================================================
  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const topRestaurant = filteredRestaurants.find(r => r.isActive);
  const otherRestaurants = filteredRestaurants.filter(
    r => r.id !== topRestaurant?.id && r.isActive
  );

  // ============================================================================
  // Handlers
  // ============================================================================
  const handleRestaurantPress = useCallback((restaurant: Restaurant) => {
    console.log('Restaurant selected:', restaurant.name);
  }, []);

  const navItems: NavItem[] = [
    { id: 'home', icon: 'location', onPress: () => console.log('Home pressed'), isActive: true },
    { id: 'favorites', icon: 'heart-outline', onPress: () => console.log('Favorites pressed') },
    { id: 'chat', icon: 'chatbubbles-outline', onPress: () => console.log('Chat pressed') },
    { id: 'profile', icon: 'person-outline', onPress: () => console.log('Profile pressed') },
  ];

  // ============================================================================
  // Render Cards
  // ============================================================================
  const renderGridCard = (restaurant: Restaurant, index: number) => (
    <TouchableOpacity
      key={restaurant.id}
      style={[
        styles.gridCard,
        index % 2 === 0 ? styles.gridCardLeft : styles.gridCardRight,
      ]}
      onPress={() => handleRestaurantPress(restaurant)}
    >
      <View style={styles.gridCardInner}>
        <View style={styles.gridLogoContainer}>
          <Image
            source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_CARD }}
            style={styles.gridLogo}
          />
        </View>
        <View style={styles.gridImageContainer}>
          <Image
            source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_CARD }}
            style={styles.gridImage}
          />
        </View>
        <View style={styles.gridInfo}>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {restaurant.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTopRestaurant = (restaurant: Restaurant) => (
    <View style={styles.topSection}>
      <View style={styles.topBadge}>
        <Ionicons name="trophy" size={20} color="#FFF" />
        <Text style={styles.topBadgeText}>TOP 1</Text>
      </View>
      <TouchableOpacity style={styles.topCard} onPress={() => handleRestaurantPress(restaurant)}>
        <Image
          source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_TOP }}
          style={styles.topImage}
        />
        <View style={styles.topInfo}>
          <Text style={styles.topTitle}>{restaurant.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderListCard = (restaurant: Restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.listCard}
      onPress={() => handleRestaurantPress(restaurant)}
    >
      <Image
        source={{ uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LIST }}
        style={styles.listImage}
      />
      <View style={styles.listInfo}>
        <Text style={styles.listTitle}>{restaurant.name}</Text>
        {restaurant.distance && (
          <Text style={styles.listDistance}>📍 {restaurant.distance.toFixed(1)} km</Text>
        )}
      </View>
      {restaurant.isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  // ============================================================================
  // Render principal
  // ============================================================================
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.underline} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Barra de búsqueda */}
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
          />
        </View>

        {/* Bienvenida */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            <Text style={styles.greetingBold}>Bienvenido</Text>{' '}
            <Text style={styles.greetingName}>{userName}</Text>
          </Text>
        </View>

        {/* Rejilla */}
        <View style={[styles.gridContainer, { marginTop: 30 }]}>
          {otherRestaurants
            .slice(0, DEFAULT_VALUES.GRID_RESTAURANT_COUNT)
            .map(renderGridCard)}
        </View>

        {/* TOP 1 */}
        {topRestaurant && renderTopRestaurant(topRestaurant)}

        {/* Lista */}
        <View style={styles.moreSection}>
          {otherRestaurants
            .slice(DEFAULT_VALUES.TOP_RESTAURANT_SLICE_START)
            .map(renderListCard)}
        </View>
      </ScrollView>

      <BottomNavigation items={navItems} />
    </View>
  );
}
