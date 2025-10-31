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
  StyleSheet,
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
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    if (selectedRestaurant) {
      loadProducts();
    }
  }, [selectedRestaurant]);

  const handleSelectRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setSelectedProduct(null);
    setDropdownVisible(false);
  };

const handleSubmit = async () => {
  if (!selectedRestaurant) {
    CustomAlertHelper.warning("Atención", "Selecciona un restaurante");
    return;
  }

  if (!selectedProduct) {
    CustomAlertHelper.warning("Atención", "Selecciona un producto");
    return;
  }

  if (rating === 0) {
    CustomAlertHelper.warning("Atención", "Selecciona una calificación");
    return;
  }

  if (!review.trim()) {
    CustomAlertHelper.warning("Atención", "Escribe tu opinión");
    return;
  }

  if (!token) {
    CustomAlertHelper.error("Error", "Debes iniciar sesión para enviar una reseña");
    return;
  }

  try {
    setSubmitting(true);
    
    await reviewService.create(
      {
        restaurantId: selectedRestaurant.id,
        productId: selectedProduct.id,
        rating,
        text: review.trim(),
      },
      token
    );

    CustomAlertHelper.success(
      "¡Reseña enviada!", 
      "Tu opinión ha sido publicada correctamente",
      () => {
        setReview("");
        setRating(0);
        setSelectedRestaurant(null);
        setSelectedProduct(null);
        router.push("/(tabs)/ReviewsScreen");
      }
    );
  } catch (error: any) {
    CustomAlertHelper.error(
      "Error", 
      error.message || "No se pudo enviar la reseña. Intenta de nuevo"
    );
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
        {/* Seleccionar Restaurante */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona un restaurante</Text>
          
          <TouchableOpacity
            style={styles.dropdownList}
            onPress={() => setDropdownVisible(!dropdownVisible)}
            disabled={loading}
          >
            <Text style={styles.dropdownItemText}>
              {selectedRestaurant ? selectedRestaurant.name : "Seleccione un restaurante"}
            </Text>
            <Ionicons
              name={dropdownVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color="#333"
            />
          </TouchableOpacity>

          {dropdownVisible && (
  <ScrollView style={localStyles.dropdownList} nestedScrollEnabled>
    {loading ? (
      <ActivityIndicator size="small" color="#000" style={{ padding: 10 }} />
    ) : restaurants.length > 0 ? (
      restaurants.map((r) => (
        <TouchableOpacity
          key={r.id}
          style={localStyles.dropdownItem}
          onPress={() => handleSelectRestaurant(r)}
        >
          <Text style={localStyles.dropdownItemText}>{r.name}</Text>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.emptyText}>No hay restaurantes cercanos</Text>
    )}
  </ScrollView>
)}
        </View>

        {/* Seleccionar Producto */}
        {selectedRestaurant && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selecciona un producto</Text>
            {loadingProducts ? (
              <ActivityIndicator size="small" color="#000" />
            ) : products.length > 0 ? (
              products.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[
                    styles.productCard,
                    selectedProduct?.id === p.id && {
                      borderColor: "#000",
                      backgroundColor: "#F8F8F8",
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
                      {p.description || "Detalles del producto..."}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No hay productos disponibles</Text>
            )}
          </View>
        )}

        {/* Puntuar y Opinar */}
        {selectedProduct && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Puntúa y opina</Text>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons
                      name={star <= rating ? "star" : "star-outline"}
                      size={32}
                      color="#000"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Escribe tu reseña..."
                placeholderTextColor="#999"
                value={review}
                onChangeText={setReview}
                style={styles.input}
                editable={!submitting}
                multiline
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

const localStyles = StyleSheet.create({
  dropdownList: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#333",
  },
});

export default AddReviewScreen;