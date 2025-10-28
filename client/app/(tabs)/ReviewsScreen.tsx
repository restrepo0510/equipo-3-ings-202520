// app/(tabs)/ReviewScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { profileStyles as styles } from "@/styles/ReviewsScreen.styles";
import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/context/ReviewsContext";
import { useRestaurants } from "@/context/RestaurantsContext";

export default function ReviewsScreen(): React.ReactElement {
  const router = useRouter();
  const { reviews: contextReviews } = useReviews();
  const { restaurants } = useRestaurants();
  const { user, logout } = useAuth();

  // --- Local states ---
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("Seleccione un Restaurante");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState<any[]>([]);
  
  const navItems = createReviewsNavItems("reviews", router);

  // =============================================================
  //  Default sample reviews to display when no user reviews exist
  // =============================================================
  const baseReviews = [
    {
      id: 1,
      namep: "Juan P.",
      text: "La comida estaba fresca y a buen precio.",
      rating: 5,
      image: require("../../assets/img/spaghetti.avif"),
    },
    {
      id: 2,
      namep: "María S.",
      text: "No me gustó la textura después de un rato, pero el sabor era bueno.",
      rating: 3,
      image: require("../../assets/img/pizza.jpg"),
    },
    {
      id: 3,
      namep: "Carlos G.",
      text: "Excelente servicio y ambiente agradable. Muy recomendado.",
      rating: 5,
      image: require("../../assets/img/pizza.jpg"),
    },
    {
      id: 4,
      namep: "Laura T.",
      text: "Las porciones son pequeñas, pero la presentación es impecable.",
      rating: 4,
      image: require("../../assets/img/spaghetti.avif"),
    },
    {
      id: 5,
      namep: "Andrés M.",
      text: "Pedí una pizza y llegó un poco fría, aunque el sabor compensó.",
      rating: 3,
      image: require("../../assets/img/pizza.jpg"),
    },
    {
      id: 6,
      namep: "Camila R.",
      text: "Muy buena atención, aunque el pedido tardó un poco.",
      rating: 4,
      image: require("../../assets/img/spaghetti.avif"),
    },
  ];

  // =============================================================
  //  Generate random sample reviews from base list
  // =============================================================
  const getRandomReviews = () => {
    const shuffled = [...baseReviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 4) + 2);
  };

  // =============================================================
  //  Display reviews only when a restaurant is selected
  // =============================================================
  useEffect(() => {
    if (selectedRestaurant !== "Seleccione un Restaurante") {
      const randomSet = getRandomReviews();
      // Combine sample reviews with user-added context reviews
      setDisplayedReviews([...randomSet, ...contextReviews]);
    } else {
      setDisplayedReviews([]); // Clear list when no restaurant is selected
    }
  }, [selectedRestaurant, contextReviews]);

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* Header section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            <Text style={styles.yummi}>YUMMI </Text>Opiniones
          </Text>
        </View>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Restaurant dropdown */}
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

        {/* Dropdown list with restaurants */}
        {dropdownVisible && (
          <View style={localDropdown.dropdownList}>
            {restaurants.length > 0 ? (
              restaurants.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={localDropdown.dropdownItem}
                  onPress={() => {
                    setSelectedRestaurant(r.name);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={localDropdown.dropdownItemText}>{r.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: "center", color: "#666", padding: 10 }}>
                No hay restaurantes disponibles en tu zona.
              </Text>
            )}
          </View>
        )}

        {/* Review list (displayed only if a restaurant is selected) */}
        {displayedReviews.length > 0 ? (
          displayedReviews.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              {/* Rating stars */}
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < (item.rating || 0) ? "star" : "star-outline"}
                    size={18}
                    color="#2E2E2E"
                  />
                ))}
              </View>

              {/* Review content block */}
              <View style={styles.reviewContent}>
                {/* Optional image (either local require() or remote URL) */}
                {item.image && (
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                    }
                    style={styles.foodImage}
                  />
                )}
                <View style={styles.textContainer}>
                  {/* Reviewer name (defaults to user name if available) */}
                  <Text style={styles.reviewerName}>
                    {item.namep ? item.namep : user?.name ?? "User"}
                  </Text>
                  {/* Review text (visible to user) */}
                  <Text style={styles.reviewText}>{item.text}</Text>
                </View>

                {/* Button to navigate and read full review */}
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
            Selecciona un restaurante para ver las opiniones.
          </Text>
        )}
      </ScrollView>

      {/* Fixed input bar above BottomNavigation */}
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

      {/* Bottom navigation bar */}
      <BottomNavigation items={navItems} />
    </View>
  );
}

// =============================================================
// Local styles for dropdown and input bar
// =============================================================
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
    bottom: 90, // Positioned just above BottomNavigation
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
