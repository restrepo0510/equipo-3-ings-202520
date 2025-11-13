// app/(tabs)/FavoritesScreen.tsx

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/ui/bottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import { FavoritesApiService } from '@/services/favoriteService';
import { FavoritesUtils } from '@/utils/favorites.utils';
import { 
  FAVORITES_TEXT, 
  FAVORITES_ICONS, 
  FAVORITES_CONSTANTS 
} from '@/constants/favorites.constants';
import { styles } from '@/styles/favoritesScreen.styles';
import type { Favorite } from '@/types/favorites.types';
import type { Product } from '@/types/product.types';

/**
 * FavoritesScreen Component
 * 
 * Displays user's favorite products and allows removing them.
 * Includes loading state, empty state, and optimistic UI updates.
 */
export default function FavoritesScreen(): React.ReactElement {
  // ============================================================================
  // Hooks
  // ============================================================================

  const router = useRouter();
  const { token } = useAuth();
  const navItems = createNavItems('favorites', router);
  const { removeFavorite } = useFavorites();

  const [favoritesList, setFavoritesList] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Load favorites with product details on component mount or token change
   */
  useEffect(() => {
    loadFavorites();
  }, [token]);

  /**
   * Fetch user favorites from API
   */
  const loadFavorites = async (): Promise<void> => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await FavoritesApiService.getUserFavorites(token);
      setFavoritesList(data);
      console.log(`✅ Favorites loaded: ${data.length}`);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Navigates back to previous screen
   */
  const handleGoBack = (): void => {
    router.back();
  };

  /**
   * Navigates to the restaurant screen of the selected product
   */
  const handleProductPress = (product: Product): void => {
    router.push({
      pathname: '/(tabs)/ProductsScreen',
      params: { restaurantId: product.restaurantId },
    });
  };

  /**
   * Removes a product from favorites (Optimistic UI with rollback)
   */
  const handleRemoveFavorite = async (productId: string): Promise<void> => {
    const originalList = [...favoritesList];

    try {
      // 1️⃣ Optimistic update
      setFavoritesList(prev => prev.filter(f => f.product.id !== productId));

      // 2️⃣ Update global context
      await removeFavorite(productId);

      console.log('✅ Favorite removed successfully');
    } catch (error) {
      console.error('❌ Error removing favorite:', error);

      // Rollback in case of failure
      setFavoritesList(originalList);
    }
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /**
   * Renders loading indicator
   */
  const renderLoading = (): React.ReactElement => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={FAVORITES_ICONS.COLOR.SUCCESS} />
      <Text style={styles.loadingText}>{FAVORITES_TEXT.LOADING.MESSAGE}</Text>
    </View>
  );

  /**
   * Renders empty state message when there are no favorites
   */
  const renderEmpty = (): React.ReactElement => (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name={FAVORITES_ICONS.HEART_OUTLINE} 
        size={FAVORITES_ICONS.SIZE.EXTRA_LARGE} 
        color={FAVORITES_ICONS.COLOR.EMPTY} 
      />
      <Text style={styles.emptyTitle}>{FAVORITES_TEXT.EMPTY.TITLE}</Text>
      <Text style={styles.emptySubtitle}>{FAVORITES_TEXT.EMPTY.SUBTITLE}</Text>
    </View>
  );

  /**
   * Renders a single favorite card item
   */
  const renderFavoriteCard = (favorite: Favorite): React.ReactElement => {
    const { product } = favorite;
    const isAvailable = FavoritesUtils.isProductAvailable(product);

    return (
      <TouchableOpacity
        key={favorite.id}
        style={styles.productCard}
        onPress={() => handleProductPress(product)}
        activeOpacity={0.7}
        accessibilityLabel={FAVORITES_TEXT.ACCESSIBILITY.PRODUCT_CARD}
        accessibilityRole="button"
      >
        <View style={styles.cardContent}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: FavoritesUtils.getImageSource(product.imageUrl) }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text 
              style={styles.productName} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {product.name}
            </Text>
            <Text 
              style={styles.productDescription} 
              numberOfLines={2} 
              ellipsizeMode="tail"
            >
              {FavoritesUtils.getProductDescription(
                product, 
                FAVORITES_TEXT.PRODUCT.NO_DESCRIPTION
              )}
            </Text>
          </View>

          {/* Price or Unavailable Tag */}
          <View style={styles.priceContainer}>
            {isAvailable ? (
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>
                  {FavoritesUtils.formatPrice(product.price)}
                </Text>
              </View>
            ) : (
              <View style={styles.unavailableTag}>
                <Text style={styles.unavailableText}>
                  {FAVORITES_TEXT.PRODUCT.NOT_AVAILABLE}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Remove from Favorites Button */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => handleRemoveFavorite(product.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel={FAVORITES_TEXT.ACCESSIBILITY.REMOVE_FAVORITE}
          accessibilityRole="button"
        >
          <Ionicons 
            name={FAVORITES_ICONS.HEART_FILLED} 
            size={FAVORITES_CONSTANTS.UI.HEART_ICON_SIZE} 
            color={FAVORITES_ICONS.COLOR.HEART} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
          accessibilityLabel={FAVORITES_TEXT.ACCESSIBILITY.BACK_BUTTON}
          accessibilityRole="button"
        >
          <Ionicons 
            name={FAVORITES_ICONS.BACK} 
            size={FAVORITES_CONSTANTS.UI.BACK_ICON_SIZE} 
            color={FAVORITES_ICONS.COLOR.PRIMARY} 
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.yummi}>{FAVORITES_TEXT.HEADER.TITLE}</Text>
          <Text style={styles.headerTitle}>{FAVORITES_TEXT.HEADER.SUBTITLE}</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading 
          ? renderLoading() 
          : favoritesList.length > 0 
            ? favoritesList.map(renderFavoriteCard) 
            : renderEmpty()}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}
