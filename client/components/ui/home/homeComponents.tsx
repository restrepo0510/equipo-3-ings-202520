// components/home/HomeComponents.tsx

import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Restaurant } from "@/services/restaurantService";
import { styles, COLORS } from "@/styles/homeScreen.styles";
import { PLACEHOLDER_IMAGES } from "@/constants/home.constants";

// ============================================================================
// 🔹 SEARCH BAR
// ============================================================================

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export const SearchBar = memo<SearchBarProps>(
  ({ value, onChangeText, onClear, placeholder = "Buscar restaurantes..." }) => {
    return (
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.text.secondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.text.placeholder}
          accessibilityLabel="Campo de búsqueda de restaurantes"
          accessibilityHint="Escribe para buscar restaurantes por nombre, dirección o categoría"
        />
        {value.length > 0 && onClear && (
          <TouchableOpacity
            onPress={onClear}
            accessibilityLabel="Limpiar búsqueda"
            accessibilityRole="button"
          >
            <Ionicons name="close-circle" size={20} color={COLORS.text.secondary} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";

// ============================================================================
// 🔹 HEADER LOGO
// ============================================================================

export const HeaderLogo = memo(() => {
  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/img/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Logo de la aplicación"
        accessibilityRole="image"
      />
    </View>
  );
});

HeaderLogo.displayName = "HeaderLogo";

// ============================================================================
// 🔹 GREETING SECTION
// ============================================================================

interface GreetingSectionProps {
  userName: string;
}

export const GreetingSection = memo<GreetingSectionProps>(({ userName }) => {
  return (
    <View style={styles.greetingContainer}>
      <Text style={styles.greetingText}>
        <Text style={styles.greetingBold}>Bienvenido </Text>
        <Text style={styles.greetingName}>{userName}</Text>
      </Text>
    </View>
  );
});

GreetingSection.displayName = "GreetingSection";

// ============================================================================
// 🔹 RESTAURANT GRID CARD
// ============================================================================

interface RestaurantGridCardProps {
  restaurant: Restaurant;
  index: number;
  onPress: (restaurant: Restaurant) => void;
}

export const RestaurantGridCard = memo<RestaurantGridCardProps>(
  ({ restaurant, index, onPress }) => {
    return (
      <TouchableOpacity
        style={[
          styles.gridCard,
          index % 2 === 0 ? styles.gridCardLeft : styles.gridCardRight,
        ]}
        onPress={() => onPress(restaurant)}
        accessibilityRole="button"
        accessibilityLabel={`Restaurante ${restaurant.name}`}
        accessibilityHint="Toca para ver detalles y ubicación"
      >
        <View style={styles.gridCardInner}>
          {/* Circular Logo */}
          <View style={styles.gridLogoContainer}>
            <Image
              source={{
                uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LOGO,
              }}
              style={styles.gridLogo}
              accessibilityIgnoresInvertColors
            />
          </View>

          {/* Main Image */}
          <View style={styles.gridImageContainer}>
            <Image
              source={{
                uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_CARD,
              }}
              style={styles.gridImage}
              accessibilityIgnoresInvertColors
            />
          </View>

          {/* Name */}
          <View style={styles.gridInfo}>
            <Text style={styles.gridTitle} numberOfLines={2}>
              {restaurant.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

RestaurantGridCard.displayName = "RestaurantGridCard";

// ============================================================================
// 🔹 TOP RESTAURANT CARD
// ============================================================================

interface TopRestaurantCardProps {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export const TopRestaurantCard = memo<TopRestaurantCardProps>(
  ({ restaurant, onPress }) => {
    return (
      <View style={styles.topSection}>
        {/* TOP 1 Badge */}
        <View style={styles.topBadge}>
          <Ionicons name="trophy" size={20} color="#FFF" />
          <Text style={styles.topBadgeText}>TOP 1</Text>
        </View>

        <TouchableOpacity
          style={styles.topCard}
          onPress={() => onPress(restaurant)}
          accessibilityRole="button"
          accessibilityLabel={`Restaurante destacado: ${restaurant.name}`}
          accessibilityHint="Toca para ver detalles"
        >
          {/* Decorative Leaves */}
          <Image
            source={require("@/assets/img/leaf.png")}
            style={styles.topLeafLeft}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <Image
            source={require("@/assets/img/leaf.png")}
            style={styles.topLeafRight}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />

          {/* Main Image + Logo */}
          <View style={styles.topImagesRow}>
            <View style={styles.topImageContainer}>
              <Image
                source={{
                  uri:
                    restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_TOP,
                }}
                style={styles.topImage}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />
            </View>

            <View style={styles.topLogoContainer}>
              <Image
                source={{
                  uri:
                    restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LOGO,
                }}
                style={styles.topLogoImage}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />
            </View>
          </View>

          <View style={styles.topInfo}>
            <Text style={styles.topTitle}>{restaurant.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);

TopRestaurantCard.displayName = "TopRestaurantCard";

// ============================================================================
// 🔹 RESTAURANT LIST CARD
// ============================================================================

interface RestaurantListCardProps {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export const RestaurantListCard = memo<RestaurantListCardProps>(
  ({ restaurant, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.listCard}
        onPress={() => onPress(restaurant)}
        accessibilityRole="button"
        accessibilityLabel={`Restaurante ${restaurant.name}`}
        accessibilityHint="Toca para ver detalles"
      >
        <Image
          source={{
            uri: restaurant.imageUrl || PLACEHOLDER_IMAGES.RESTAURANT_LIST,
          }}
          style={styles.listImage}
          accessibilityIgnoresInvertColors
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
        {restaurant.isActive && (
          <View
            style={styles.activeIndicator}
            accessibilityLabel="Restaurante activo"
          />
        )}
      </TouchableOpacity>
    );
  }
);

RestaurantListCard.displayName = "RestaurantListCard";

// ============================================================================
// 🔹 EMPTY STATE
// ============================================================================

interface EmptyStateProps {
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const EmptyState = memo<EmptyStateProps>(
  ({ message, icon = "information-circle" }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 60,
          paddingHorizontal: 20,
        }}
        accessibilityRole="alert"
      >
        <Ionicons name={icon} size={80} color={COLORS.text.secondary} />
        <Text
          style={{
            fontSize: 16,
            color: COLORS.text.secondary,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          {message}
        </Text>
      </View>
    );
  }
);

EmptyState.displayName = "EmptyState";

// ============================================================================
// 🔹 ERROR STATE
// ============================================================================

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = memo<ErrorStateProps>(({ message, onRetry }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
      accessibilityRole="alert"
    >
      <Ionicons name="alert-circle" size={80} color={COLORS.error} />
      <Text
        style={{
          color: COLORS.error,
          fontSize: 16,
          marginTop: 16,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            padding: 12,
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            minWidth: 120,
            alignItems: "center",
          }}
          accessibilityRole="button"
          accessibilityLabel="Reintentar cargar restaurantes"
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
            Reintentar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

ErrorState.displayName = "ErrorState";

// ============================================================================
// 🔹 LOADING STATE
// ============================================================================

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = memo<LoadingStateProps>(
  ({ message = "Cargando..." }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        accessibilityRole="progressbar"
        accessibilityLabel={message}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text
          style={{
            marginTop: 10,
            color: COLORS.text.secondary,
            fontSize: 16,
          }}
        >
          {message}
        </Text>
      </View>
    );
  }
);

LoadingState.displayName = "LoadingState";