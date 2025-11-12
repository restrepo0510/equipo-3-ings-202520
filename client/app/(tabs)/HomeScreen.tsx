// app/(tabs)/HomeScreen.tsx

import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";

// Hooks
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "../../hooks/useLocation";
import { useRestaurantsData } from "../../hooks/useRestaurantsData";

// Services
import { Restaurant } from "../../services/restaurantService";

// Components
import { BottomNavigation } from "../../components/ui/bottomNavigation";
import {
  RestaurantGridCard,
  TopRestaurantCard,
  RestaurantListCard,
  EmptyState,
  ErrorState,
  LoadingState,
  SearchBar,
  GreetingSection,
  HeaderLogo,
} from "@/components/ui/home/homeComponents";

// Styles & Constants
import { styles, COLORS } from "@/styles/homeScreen.styles";
import { DEFAULT_VALUES } from "@/constants/home.constants";

// Navigation
import { createHomeNavItems } from "@/utils/navigationHelpers";

/**
 * HomeScreen Component
 * 
 * Main screen displaying nearby restaurants based on user location.
 * 
 * Features:
 * - Real-time location tracking
 * - Search with multiple fields (name, address, category)
 * - TOP 1 featured restaurant
 * - Grid and list layouts
 * - Pull-to-refresh
 * - Error handling with retry
 * - Optimized re-renders with useMemo
 * 
 * @component
 */
export default function HomeScreen() {
  // ============================================================
  // 🔹 Navigation
  // ============================================================
  const router = useRouter();
  const navItems = useMemo(
    () => createHomeNavItems("home", router),
    [router]
  );

  // ============================================================
  // 🔹 Hooks
  // ============================================================
  const { user } = useAuth(); // Obtener usuario autenticado

  const { 
    location, 
    loading: locationLoading, 
    error: locationError 
  } = useLocation();

  const {
    restaurants,
    isLoading,
    isRefreshing,
    error: restaurantsError,
    refresh,
  } = useRestaurantsData({
    location,
    autoLoad: true,
  });

  // ============================================================
  // 🔹 Local State
  // ============================================================
  const [searchText, setSearchText] = useState("");
  
  // Obtener nombre del usuario autenticado o usar valor por defecto
  const userName = useMemo(() => {
    // Intenta obtener el nombre del usuario de diferentes formas
    if (user?.name) return user.name;
    if (user?.email) {
      // Si solo tiene email, mostrar la parte antes del @
      return user.email.split('@')[0];
    }
    return DEFAULT_VALUES.DEFAULT_USER_NAME;
  }, [user]);

  // ============================================================
  // 🔹 Filtered & Derived Data (Memoized for Performance)
  // ============================================================
  const filteredRestaurants = useMemo(() => {
    if (!searchText.trim()) return restaurants;

    const searchLower = searchText.toLowerCase().trim();
    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.address?.toLowerCase().includes(searchLower) ||
        restaurant.category?.toLowerCase().includes(searchLower)
    );
  }, [restaurants, searchText]);

  const { topRestaurant, gridRestaurants, listRestaurants } = useMemo(() => {
    const active = filteredRestaurants.filter((r) => r.isActive);
    const top = active[0]; // First active restaurant is TOP 1
    const others = active.filter((r) => r.id !== top?.id);

    return {
      topRestaurant: top,
      gridRestaurants: others.slice(0, DEFAULT_VALUES.GRID_RESTAURANT_COUNT),
      listRestaurants: others.slice(DEFAULT_VALUES.TOP_RESTAURANT_SLICE_START),
    };
  }, [filteredRestaurants]);

  // ============================================================
  // 🔹 Event Handlers
  // ============================================================
  const handleRestaurantPress = useCallback(
    (restaurant: Restaurant) => {
      console.log("Restaurant selected:", restaurant.name);
      router.push({
        pathname: "/(tabs)/MapScreen",
        params: {
          restaurantId: restaurant.id,
          latitude: restaurant.latitude.toString(),
          longitude: restaurant.longitude.toString(),
        },
      });
    },
    [router]
  );

  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  const handleSearchClear = useCallback(() => {
    setSearchText("");
  }, []);

  // ============================================================
  // 🔹 Computed Values
  // ============================================================
  const hasSearchResults = filteredRestaurants.length > 0;
  const isSearching = searchText.trim().length > 0;
  const hasRestaurants = restaurants.length > 0;
  const showEmptySearch = isSearching && !hasSearchResults;
  const showEmptyState = !hasRestaurants && !isLoading && !restaurantsError;

  // ============================================================
  // 🔹 Error States
  // ============================================================
  
  // Location error
  if (locationError) {
    return (
      <View style={styles.container}>
        <ErrorState
          message="No se pudo obtener tu ubicación. Por favor, verifica los permisos."
          onRetry={handleRetry}
        />
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // Initial loading
  if ((isLoading || locationLoading) && !hasRestaurants) {
    return (
      <View style={styles.container}>
        <LoadingState message="Cargando restaurantes cercanos..." />
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // Restaurants error (with no cached data)
  if (restaurantsError && !hasRestaurants) {
    return (
      <View style={styles.container}>
        <ErrorState message={restaurantsError} onRetry={handleRetry} />
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // ============================================================
  //  Main Render
  // ============================================================
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderLogo />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Search Bar */}
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onClear={handleSearchClear}
          placeholder="Buscar por nombre, dirección o categoría..."
        />

        {/* Greeting */}
        <GreetingSection userName={userName} />

        {/* Empty Search State */}
        {showEmptySearch && (
          <EmptyState
            message={`No se encontraron restaurantes para "${searchText}"`}
            icon="search"
          />
        )}

        {/* Empty State - No restaurants at all */}
        {showEmptyState && (
          <EmptyState
            message="No hay restaurantes cercanos en este momento"
            icon="restaurant"
          />
        )}

        {/* Grid Cards (First 2 restaurants) */}
        {gridRestaurants.length > 0 && (
          <View style={[styles.gridContainer, { marginTop: 30 }]}>
            {gridRestaurants.map((restaurant, index) => (
              <RestaurantGridCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
                onPress={handleRestaurantPress}
              />
            ))}
          </View>
        )}

        {/* TOP 1 Restaurant */}
        {topRestaurant && (
          <TopRestaurantCard
            restaurant={topRestaurant}
            onPress={handleRestaurantPress}
          />
        )}

        {/* List of Other Restaurants */}
        {listRestaurants.length > 0 && (
          <View style={styles.moreSection}>
            {listRestaurants.map((restaurant) => (
              <RestaurantListCard
                key={restaurant.id}
                restaurant={restaurant}
                onPress={handleRestaurantPress}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}