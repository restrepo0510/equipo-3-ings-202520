// app/(tabs)/ProfileScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { useAuth } from "@/context/AuthContext";
import { createNavItems } from "@/utils/navigationHelpers";
import { profileStyles as styles } from "@/styles/ProfileScreens.styles";

/**
 * ProfileScreen
 * 
 * Displays the authenticated user's profile information with dynamic profile picture
 * Allows navigation to Edit Profile screen or logout
 */
export default function ProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { user, logout } = useAuth();
  const navItems = createNavItems("profile", router);

  // Track image loading state
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  /**
   * Get profile image URL from user data
   * Falls back to placeholder if not available
   */
  const getProfileImageSource = () => {
    // If user has a profileImage or imageUrl field
    const userImageUrl = (user as any)?.profileImage || (user as any)?.imageUrl;

    if (userImageUrl && !imageError) {
      return { uri: userImageUrl };
    }

    // Fallback to local default image
    return require("@/assets/img/profile.png");
  };

  /**
   * Get user initials for avatar fallback
   */
  const getUserInitials = (): string => {
    if (!user?.name) return "U";
    
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  /**
   * Logs out the current user and navigates to login screen
   */
  const handleLogout = async (): Promise<void> => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              // Navigation is handled by AuthContext
            } catch (error) {
              console.error("❌ Logout error:", error);
              Alert.alert("Error", "No se pudo cerrar sesión. Intenta de nuevo.");
            }
          },
        },
      ]
    );
  };

  /**
   * Navigates to Edit Profile screen
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
            {/* Background circle */}
            <View style={styles.profileBackground} />

            {/* Profile Image */}
            {!imageError ? (
              <Image
                source={getProfileImageSource()}
                style={styles.profileImage}
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            ) : (
              // Fallback: Show initials if image fails to load
              <View style={[styles.profileImage, styles.initialsContainer]}>
                <Text style={styles.initialsText}>{getUserInitials()}</Text>
              </View>
            )}

            {/* Loading indicator */}
            {imageLoading && (
              <View style={styles.imageLoadingOverlay}>
                <ActivityIndicator color="#27AE60" size="small" />
              </View>
            )}

            {/* Decorative stars */}
            <Ionicons name="add" size={20} color="#E8E8E8" style={styles.star1} />
            <Ionicons name="add" size={16} color="#E8E8E8" style={styles.star2} />
            <Ionicons name="add" size={12} color="#E8E8E8" style={styles.star3} />

            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="pencil" size={18} color="#000" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <Text style={styles.name}>{user?.name ?? "Usuario"}</Text>
          {user?.email && <Text style={styles.email}>{user.email}</Text>}
          {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
          
          {/* User Role Badge */}
          <View style={styles.roleBadge}>
            <Ionicons 
              name={user?.role === 'business' ? 'briefcase' : 'person'} 
              size={14} 
              color="#27AE60" 
            />
            <Text style={styles.roleText}>
              {user?.role === 'business' ? 'Negocio' : 'Cliente'}
            </Text>
          </View>
        </View>

        {/* Last Purchase Card */}
        <View style={styles.purchaseCard}>
          <View style={styles.foodImageContainer}>
            <Image
              source={require("@/assets/img/food.png")}
              style={styles.foodImage}
            />
            <Text style={styles.lastPurchaseLabel}>Última compra</Text>
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Comentario:</Text>
            <Text style={styles.commentText}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FFF" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}