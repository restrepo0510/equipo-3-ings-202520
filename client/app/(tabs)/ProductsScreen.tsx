/**
 * Products Screen
 * Displays products list for a specific restaurant
 * Allows navigation to order summary and favorite management
 */
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useProductsList } from '@/hooks/useProductsList';
import { ProductsUtils } from '@/utils/products.utils';
import { ProductsAlertService } from '@/services/productsAlertService';
import { PRODUCTS_TEXT, PRODUCTS_ICONS } from '@/constants/products.constants';
import { styles } from '@/styles/productsScreen.styles';
import type { Product } from '@/types/product.types';

/**
 * ProductsScreen Component
 * Main screen for displaying restaurant products
 */
export default function ProductsScreen() {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  const router = useRouter();
  const { restaurantId } = useLocalSearchParams();
  const { token } = useAuth();
  const navItems = createNavItems('map', router);

  // Favorites management
  const { isFavorite, addFavorite, removeFavorite, loadFavorites } = useFavorites();

  // Products data
  const { products, restaurant, isLoading, error, refreshProducts } = useProductsList(
    restaurantId,
    token
  );

  // ============================================================================
  // Effects
  // ============================================================================

  React.useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles favorite toggle
   */
  const handleToggleFavorite = async (
    productId: string,
    event: any
  ): Promise<void> => {
    event.stopPropagation();

    try {
      if (isFavorite(productId)) {
        await removeFavorite(productId);
      } else {
        await addFavorite(productId);
      }
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
    }
  };

  /**
   * Handles product press - navigates to order summary
   */
  const handleProductPress = (product: Product): void => {
    if (!restaurant) {
      ProductsAlertService.showRestaurantLoadError();
      return;
    }

    if (!ProductsUtils.isProductAvailable(product)) {
      ProductsAlertService.showProductUnavailable();
      return;
    }

    console.log('🛒 Product selected:', product.name);

    router.push({
      pathname: '/(tabs)/OrderSummaryScreen',
      params: {
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl || '',
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantAddress: restaurant.address,
        quantity: '1',
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
      },
    });
  };

  /**
   * Handles back navigation
   */
  const handleGoBack = (): void => {
    router.back();
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /**
   * Renders product card
   */
  const renderProductCard = (product: Product): React.ReactElement => {
    const isAvailable = ProductsUtils.isProductAvailable(product);
    const imageUrl = ProductsUtils.getProductImage(product.imageUrl);
    const description = ProductsUtils.getProductDescription(
      product.description,
      PRODUCTS_TEXT.PRODUCT.DEFAULT_DESCRIPTION
    );

    return (
      <TouchableOpacity
        key={product.id}
        style={[styles.productCard, !isAvailable && styles.productCardDisabled]}
        onPress={() => handleProductPress(product)}
        activeOpacity={0.7}
        disabled={!isAvailable}
        accessibilityLabel={PRODUCTS_TEXT.ACCESSIBILITY.PRODUCT_CARD}
        accessibilityRole="button"
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={[
              styles.productImage,
              !isAvailable && styles.productImageDisabled,
            ]}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {description}
          </Text>
        </View>

        {/* Price Badge */}
        {isAvailable ? (
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              {ProductsUtils.formatPrice(product.price)}
            </Text>
          </View>
        ) : (
          <View style={styles.notAvailableBadge}>
            <Text style={styles.notAvailableText}>
              {PRODUCTS_TEXT.PRODUCT.NOT_AVAILABLE}
            </Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => handleToggleFavorite(product.id, e)}
          accessibilityLabel={PRODUCTS_TEXT.ACCESSIBILITY.FAVORITE_BUTTON}
          accessibilityRole="button"
        >
          <Ionicons
            name={
              isFavorite(product.id)
                ? PRODUCTS_ICONS.HEART_FILLED
                : PRODUCTS_ICONS.HEART_FILLED
            }
            size={PRODUCTS_ICONS.SIZE.MEDIUM}
            color={
              isFavorite(product.id)
                ? PRODUCTS_ICONS.COLOR.FAVORITE
                : PRODUCTS_ICONS.COLOR.PRIMARY
            }
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  /**
   * Renders loading state
   */
  const renderLoadingState = (): React.ReactElement => (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={PRODUCTS_ICONS.COLOR.SUCCESS} 
        />
        <Text style={styles.loadingText}>
          {PRODUCTS_TEXT.LOADING.PRODUCTS}
        </Text>
      </View>
      <BottomNavigation items={navItems} />
    </View>
  );

  /**
   * Renders error state
   */
  const renderErrorState = (): React.ReactElement => (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        <Ionicons
          name={PRODUCTS_ICONS.ERROR}
          size={PRODUCTS_ICONS.SIZE.LARGE}
          color={PRODUCTS_ICONS.COLOR.ERROR}
        />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={refreshProducts}
          accessibilityLabel={PRODUCTS_TEXT.ACCESSIBILITY.RETRY_BUTTON}
          accessibilityRole="button"
        >
          <Text style={styles.retryButtonText}>
            {PRODUCTS_TEXT.BUTTONS.RETRY}
          </Text>
        </TouchableOpacity>
      </View>
      <BottomNavigation items={navItems} />
    </View>
  );

  /**
   * Renders empty state
   */
  const renderEmptyState = (): React.ReactElement => (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleGoBack}
            accessibilityLabel={PRODUCTS_TEXT.ACCESSIBILITY.BACK_BUTTON}
            accessibilityRole="button"
          >
            <Ionicons 
              name={PRODUCTS_ICONS.BACK} 
              size={PRODUCTS_ICONS.SIZE.MEDIUM} 
              color={PRODUCTS_ICONS.COLOR.PRIMARY} 
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {PRODUCTS_TEXT.HEADER.TITLE}
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {restaurant && (
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        )}

        <View style={styles.emptyContainer}>
          <Ionicons
            name={PRODUCTS_ICONS.EMPTY}
            size={PRODUCTS_ICONS.SIZE.EXTRA_LARGE}
            color={PRODUCTS_ICONS.COLOR.DISABLED}
          />
          <Text style={styles.emptyText}>
            {PRODUCTS_TEXT.EMPTY.TITLE}
          </Text>
          <Text style={styles.emptySubtext}>
            {PRODUCTS_TEXT.EMPTY.SUBTITLE}
          </Text>
        </View>
      </ScrollView>
      <BottomNavigation items={navItems} />
    </View>
  );

  // ============================================================================
  // Render
  // ============================================================================

  if (isLoading) {
    return renderLoadingState();
  }

  if (error) {
    return renderErrorState();
  }

  if (products.length === 0) {
    return renderEmptyState();
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleGoBack}
            accessibilityLabel={PRODUCTS_TEXT.ACCESSIBILITY.BACK_BUTTON}
            accessibilityRole="button"
          >
            <Ionicons 
              name={PRODUCTS_ICONS.BACK} 
              size={PRODUCTS_ICONS.SIZE.MEDIUM} 
              color={PRODUCTS_ICONS.COLOR.PRIMARY} 
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {PRODUCTS_TEXT.HEADER.TITLE}
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {/* Restaurant Name */}
        {restaurant && (
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
          </View>
        )}

        {/* Section Title */}
        <Text style={styles.sectionTitle}>
          {PRODUCTS_TEXT.SECTIONS.PRODUCTS_LIST}
        </Text>

        {/* Products List */}
        <View style={styles.productsList}>
          {products.map(renderProductCard)}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}