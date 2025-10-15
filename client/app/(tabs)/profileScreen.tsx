import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { useAuth } from "@/context/AuthContext";
import { createNavItems } from "../../utils/navigationHelpers";
import { profileStyles as styles } from "../../styles/profileScreens.styles";

/**
 * ProfileScreen
 * 
 * Displays the authenticated user's profile information and 
 * allows navigation to the Edit Profile screen or logout.
 */
export default function ProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { user, logout } = useAuth();

  const navItems = createNavItems("profile", router);

  /**
   * Logs out the current user and navigates back to the login screen
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      Alert.alert("Goodbye!", "You have been logged out.");
      router.replace("/LoginScreen");
    } catch (error) {
      console.error("❌ Logout error:", error);
      Alert.alert("Error", "Could not log out. Please try again.");
    }
  };

  /**
   * Navigates to the Edit Profile screen
   */
  const handleEditProfile = (): void => {
    router.push("/(tabs)/EditProfileScreen");
  };

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

        {/* Divider */}
        <View style={styles.divider} />

        {/* Profile Picture */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileBackground} />
            <Image
              source={require("../../assets/img/profile.png")}
              style={styles.profileImage}
            />
            {/* Decorative stars */}
            <Ionicons name="add" size={20} color="#E8E8E8" style={styles.star1} />
            <Ionicons name="add" size={16} color="#E8E8E8" style={styles.star2} />
            <Ionicons name="add" size={12} color="#E8E8E8" style={styles.star3} />
            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="pencil" size={18} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{user?.name ?? "User"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
        </View>

        {/* Example purchase info */}
        <View style={styles.purchaseCard}>
          <View style={styles.foodImageContainer}>
            <Image
              source={require("../../assets/img/food.png")}
              style={styles.foodImage}
            />
            <Text style={styles.lastPurchaseLabel}>Última compra</Text>
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Comentario:</Text>
            <Text style={styles.commentText}>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit...”
            </Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}
