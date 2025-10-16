// app/(tabs)/ProductsScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';
import { productService, Product } from '@/services/productService';
import { useAuth } from '@/context/AuthContext';
import { styles} from '../../styles/ProductsScreen.styles';

/**
 * ProductsScreen Component
 * 
 * Displays business products with availability status
 * Shows product name, description, price, and favorite toggle
 */
export default function ProductsScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const navItems = createNavItems('map', router); // Products screen uses 'map' as active

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // TODO: Get restaurant ID from user context or route params
  // For now, we'll load all available products
  const restaurantId = 'YOUR_RESTAURANT_ID'; // Replace with actual restaurant ID

  /**
   * Load products from backend
   */
  const loadProducts = useCallback(async () => {
    if (!token) {
      setError('No authentication token');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Load available products (or by restaurant if you have restaurantId)
      const data = await productService.getAvailable(token);
      
      console.log('📦 Products loaded:', data.length);
      setProducts(data);
    } catch (error: any) {
      console.error('❌ Error loading products:', error);
      setError(error.message || 'Could not load products');
      Alert.alert('Error', 'No se pudieron cargar los productos');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /**
   * Toggles product favorite status
   */
  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  /**
   * Formats price in Colombian pesos
   */
  const formatPrice = (price: number) => {
    return `$ ${price.toLocaleString('es-CO')}`;
  };

  /**
   * Navigate to product detail
   */
  const handleProductPress = (product: Product) => {
    console.log('Product pressed:', product.name);
    // TODO: Navigate to product detail screen
    // router.push(`/(tabs)/ProductDetail?id=${product.id}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27AE60" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#E74C3C" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadProducts}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>YUMMI</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Empty state */}
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={80} color="#BDC3C7" />
            <Text style={styles.emptyText}>No hay productos disponibles</Text>
            <Text style={styles.emptySubtext}>
              Los productos aparecerán aquí cuando estén disponibles
            </Text>
          </View>
        </ScrollView>
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  // Products list
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>YUMMI</Text>
          </View>
          <TouchableOpacity onPress={loadProducts}>
            <Ionicons name="refresh" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Productos Disponibles</Text>
        <Text style={styles.sectionSubtitle}>
          {products.length} {products.length === 1 ? 'producto' : 'productos'}
        </Text>

        {/* Products List */}
        <View style={styles.productsList}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
              activeOpacity={0.7}
            >
              {/* Product Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ 
                    uri: product.imageUrl || 'https://via.placeholder.com/150' 
                  }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                
                {/* Discount badge */}
                {product.discount && product.discount > 0 && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{product.discount}%</Text>
                  </View>
                )}
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.description || 'Sin descripción'}
                </Text>
                
                {/* Category */}
                {product.category && (
                  <Text style={styles.productCategory}>
                    {product.category}
                  </Text>
                )}

                {/* Stock info */}
                <Text style={styles.stockText}>
                  Stock: {product.stock} unidades
                </Text>
              </View>

              {/* Price Badge */}
              {product.isAvailable ? (
                <View style={styles.priceBadge}>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Text style={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </Text>
                  )}
                  <Text style={styles.priceText}>
                    {formatPrice(product.price)}
                  </Text>
                </View>
              ) : (
                <View style={styles.notAvailableBadge}>
                  <Text style={styles.notAvailableText}>No Disp</Text>
                </View>
              )}

              {/* Favorite Button */}
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(product.id)}
              >
                <Ionicons
                  name={favorites.has(product.id) ? 'heart' : 'heart-outline'}
                  size={28}
                  color={favorites.has(product.id) ? '#E74C3C' : '#000'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}

