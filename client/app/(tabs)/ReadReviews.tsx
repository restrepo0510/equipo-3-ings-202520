// ReadReviews.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { profileStyles as styles } from "@/styles/ReadReviews.styles";

const ReadReviews = () => {
  const router = useRouter();
  const { namep, text, rating, productName, productDescription, productImage, restaurantId, restaurantName } = useLocalSearchParams();
  const navItems = createReviewsNavItems("reviews", router);

  const renderStars = (ratingValue: number) => (
    <View style={{ flexDirection: "row", marginBottom: 8 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= Number(ratingValue) ? "star" : "star-outline"}
          size={20}
          color="#000"
        />
      ))}
    </View>
  );

  const handleVisitRestaurant = () => {
    if (restaurantId) {
      router.push({
        pathname: "/(tabs)/ProductsScreen",
        params: {
          restaurantId,
          restaurantName: restaurantName || "Restaurante",
        },
      });
    }
  };

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

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Rating */}
        {renderStars(Number(rating) || 0)}

        {/* Product Card */}
        {productName && (
          <View style={styles.productCard}>
            {productImage && (
              <Image
                source={{ uri: productImage as string }}
                style={styles.productImage}
                onError={() => {}}
              />
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {productDescription || "Detalles del producto..."}
              </Text>
            </View>
            <TouchableOpacity style={styles.visitButton} onPress={handleVisitRestaurant}>
              <Text style={styles.visitButtonText}>Ver restaurante</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Review Box */}
        <View style={styles.reviewBox}>
          <Text style={styles.reviewerName}>{namep || "Usuario Anónimo"}</Text>
          <Text style={styles.reviewText}>
            {text || "Sin comentario disponible."}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
};

export default ReadReviews;