import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation } from "../../components/ui/BottomNavigation";
import { createNavItems } from "../../utils/navigationHelpers";
import { useAuth } from "@/context/AuthContext";
import { editProfileStyles as styles } from "../../styles/EditProfileScreen.styles";
import type { User } from "@/types/auth.types";

/**
 * EditProfileScreen
 * 
 * Screen that allows the authenticated user to edit their profile information.
 * Supports updating local user data stored in the AuthContext.
 */
export default function EditProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    password: "",
  });

  const navItems = createNavItems("profile", router);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  /**
   * Opens image picker (to be implemented with Expo Image Picker)
   */
  const handleImagePicker = (): void => {
    console.log("🖼️ Open image picker");
    // TODO: Implement image picker
  };

  /**
   * Updates a single field in the form
   */
  const handleInputChange = (field: keyof typeof formData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Validates form input before saving
   */
  const validateForm = (): boolean => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert("Missing fields", "Name and email are required.");
      return false;
    }
    return true;
  };

  /**
   * Saves updated user data using the AuthContext
   */
  const handleSaveProfile = async (): Promise<void> => {
    if (!validateForm() || !user) return;

    try {
      const updatedUser: User = {
        ...user,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        ...(formData.password ? { password: formData.password } : {}),
      };

      await updateUser(updatedUser);

      Alert.alert("Success", "Profile updated successfully.");
      console.log("✅ Updated user:", updatedUser);
      router.back();
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      Alert.alert("Error", "Could not update profile. Please try again.");
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
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
            MI <Text style={styles.yummi}>YUMMI</Text>
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Title */}
        <Text style={styles.editTitle}>Edit Profile</Text>

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

            {/* Folder Button */}
            <TouchableOpacity
              style={styles.folderButton}
              onPress={handleImagePicker}
            >
              <Ionicons name="folder-open" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {[
            { label: "Name", field: "name", keyboard: "default" },
            { label: "Phone number", field: "phone", keyboard: "phone-pad" },
            { label: "e-mail", field: "email", keyboard: "email-address" },
            { label: "Password", field: "password", keyboard: "default", secure: true },
          ].map(({ label, field, keyboard, secure }) => (
            <View key={field} style={styles.inputGroup}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                value={formData[field as keyof typeof formData]}
                onChangeText={(value) => handleInputChange(field as keyof typeof formData, value)}
                placeholder=""
                placeholderTextColor="#95A5A6"
                keyboardType={keyboard as any}
                secureTextEntry={secure}
                autoCapitalize="none"
              />
            </View>
          ))}

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}
