// app/(tabs)/ReviewScreen.tsx

import React, { useState } from "react";
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
import { profileStyles as styles } from "../../styles/ReviewsScreen.styles";


/**
 * ReviewsScreen
 *
 * Displays user reviews with ratings, restaurant selector,
 * and a field for writing a new review.
 */
export default function ReviewsScreen(): React.ReactElement {
  const router = useRouter();
  const [selectedPlace, setSelectedPlace] = useState("Capitulos-poblado");


  const navItems = createReviewsNavItems('reviews', router);

  // Example data for reviews
  const reviews = [
    {
      id: 1,
      name: "Juan P.",
      text: "La comida estaba fresca y a buen precio.",
      rating: 5,
      image: require("../../assets/img/spaghetti.avif"),
    },
    {
      id: 2,
      name: "Maria S.",
      text: "No me gustó la textura después de ...",
      rating: 3,
      image: require("../../assets/img/pizza.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            <Text style={styles.yummi}>YUMMI </Text>Opiniones

          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Dropdown placeholder */}
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{selectedPlace}</Text>
          <Ionicons name="chevron-down" size={18} color="#333" />
        </View>

        {/* Reviews list */}
        {reviews.map((item) => (
          <View key={item.id} style={styles.reviewCard}>
            {/* Rating stars */}
            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < item.rating ? "star" : "star-outline"}
                  size={18}
                  color="#2E2E2E"
                />
              ))}
            </View>

            {/* Review content */}
            <View style={styles.reviewContent}>
              <Image source={item.image} style={styles.foodImage} />
              <View style={styles.textContainer}>
                <Text style={styles.reviewerName}>{item.name}</Text>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => router.push("/(tabs)/ReadReviews")}>
                <Text style={styles.reviewButtonText}>Ver reseña</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}


        {/* Input section */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribir opinión ..."
            placeholderTextColor="#333"
            style={styles.input}
          />
          <Ionicons name="send" size={20} color="#000000ff" />
        </View>
      </ScrollView>

      {/*Bottom navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}

