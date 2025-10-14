// app/(tabs)/profile.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation, NavItem } from "../../components/ui/bottomnavigation";

export default function ProfileScreen() {
  const router = useRouter();

  /**
   * Navigation items configuration for Profile Screen
   */
  const navItems: NavItem[] = [
    {
      id: 'home',
      icon: 'home-outline',
      onPress: () => {
        console.log('Home pressed');
        // router.push('/(tabs)/home');
      },
      isActive: false,
    },
    {
      id: 'favorites',
      icon: 'heart-outline',
      onPress: () => console.log('Favorites pressed'),
      isActive: false,
    },
    {
      id: 'chat',
      icon: 'chatbubble-outline',
      onPress: () => console.log('Chat pressed'),
      isActive: false,
    },
    {
      id: 'profile',
      icon: 'person',
      onPress: () => console.log('Profile pressed'),
      isActive: true, // Profile is active
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Mi <Text style={styles.yummi}>YUMMI</Text>
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Profile Image with decorative stars */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {/* Background circle */}
            <View style={styles.profileBackground} />
            
            {/* Profile Image */}
            <Image 
              source={require("../../assets/img/profile.png")} 
              style={styles.profileImage} 
            />
            
            {/* Decorative stars */}
            <Ionicons name="add" size={20} color="#E8E8E8" style={styles.star1} />
            <Ionicons name="add" size={16} color="#E8E8E8" style={styles.star2} />
            <Ionicons name="add" size={12} color="#E8E8E8" style={styles.star3} />
            
            {/* Edit Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push('../(tabs)/editProfileScreen')}
            >
              <Ionicons name="pencil" size={18} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>FirstName</Text>
        </View>

        {/* Last Purchase Card */}
        <View style={styles.purchaseCard}>
          {/* Food Image with green border */}
          <View style={styles.foodImageContainer}>
            <Image 
              source={require("../../assets/img/food.png")} 
              style={styles.foodImage} 
            />
            <Text style={styles.lastPurchaseLabel}>Última compra</Text>
          </View>

          {/* Comment Section */}
          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Comentario:</Text>
            <Text style={styles.commentText}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit vivamus vitae, 
              neque suspendisse tellus massa ...
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 120, // Space for bottom nav
    alignItems: "center",
  },
  
  // Header
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: "bold",
    color: "#000",
  },
  yummi: { 
    fontStyle: "italic",
    fontWeight: "300",
    letterSpacing: 2,
  },
  divider: {
    width: "90%",
    height: 2,
    backgroundColor: "#000",
    marginBottom: 30,
  },

  // Profile Section
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  profileBackground: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#2C3E2F",
  },
  profileImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 60,
    zIndex: 2,
  },
  
  // Decorative stars
  star1: {
    position: "absolute",
    top: 20,
    right: 15,
    zIndex: 3,
  },
  star2: {
    position: "absolute",
    top: 50,
    right: 5,
    zIndex: 3,
  },
  star3: {
    position: "absolute",
    bottom: 40,
    left: 10,
    zIndex: 3,
  },
  
  // Edit Button
  editButton: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 3,
  },
  
  name: { 
    fontWeight: "bold", 
    fontSize: 24, 
    color: "#000",
  },

  // Purchase Card
  purchaseCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  foodImageContainer: {
    position: "relative",
  },
  foodImage: { 
    width: 140, 
    height: 180, 
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#27AE60",
  },
  lastPurchaseLabel: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "#1B5E20",
    color: "#FFFFFF",
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 13,
  },
  
  // Comment Section
  commentSection: { 
    flex: 1, 
    marginLeft: 16,
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  commentTitle: { 
    color: "#000", 
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  commentText: { 
    fontSize: 13, 
    color: "#555",
    lineHeight: 20,
  },
});