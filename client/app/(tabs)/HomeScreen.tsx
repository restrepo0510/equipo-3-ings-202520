// app/(tabs)/HomeScreen.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Contextos y hooks
import { useRestaurants } from "@/context/RestaurantsContext";
import { useLocation } from "../../hooks/useLocation";

// Servicios
import { restaurantService, Restaurant } from "../../services/restaurantService";

// Componentes
import { BottomNavigation } from "../../components/ui/BottomNavigation";

// Estilos y constantes
import { styles, COLORS } from "../../styles/homeScreen.styles";
import {
  DEFAULT_VALUES,
  PLACEHOLDER_IMAGES,
} from "../../constants/homeScreen.constants";

// Navegación
import { createNavItems } from "../../utils/navigationHelpers";

/**
 * HomeScreen Component
 * 
 * Muestra los restaurantes cercanos al usuario, usando su ubicación actual.
 * Incluye búsqueda, restaurante destacado (TOP 1) y lista de restaurantes.
 */
export default function HomeScreen() {
  // ============================================================
  // 🔹 Navegación
  // ============================================================
  const router = useRouter();
  const navItems = createNavItems("home", router);

  // ============================================================
  // 🔹 Estados locales
  // ============================================================
  const { location } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchText, setSearchText] = useState("");
  const [userName] = useState(DEFAULT_VALUES.DEFAULT_USER_NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // 🔹 Contexto global de restaurantes
  // ============================================================
  const { setRestaurants: setGlobalRestaurants } = useRestaurants();

  // ============================================================
  // 🔹 Cargar restaurantes cercanos
  // ============================================================
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

      console.log("🍽️ Restaurants loaded:", data.length);
      setRestaurants(data);
      setGlobalRestaurants(data); // 🔹 Sincroniza globalmente con AddReviewScreen
    } catch (error) {
      console.error("❌ Error loading restaurants:", error);
      setError("No se pudieron cargar los restaurantes cercanos.");
    } finally {
      setIsLoading(false);
    }
  }, [location, setGlobalRestaurants]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // ============================================================
  // 🔹 Filtrado de restaurantes
  // ============================================================
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const topRestaurant = filteredRestaurants.find((r) => r.isActive);
  const otherRestaurants = filteredRestaurants.filter(
    (r) => r.id !== topRestaurant?.id && r.isActive
  );

  // ============================================================
  // 🔹 Navegación al mapa
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

  // ============================================================
  // 🔹 Render de tarjeta en cuadrícula
  // ============================================================
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
        {/* Logo circular */}
        <View style={styles.gridLogoContainer}>
          <Image
            source={{
              uri:
                restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LOGO,
            }}
            style={styles.gridLogo}
          />
        </View>

        {/* Imagen principal */}
        <View style={styles.gridImageContainer}>
          <Image
            source={{
              uri:
                restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_CARD,
            }}
            style={styles.gridImage}
          />
        </View>

        {/* Nombre */}
        <View style={styles.gridInfo}>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {restaurant.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // ============================================================
  // 🔹 Render restaurante TOP 1
  // ============================================================
  const renderTopRestaurant = (restaurant: Restaurant) => (
    <View style={styles.topSection}>
      <View style={styles.topBadge}>
        <Ionicons name="trophy" size={20} color="#FFF" />
        <Text style={styles.topBadgeText}>TOP 1</Text>
      </View>

      <TouchableOpacity
        style={styles.topCard}
        onPress={() => handleRestaurantPress(restaurant)}
      >
        {/* Decoraciones */}
        <Image
          source={require("../../assets/img/leaf.png")}
          style={styles.topLeafLeft}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/img/leaf.png")}
          style={styles.topLeafRight}
          resizeMode="contain"
        />

        {/* Imagen principal + logo */}
        <View style={styles.topImagesRow}>
          <View style={styles.topImageContainer}>
            <Image
              source={{
                uri:
                  restaurant.imageUrl ||
                  PLACEHOLDER_IMAGES.RESTAURANT_TOP,
              }}
              style={styles.topImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.topLogoContainer}>
            <Image
              source={{
                uri:
                  restaurant.imageUrl ||
                  PLACEHOLDER_IMAGES.RESTAURANT_LOGO,
              }}
              style={styles.topLogoImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.topInfo}>
          <Text style={styles.topTitle}>{restaurant.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // ============================================================
  // 🔹 Render lista de restaurantes
  // ============================================================
  const renderListCard = (restaurant: Restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.listCard}
      onPress={() => handleRestaurantPress(restaurant)}
      accessibilityRole="button"
    >
      <Image
        source={{
          uri:
            restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LIST,
        }}
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

  // ============================================================
  // 🔹 Render principal
  // ============================================================
  if (isLoading && restaurants.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.text.secondary }}>
          Cargando restaurantes...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: COLORS.error, marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity
          onPress={loadRestaurants}
          style={{
            padding: 10,
            backgroundColor: COLORS.primary,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: COLORS.white }}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/img/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

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
            <Text style={styles.greetingBold}>Bienvenido</Text>{" "}
            <Text style={styles.greetingName}>{userName}</Text>
          </Text>
        </View>

        {/* Grid de restaurantes */}
        <View style={[styles.gridContainer, { marginTop: 30 }]}>
          {otherRestaurants
            .slice(0, DEFAULT_VALUES.GRID_RESTAURANT_COUNT)
            .map(renderGridCard)}
        </View>

        {/* Restaurante TOP 1 */}
        {topRestaurant && renderTopRestaurant(topRestaurant)}

        {/* Lista de otros restaurantes */}
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
