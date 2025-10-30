// app/(tabs)/AddReviewScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { restaurantService } from "@/services/restaurantService";
import { productService } from "@/services/productService";
import { reviewService } from "@/services/reviewService";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/context/AuthContext";
import { profileStyles as styles } from "@/styles/AddReviewScreen.styles";
import { CustomAlertHelper } from "@/components/ui/customAlert";

const AddReviewScreen = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { location } = useLocation();

  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navItems = createReviewsNavItems("reviews", router);

  const loadRestaurants = useCallback(async () => {
    if (!location) return;
    setLoading(true);
    try {
      const nearby = await restaurantService.getNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: 5,
      });
      setRestaurants(nearby);
    } catch (error) {
      console.error("Error loading restaurants:", error);
      CustomAlertHelper.error("Error", "No se pudieron cargar los restaurantes cercanos");
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  const loadProducts = useCallback(async () => {
    if (!selectedRestaurant || !token) return;
    setLoadingProducts(true);
    try {
      const data = await productService.getByRestaurant(selectedRestaurant.id, token);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      CustomAlertHelper.error("Error", "No se pudieron cargar los productos del restaurante");
    } finally {
      setLoadingProducts(false);
    }
  }, [selectedRestaurant, token]);

  useEffect(() => {
    loadProducts();
  }, [selectedRestaurant]);

  const handleSubmit = async () => {
    if (!selectedRestaurant || !selectedProduct || !review.trim() || rating === 0) {
      CustomAlertHelper.warning("Atención", "Completa todos los campos antes de enviar");
      return;
    }

    if (!token) {
      CustomAlertHelper.error("Error", "Debes iniciar sesión para enviar una reseña");
      return;
    }

    console.log('🔑 Token antes de enviar:', token.substring(0, 20) + '...');
    console.log('📦 Review data:', {
      restaurantId: selectedRestaurant.id,
      productId: selectedProduct.id,
      rating,
      text: review.trim().substring(0, 50),
    });

    try {
      setSubmitting(true);
      const result = await reviewService.create(
        {
          restaurantId: selectedRestaurant.id,
          productId: selectedProduct.id,
          rating,
          text: review.trim(),
        },
        token
      );

      console.log('✅ Review created:', result);

      CustomAlertHelper.success("Reseña enviada", "Tu opinión ha sido publicada", () => {
        setReview("");
        setRating(0);
        setSelectedRestaurant(null);
        setSelectedProduct(null);
        router.push("/(tabs)/ReviewsScreen");
      });
    } catch (error: any) {
      console.error("❌ Error submitting review:", error);
      console.error("❌ Error message:", error.message);
      CustomAlertHelper.error("Error", error.message || "No se pudo enviar la reseña");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          <Text style={styles.yummi}>YUMMI </Text>Opiniones
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona un restaurante</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#27AE60" />
          ) : restaurants.length > 0 ? (
            restaurants.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[
                  styles.dropdown,
                  selectedRestaurant?.id === r.id && { borderColor: "#27AE60" },
                ]}
                onPress={() => {
                  setSelectedRestaurant(r);
                  setSelectedProduct(null);
                }}
              >
                <Text style={styles.dropdownText}>{r.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No hay restaurantes cercanos</Text>
          )}
        </View>

        {selectedRestaurant && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selecciona un producto</Text>
            {loadingProducts ? (
              <ActivityIndicator size="small" color="#27AE60" />
            ) : products.length > 0 ? (
              products.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[
                    styles.productCard,
                    selectedProduct?.id === p.id && {
                      borderColor: "#27AE60",
                      backgroundColor: "#F8FFF8",
                    },
                  ]}
                  onPress={() => setSelectedProduct(p)}
                >
                  <Image
                    source={{ uri: p.imageUrl || "https://via.placeholder.com/100" }}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{p.name}</Text>
                    <Text numberOfLines={2} style={styles.productDescription}>
                      {p.description || "Sin descripción"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No hay productos disponibles</Text>
            )}
          </View>
        )}

        {selectedProduct && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Puntúa y opina</Text>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons
                      name={star <= rating ? "star" : "star-outline"}
                      size={28}
                      color="#000"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Escribe tu reseña..."
                placeholderTextColor="#666"
                value={review}
                onChangeText={setReview}
                style={styles.input}
                editable={!submitting}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Ionicons name="send" size={20} color="#FFF" />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <BottomNavigation items={navItems} />
    </View>
  );
};

export default AddReviewScreen;