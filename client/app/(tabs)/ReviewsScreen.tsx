// ReviewsScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { profileStyles as styles } from "@/styles/ReviewsScreen.styles";
import { useAuth } from "@/context/AuthContext";
import { useRestaurants } from "@/context/RestaurantsContext";
import { reviewService } from "@/services/reviewService";
import { restaurantService } from "@/services/restaurantService";
import { useLocation } from "@/hooks/useLocation";

export default function ReviewsScreen(): React.ReactElement {
  const router = useRouter();
  const { restaurants: globalRestaurants, setRestaurants: setGlobalRestaurants } = useRestaurants();
  const { user, token } = useAuth();
  const { location } = useLocation();

  const [localRestaurants, setLocalRestaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("Seleccione un Restaurante");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState<any[]>([]);
  const [allReviews, setAllReviews] = useState<any[]>([]); // Todas las reviews
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);

  const navItems = createReviewsNavItems("reviews", router);

  // Formatear review
 const formatReview = (r: any) => {
  let imageUri = null;
  if (r.product?.imageUrl) {
    const url = r.product.imageUrl;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        new URL(url);
        imageUri = url;
      } catch {}
    }
  }
  
  return {
    id: r.id,
    namep: r.user?.name || 'Usuario',
    text: r.text,
    rating: r.rating,
    image: imageUri ? { uri: imageUri } : null,
    productName: r.product?.name || 'Producto',
    productDescription: r.product?.description || '',
    restaurantId: r.restaurant?.id || '',
    restaurantName: r.restaurant?.name || '',
  };
};

  // Obtener reviews aleatorias
  const getRandomReviews = (reviews: any[], count: number = 4) => {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Cargar restaurantes
  useEffect(() => {
    if (globalRestaurants.length > 0) {
      setLocalRestaurants(globalRestaurants);
      return;
    }

    if (!location) return;

    const loadRestaurants = async () => {
      setLoadingRestaurants(true);
      
      try {
        const nearby = await restaurantService.getNearby({
          latitude: location.latitude,
          longitude: location.longitude,
          radius: 5,
        });
        
        setLocalRestaurants(nearby);
        setGlobalRestaurants(nearby);
      } catch (error) {
        // Error silencioso
      } finally {
        setLoadingRestaurants(false);
      }
    };

    loadRestaurants();
  }, [location, globalRestaurants.length]);

  // Cargar TODAS las reviews al inicio
  useEffect(() => {
    const loadAllReviews = async () => {
      if (!token || localRestaurants.length === 0) return;

      setLoadingReviews(true);
      
      try {
        const allReviewsPromises = localRestaurants.map(restaurant =>
          reviewService.getByRestaurant(restaurant.id, token)
            .catch(() => []) // Si falla uno, continuar
        );

        const results = await Promise.all(allReviewsPromises);
        const allReviewsFlat = results.flat();
        const formatted = allReviewsFlat.map(formatReview);
        
        setAllReviews(formatted);
        setDisplayedReviews(getRandomReviews(formatted, 10));
      } catch (error) {
        // Error silencioso
      } finally {
        setLoadingReviews(false);
      }
    };

    loadAllReviews();
  }, [localRestaurants, token]);

  // Cargar reviews del restaurante seleccionado
  useEffect(() => {
    if (selectedRestaurant === "Seleccione un Restaurante") {
      setDisplayedReviews(getRandomReviews(allReviews, 4));
      return;
    }

    const restaurant = localRestaurants.find(r => r.name === selectedRestaurant);
    if (!restaurant) return;

    const restaurantReviews = allReviews.filter(
      review => localRestaurants.some(r => r.id === restaurant.id)
    );

    // Filtrar reviews del restaurante seleccionado
    const loadReviews = async () => {
      setLoadingReviews(true);
      
      try {
        const data = await reviewService.getByRestaurant(restaurant.id, token!);
        const formatted = data.map(formatReview);
        setDisplayedReviews(formatted);
      } catch (error) {
        setDisplayedReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    loadReviews();
  }, [selectedRestaurant]);

  const handleSelectRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant.name);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            <Text style={styles.yummi}>YUMMI </Text>Opiniones
          </Text>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{selectedRestaurant}</Text>
          <Ionicons
            name={dropdownVisible ? "chevron-up" : "chevron-down"}
            size={18}
            color="#333"
          />
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={localDropdown.dropdownList}>
            {loadingRestaurants ? (
              <ActivityIndicator size="small" color="#27AE60" style={{ padding: 10 }} />
            ) : localRestaurants.length > 0 ? (
              localRestaurants.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={localDropdown.dropdownItem}
                  onPress={() => handleSelectRestaurant(r)}
                >
                  <Text style={localDropdown.dropdownItemText}>{r.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: "center", color: "#666", padding: 10 }}>
                No hay restaurantes disponibles
              </Text>
            )}
          </View>
        )}

        {loadingReviews ? (
          <ActivityIndicator size="large" color="#27AE60" style={{ marginTop: 20 }} />
        ) : displayedReviews.length > 0 ? (
          displayedReviews.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < item.rating ? "star" : "star-outline"}
                    size={18}
                    color="#000"
                  />
                ))}
              </View>

              <View style={styles.reviewContent}>
                {item.image ? (
                  <Image 
                    source={{ uri: item.image.uri }}
                    style={styles.foodImage}
                    onError={() => {}}
                  />
                ) : null}
                
                <View style={styles.textContainer}>
                  <Text style={styles.reviewerName}>{item.namep}</Text>
                  <Text style={styles.reviewText} numberOfLines={2}>
                    {item.text}
                  </Text>
                </View>

              <TouchableOpacity
  style={styles.reviewButton}
  onPress={() =>
    router.push({
      pathname: "/(tabs)/ReadReviews",
      params: {
        id: item.id,
        namep: item.namep,
        text: item.text,
        rating: item.rating,
        productName: item.productName || "Producto",
        productDescription: item.productDescription || "",
        productImage: item.image?.uri || "",
        restaurantId: item.restaurantId || "",
        restaurantName: item.restaurantName || "",
      },
    })
  }
>
  <Text style={styles.reviewButtonText}>Ver reseña</Text>
</TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>
            {selectedRestaurant === "Seleccione un Restaurante"
              ? "No hay opiniones disponibles."
              : "No hay opiniones para este restaurante aún."}
          </Text>
        )}
      </ScrollView>

      <View style={fixedStyles.inputContainerFixed}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => router.push("/(tabs)/AddReviewScreen")}
        >
          <TextInput
            placeholder="Escribir opinión ..."
            placeholderTextColor="#333"
            editable={false}
            style={styles.input}
          />
        </TouchableOpacity>
        <Ionicons name="send" size={20} color="#000000ff" />
      </View>

      <BottomNavigation items={navItems} />
    </View>
  );
}

const localDropdown = StyleSheet.create({
  dropdownList: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#FFF",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
});

const fixedStyles = StyleSheet.create({
  inputContainerFixed: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 90,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});