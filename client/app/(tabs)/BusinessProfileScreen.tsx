// app/(tabs)/BusinessProfileScreen.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createBusinessNavItems } from "@/utils/navigationHelpers";
import { productService, Product } from "@/services/productService";
import { restaurantService } from "@/services/restaurantService";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/BusinessProfileScreen.styles";

/**
 * BusinessProfileScreen Component
 *
 * Main screen for business users to view and manage their products.
 * This is the home screen for business accounts.
 */
export default function BusinessProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { token, user, logout } = useAuth();
  const navItems = createBusinessNavItems("profile", router);

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurantImage, setRestaurantImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get restaurant ID from user (user.id is already a string UUID)
  const restaurantId = user?.id;

  /**
   * Load restaurant data to get the image
   */
  const loadRestaurantData = useCallback(async () => {
    if (!restaurantId) return;

    try {
      const restaurant = await restaurantService.getById(restaurantId);
      setRestaurantImage(restaurant.imageUrl || null);
      console.log("🏪 Restaurant image loaded:", restaurant.imageUrl);
    } catch (error: any) {
      console.error("❌ Error loading restaurant data:", error);
      // Don't show error for image loading failure
    }
  }, [restaurantId]);

  /**
   * Fetch products for this business from backend
   */
  const loadProducts = useCallback(async () => {
    if (!token) {
      setError("No authentication token");
      setIsLoading(false);
      return;
    }

    if (!restaurantId) {
      setError("No restaurant ID found");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Load both restaurant data and products
      await Promise.all([
        loadRestaurantData(),
        productService.getByRestaurant(restaurantId, token).then((data) => {
          console.log("📦 Business products loaded:", data.length);
          setProducts(data);
        }),
      ]);
    } catch (error: any) {
      console.error("❌ Error loading products:", error);
      setError(error.message || "Could not load products");
    } finally {
      setIsLoading(false);
    }
  }, [token, restaurantId, loadRestaurantData]);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /**
   * Handles user logout and redirects to login screen
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      Alert.alert("Goodbye!", "You have been logged out.");
    } catch (error) {
      console.error("❌ Logout error:", error);
      Alert.alert("Error", "Could not log out. Please try again.");
    }
  };

  /**
   * Navigate to edit business profile screen
   */
  const handleEditProfile = (): void => {
    router.push("/(tabs)/EditBusinessProfileScreen");
  };

  /**
   * Navigate to edit product screen
   */
  const handleEditProduct = (product: Product): void => {
    router.push({
      pathname: "/(tabs)/EditProductScreen",
      params: { productId: product.id },
    });
  };

  /**
   * Update product quantity in stock
   */
  const handleUpdateQuantity = async (
    product: Product,
    change: number
  ): Promise<void> => {
    if (!token) return;

    const newStock = product.stock + change;
    if (newStock < 0) return;

    try {
      await productService.update(product.id, { stock: newStock }, token);
      
      // Update local state
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p))
      );
      
      console.log(`✅ Stock updated: ${product.name} - ${newStock}`);
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
      Alert.alert("Error", "No se pudo actualizar la cantidad");
    }
  };

  /**
   * Delete product after user confirmation
   */
  const handleDeleteProduct = async (product: Product): Promise<void> => {
    if (!token) return;

    Alert.alert(
      "Eliminar Producto",
      `¿Estás seguro de eliminar "${product.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await productService.delete(product.id, token);
              setProducts((prev) => prev.filter((p) => p.id !== product.id));
              Alert.alert("Éxito", "Producto eliminado");
            } catch (error) {
              console.error("❌ Error deleting product:", error);
              Alert.alert("Error", "No se pudo eliminar el producto");
            }
          },
        },
      ]
    );
  };

  // Loading view
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

  // Error view
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#E74C3C" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadProducts}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              Mi <Text style={styles.yummi}>YUMMI</Text>
            </Text>
            <Text style={styles.headerSubtitle}>Enterprise</Text>
          </View>

          <TouchableOpacity onPress={loadProducts}>
            <Ionicons name="refresh" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Company Section */}
        <View style={styles.companySection}>
          <View style={styles.companyImageContainer}>
            <View style={styles.companyImage}>
              {restaurantImage ? (
                <Image
                  source={{ uri: restaurantImage }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.companyEmoji}>🏪</Text>
              )}
            </View>
            {/* ✅ BOTÓN DE EDITAR PERFIL ENLAZADO */}
            <TouchableOpacity 
              style={styles.editCompanyButton}
              onPress={handleEditProfile}
              accessibilityLabel="Edit business profile"
              accessibilityHint="Tap to edit your business information"
            >
              <Ionicons name="pencil" size={25} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.companyName}>{user?.name || "Company Name"}</Text>
        </View>

        {/* Products List */}
        {products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="restaurant-outline" size={80} color="#BDC3C7" />
            <Text style={styles.emptyText}>No hay productos</Text>
            <Text style={styles.emptySubtext}>
              Añade tu primer producto usando el botón +
            </Text>
          </View>
        ) : (
          <View style={styles.productsList}>
            {products.map((product) => (
              <View key={product.id} style={styles.productCard}>
                {/* Quantity Badge */}
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>{product.stock}</Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditProduct(product)}
                >
                  <Ionicons name="pencil" size={24} color="#000" />
                </TouchableOpacity>

                {/* Product Card Content */}
                <View style={styles.productCardInner}>
                  {/* Product Image */}
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{
                        uri: product.imageUrl || "https://via.placeholder.com/64",
                      }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Product Info */}
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <Text style={styles.productDescription} numberOfLines={1}>
                      {product.description || "Sin descripción"}
                    </Text>
                    <Text style={styles.productPrice}>
                      ${product.price.toLocaleString("es-CO")}
                    </Text>
                  </View>

                  {/* Quantity Controls */}
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleUpdateQuantity(product, -1)}
                    >
                      <Ionicons name="remove" size={40} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.quantityButton, styles.quantityButtonAdd]}
                      onPress={() => handleUpdateQuantity(product, 1)}
                    >
                      <Ionicons name="add" size={40} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}