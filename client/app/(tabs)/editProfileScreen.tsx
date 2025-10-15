// app/(tabs)/edit_profile.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomNavigation, NavItem } from "../../components/ui/BottomNavigation";
import { createNavItems } from '../../utils/navigationHelpers';

export default function EditProfileScreen() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Navigation items configuration for Edit Profile Screen
   */
  const navItems = createNavItems('profile', router);
  
  

  const handleImagePicker = () => {
    console.log('Open image picker');
    // Implementar selector de imagen
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
            MI <Text style={styles.yummi}>YUMMI</Text>
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Edit Profile Title */}
        <Text style={styles.editTitle}>Edit Profile</Text>

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
            
            {/* Folder Button */}
            <TouchableOpacity
              style={styles.folderButton}
              onPress={handleImagePicker}
            >
              <Ionicons name="folder-open" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Inputs */}
        <View style={styles.form}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder=""
              placeholderTextColor="#95A5A6"
            />
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput 
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder=""
              placeholderTextColor="#95A5A6"
              keyboardType="phone-pad"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>e-mail</Text>
            <TextInput 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder=""
              placeholderTextColor="#95A5A6"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder=""
              placeholderTextColor="#95A5A6"
              secureTextEntry
            />
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
    letterSpacing: 1,
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
    marginBottom: 20,
  },
  
  // Edit Profile Title
  editTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
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
  },
  profileBackground: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#2C3E2F",
  },
  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50,
    zIndex: 2,
  },
  
  // Decorative stars
  star1: {
    position: "absolute",
    top: 15,
    right: 10,
    zIndex: 3,
  },
  star2: {
    position: "absolute",
    bottom: 35,
    left: 5,
    zIndex: 3,
  },
  
  // Folder Button
  folderButton: {
    position: "absolute",
    right: -5,
    bottom: 0,
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

  // Form
  form: {
    width: "85%",
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#000",
  },
});