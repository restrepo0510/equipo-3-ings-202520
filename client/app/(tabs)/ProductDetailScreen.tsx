// app/(tabs)/ProductDetailScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';
import { productService, Product } from '@/services/productService';
import { restaurantService, Restaurant } from '@/services/restaurantService';
import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/ProductDetailScreen.styles';

/**
 * ProductDetailScreen
 * 
 * Shows detailed product information and allows users to reserve it
 */
export default function ProductDetailScreen() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const { token } = useAuth();
  const navItems = createNavItems('home', router);

  const [product, setProduct] = useState<Product | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);

  /**
   * Load product and restaurant data
   */
  useEffect(() => {
    loadProductData();
  }, [productId]);

  const loadProductData = async () => {
    if (!productId || !token) return;

    try {
      setIsLoading(true);

      // Load product
      const productData = await productService.getById(productId as string, token);
      setProduct(productData);

      // Load restaurant
      const restaurantData = await restaurantService.getById(productData.restaurantId);
      setRestaurant(restaurantData);
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'No se pudo cargar el producto');
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Increase quantity
   */
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  /**
   * Decrease quantity
   */
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  /**
   * Calculate totals
   */
  const calculateTotals = () => {
    if (!product) return { subtotal: 0, discount: 0, total: 0 };

    const subtotal = product.price * quantity;
    const discountAmount = product.originalPrice 
      ? (product.originalPrice - product.price) * quantity
      : 0;
    const total = subtotal;

    return { subtotal, discount: discountAmount, total };
  };

  /**
   * Handle reservation
   */
  const handleReserve = async () => {
    if (!product || !restaurant || !token) return;

    if (quantity > product.stock) {
      Alert.alert('Error', 'No hay suficiente stock disponible');
      return;
    }

    try {
      setIsReserving(true);

      // Navigate to order summary with reservation data
      router.push({
        pathname: './(tabs)/OrderSummaryScreen',
        params: {
          productId: product.id,
          productName: product.name,
          productImage: product.imageUrl || '',
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantAddress: restaurant.address,
          quantity: quantity.toString(),
          price: product.price.toString(),
          originalPrice: product.originalPrice?.toString() || '',
        },
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      Alert.alert('Error', 'No se pudo crear la reserva');
    } finally {
      setIsReserving(false);
    }
  };

  const { subtotal, discount, total } = calculateTotals();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27AE60" />
          <Text style={styles.loadingText}>Cargando producto...</Text>
        </View>
      </View>
    );
  }

  if (!product || !restaurant) {
    return null;
  }

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
          <Text style={styles.headerTitle}>Detalle del Producto</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrl || 'https://via.placeholder.com/400' }}
            style={styles.productImage}
            resizeMode="cover"
          />
          
          {/* Discount Badge */}
          {product.discount && product.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          {/* Restaurant */}
          <View style={styles.restaurantTag}>
            <Ionicons name="restaurant" size={16} color="#27AE60" />
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
          </View>

          {/* Product Name */}
          <Text style={styles.productName}>{product.name}</Text>

          {/* Category */}
          {product.category && (
            <Text style={styles.category}>{product.category}</Text>
          )}

          {/* Description */}
          {product.description && (
            <Text style={styles.description}>{product.description}</Text>
          )}

          {/* Stock */}
          <View style={styles.stockContainer}>
            <Ionicons 
              name={product.stock > 10 ? "checkmark-circle" : "alert-circle"} 
              size={20} 
              color={product.stock > 10 ? "#27AE60" : "#E74C3C"} 
            />
            <Text style={[
              styles.stockText,
              product.stock <= 10 && styles.stockTextLow
            ]}>
              {product.stock} unidades disponibles
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Cantidad</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
                onPress={decreaseQuantity}
                disabled={quantity === 1}
              >
                <Ionicons name="remove" size={24} color={quantity === 1 ? "#BDC3C7" : "#000"} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  quantity >= product.stock && styles.quantityButtonDisabled
                ]}
                onPress={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <Ionicons 
                  name="add" 
                  size={24} 
                  color={quantity >= product.stock ? "#BDC3C7" : "#000"} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Price Summary */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Precio unitario:</Text>
              <View style={styles.priceValues}>
                {product.originalPrice && product.originalPrice > product.price && (
                  <Text style={styles.originalPrice}>
                    ${product.originalPrice.toLocaleString('es-CO')}
                  </Text>
                )}
                <Text style={styles.currentPrice}>
                  ${product.price.toLocaleString('es-CO')}
                </Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal:</Text>
              <Text style={styles.priceValue}>
                ${subtotal.toLocaleString('es-CO')}
              </Text>
            </View>

            {discount > 0 && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabelDiscount}>Descuento:</Text>
                <Text style={styles.priceValueDiscount}>
                  -${discount.toLocaleString('es-CO')}
                </Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>
                ${total.toLocaleString('es-CO')}
              </Text>
            </View>
          </View>

          {/* Pickup Address */}
          <View style={styles.addressSection}>
            <Text style={styles.sectionTitle}>Punto de Recogida</Text>
            <View style={styles.addressCard}>
              <Ionicons name="location" size={24} color="#27AE60" />
              <Text style={styles.addressText}>{restaurant.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Reserve Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.reserveButton,
            (isReserving || !product.isAvailable) && styles.reserveButtonDisabled
          ]}
          onPress={handleReserve}
          disabled={isReserving || !product.isAvailable}
        >
          {isReserving ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <Ionicons name="timer" size={24} color="#FFF" />
              <Text style={styles.reserveButtonText}>
                Reservar por 5 minutos
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}