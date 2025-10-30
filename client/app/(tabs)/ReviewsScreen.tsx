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
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);

  const navItems = createReviewsNavItems("reviews", router);

  console.log('🔍 [ReviewsScreen] Estado inicial:');
  console.log('  - globalRestaurants.length:', globalRestaurants.length);
  console.log('  - localRestaurants.length:', localRestaurants.length);
  console.log('  - location:', location);
  console.log('  - token exists:', !!token);

  // Cargar restaurantes
  useEffect(() => {
    console.log('📍 [useEffect] Verificando restaurantes...');
    
    if (globalRestaurants.length > 0) {
      console.log('✅ Usando restaurantes del contexto global:', globalRestaurants.length);
      setLocalRestaurants(globalRestaurants);
      return;
    }

    if (!location) {
      console.log('⚠️ No hay ubicación disponible');
      return;
    }

    const loadRestaurants = async () => {
      console.log('🔄 Cargando restaurantes cercanos...');
      setLoadingRestaurants(true);
      
      try {
        const nearby = await restaurantService.getNearby({
          latitude: location.latitude,
          longitude: location.longitude,
          radius: 5,
        });
        
        console.log('✅ Restaurantes cargados:', nearby.length);
        console.log('📋 Restaurantes:', nearby.map(r => r.name));
        
        setLocalRestaurants(nearby);
        setGlobalRestaurants(nearby);
      } catch (error) {
        console.error("❌ Error loading restaurants:", error);
      } finally {
        setLoadingRestaurants(false);
      }
    };

    loadRestaurants();
  }, [location, globalRestaurants.length]);

  // Cargar reviews
  useEffect(() => {
    const loadReviews = async () => {
      console.log('🔍 [loadReviews] Iniciando...');
      console.log('  - selectedRestaurant:', selectedRestaurant);
      
      if (!selectedRestaurant || selectedRestaurant === "Seleccione un Restaurante") {
        console.log('⚠️ No hay restaurante seleccionado');
        setDisplayedReviews([]);
        return;
      }

      const restaurant = localRestaurants.find(r => r.name === selectedRestaurant);
      console.log('🔍 Restaurante encontrado:', restaurant);
      
      if (!restaurant) {
        console.log('❌ Restaurante no encontrado en la lista');
        return;
      }
      
      if (!token) {
        console.log('❌ No hay token disponible');
        return;
      }

      console.log('🔄 Cargando reviews para restaurante:', restaurant.id);
      setLoadingReviews(true);
      
      try {
        const data = await reviewService.getByRestaurant(restaurant.id, token);
        console.log('✅ Reviews recibidas:', data.length);
        console.log('📊 Datos:', data);
        
        const formattedReviews = data.map((r: any) => {
          console.log('  - Review:', {
            id: r.id,
            user: r.user?.name,
            rating: r.rating,
            text: r.text.substring(0, 30)
          });
          
          return {
            id: r.id,
            namep: r.user?.name || 'Usuario',
            text: r.text,
            rating: r.rating,
            image: r.product?.imageUrl ? { uri: r.product.imageUrl } : null,
          };
        });
        
        console.log('✅ Reviews formateadas:', formattedReviews.length);
        setDisplayedReviews(formattedReviews);
      } catch (error) {
        console.error("❌ Error cargando reviews:", error);
        setDisplayedReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    loadReviews();
  }, [selectedRestaurant, localRestaurants, token]);

  const handleSelectRestaurant = (restaurant: any) => {
    console.log('🎯 Restaurante seleccionado:', restaurant.name);
    setSelectedRestaurant(restaurant.name);
    setDropdownVisible(false);
  };

  console.log('🎨 [Render] Mostrando:');
  console.log('  - localRestaurants:', localRestaurants.length);
  console.log('  - displayedReviews:', displayedReviews.length);
  console.log('  - loadingRestaurants:', loadingRestaurants);
  console.log('  - loadingReviews:', loadingReviews);

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
          onPress={() => {
            console.log('🔽 Toggling dropdown. Current:', dropdownVisible);
            setDropdownVisible(!dropdownVisible);
          }}
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
                No hay restaurantes disponibles ({localRestaurants.length})
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
                    name={i < (item.rating || 0) ? "star" : "star-outline"}
                    size={18}
                    color="#2E2E2E"
                  />
                ))}
              </View>

              <View style={styles.reviewContent}>
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.foodImage} />
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.reviewerName}>{item.namep}</Text>
                  <Text style={styles.reviewText}>{item.text}</Text>
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
              ? "Selecciona un restaurante para ver las opiniones."
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