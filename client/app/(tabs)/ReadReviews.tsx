import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { profileStyles as styles } from "@/styles/ReadReviews.styles";

const ReadReviews = () => {
  const router = useRouter();
  const { namep, text, rating } = useLocalSearchParams();
  const navItems = createReviewsNavItems("reviews", router);

  const renderStars = (ratingValue: number) => (
    <View style={{ flexDirection: "row" }}>
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
        <View style={styles.reviewBox}>
          <Text style={styles.reviewerName}>{namep || "Usuario Anónimo"}</Text>
          {renderStars(Number(rating) || 0)}
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

