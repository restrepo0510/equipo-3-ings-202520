// app/(tabs)/BusinessProfileScreen.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BottomNavigation } from "@/components/ui/bottomNavigation";
import { createBusinessNavItems } from "@/utils/navigationHelpers";
import { productService, Product } from "@/services/productService";
import { restaurantService } from "@/services/restaurantService";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/businessProfileScreen.styles";
import { CustomAlertHelper } from "@/components/ui/customAlert";

export default function BusinessProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { token, user, logout } = useAuth();
  const navItems = createBusinessNavItems("profile", router);

  const [products, setProducts] = useState<Product[]>([]);
  const [restaurantImage, setRestaurantImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = user?.id;

  const loadRestaurantData = useCallback(async () => {
    if (!restaurantId) return;

    try {
      const restaurant = await restaurantService.getById(restaurantId);
      setRestaurantImage(restaurant.imageUrl || null);
      console.log("🪙 Restaurant image loaded:", restaurant.imageUrl);
    } catch (error: any) {
      console.error("❌ Error loading restaurant data:", error);
    }
  }, [restaurantId]);

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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleLogout = async (): Promise<void> => {
    CustomAlertHelper.confirm(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      async () => {
        try {
          await logout();
          CustomAlertHelper.success("Hasta pronto", "Has cerrado sesión correctamente");
        } catch (error) {
          console.error("❌ Logout error:", error);
          CustomAlertHelper.error("Error", "No se pudo cerrar sesión. Intenta de nuevo");
        }
      }
    );
  };

  const handleEditProfile = (): void => {
    router.push("/(tabs)/EditBusinessProfileScreen");
  };

  const handleEditProduct = (product: Product): void => {
    router.push({
      pathname: "/(tabs)/EditProductScreen",
      params: { productId: product.id },
    });
  };

  const handleUpdateQuantity = async (
    product: Product,
    change: number
  ): Promise<void> => {
    if (!token) return;

    const newStock = product.stock + change;
    if (newStock < 0) return;

    try {
      await productService.update(product.id, { stock: newStock }, token);
      
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p))
      );
      
      console.log(`✅ Stock updated: ${product.name} - ${newStock}`);
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
      CustomAlertHelper.error("Error", "No se pudo actualizar la cantidad");
    }
  };

  const handleDeleteProduct = async (product: Product): Promise<void> => {
    if (!token) return;

    CustomAlertHelper.confirm(
      "Eliminar Producto",
      `¿Estás seguro de eliminar "${product.name}"?`,
      async () => {
        try {
          await productService.delete(product.id, token);
          setProducts((prev) => prev.filter((p) => p.id !== product.id));
          CustomAlertHelper.success("Éxito", "Producto eliminado correctamente");
        } catch (error) {
          console.error("❌ Error deleting product:", error);
          CustomAlertHelper.error("Error", "No se pudo eliminar el producto");
        }
      }
    );
  };

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

        <View style={styles.divider} />

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
                <Text style={styles.companyEmoji}>🪙</Text>
              )}
            </View>
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
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>{product.stock}</Text>
                </View>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditProduct(product)}
                >
                  <Ionicons name="pencil" size={24} color="#000" />
                </TouchableOpacity>

                <View style={styles.productCardInner}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{
                        uri: product.imageUrl || "https://via.placeholder.com/64",
                      }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  </View>

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

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation items={navItems} />
    </View>
  );
}