// app/(tabs)/AddReviewScreen.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { restaurantService } from "@/services/restaurantService";
import { productService } from "@/services/productService";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/context/ReviewsContext";
import { useRestaurants } from "@/context/RestaurantsContext";
import { profileStyles as styles } from "@/styles/AddReviewScreen.styles";

const AddReviewScreen = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { location } = useLocation();
  const { addReview } = useReviews();
  const { restaurants: globalRestaurants, setRestaurants: setGlobalRestaurants } = useRestaurants();

  // --- Local states for component data ---
  const [localRestaurants, setLocalRestaurants] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const navItems = createReviewsNavItems("reviews", router);

  // =============================================================
  // 🔹 Load nearby restaurants using the user's location
  // =============================================================
  const loadRestaurants = useCallback(async () => {
    if (!location) return;
    setLoading(true);
    try {
      // Fetch nearby restaurants using the restaurant service
      const nearby = await restaurantService.getNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: 5, // search radius in km
      });
      setLocalRestaurants(nearby);
      setGlobalRestaurants(nearby); // 🔹 Update global restaurants context
    } catch (error) {
      console.error("❌ Error loading restaurants:", error);
      Alert.alert("Error", "No se pudieron cargar los restaurantes cercanos.");
    } finally {
      setLoading(false);
    }
  }, [location, setGlobalRestaurants]);

  // --- Load restaurants if not already present in global context ---
  useEffect(() => {
    if (globalRestaurants.length > 0) {
      setLocalRestaurants(globalRestaurants);
    } else {
      loadRestaurants();
    }
  }, [globalRestaurants, loadRestaurants]);

  // =============================================================
  // 🔹 Load products for the selected restaurant
  // =============================================================
  const loadProducts = useCallback(async () => {
    if (!selectedRestaurant || !token) return;
    setLoadingProducts(true);
    try {
      const data = await productService.getByRestaurant(selectedRestaurant.id, token);
      setProducts(data);
    } catch (error) {
      console.error("❌ Error loading products:", error);
      Alert.alert("Error", "No se pudieron cargar los productos del restaurante.");
    } finally {
      setLoadingProducts(false);
    }
  }, [selectedRestaurant, token]);

  // --- Fetch products whenever the selected restaurant changes ---
  useEffect(() => {
    loadProducts();
  }, [selectedRestaurant]);

  // =============================================================
  // 🔹 Handle review submission
  // =============================================================
  const handleSubmit = () => {
    // Validate required fields
    if (!selectedRestaurant || !selectedProduct || !review || rating === 0) {
      Alert.alert("Atención", "Completa todos los campos antes de enviar.");
      return;
    }

    // Add review to global context
    addReview({
      id: Date.now().toString(),
      restaurant: selectedRestaurant.name,
      product: selectedProduct.name,
      rating,
      text: review,
      image: selectedProduct.imageUrl ? { uri: selectedProduct.imageUrl } : null,
    });

    Alert.alert("✅ Reseña enviada", "Tu opinión ha sido publicada.");
    // Reset form fields
    setReview("");
    setRating(0);
    setSelectedRestaurant(null);
    setSelectedProduct(null);
    router.push("/(tabs)/ReviewsScreen");
  };

  // =============================================================
  // 🔹 Main render
  // =============================================================
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          <Text style={styles.yummi}>YUMMI </Text>Opiniones
        </Text>
      </View>

      {/* Scrollable main content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ================== Select Restaurant ================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona un restaurante</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#27AE60" />
          ) : localRestaurants.length > 0 ? (
            localRestaurants.map((r) => (
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
            <Text style={styles.emptyText}>No hay restaurantes cercanos.</Text>
          )}
        </View>

        {/* ================== Select Product ================== */}
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
                      {p.description || "Detalles del producto... lorem ipsum"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>
                No hay productos disponibles para este restaurante.
              </Text>
            )}
          </View>
        )}

        {/* ================== Rate and Write Review ================== */}
        {selectedProduct && (
          <>
            {/* Rating section */}
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

            {/* Text input for the review */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Escribe tu reseña..."
                placeholderTextColor="#666"
                value={review}
                onChangeText={setReview}
                style={styles.input}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
                <Ionicons name="send" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom navigation bar */}
      <BottomNavigation items={navItems} />
    </View>
  );
};

export default AddReviewScreen;
