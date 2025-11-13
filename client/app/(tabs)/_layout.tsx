// app/(tabs)/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

/**
 * Tab Layout Component
 * Handles navigation stack and authentication-based access control
 */
export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Display loading spinner while authentication state is being determined
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27AE60" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.contentBackground,
      }}
    >
      {/* Public Screens - Accessible without authentication */}
      <Stack.Screen 
        name="LoginScreen" 
        options={{ animation: 'fade' }}
      />
      <Stack.Screen 
        name="SignUpScreen" 
        options={{ animation: 'fade' }}
      />

      {/* Protected Screens - Declared but guarded by navigation logic */}
      <Stack.Screen 
        name="HomeScreen" 
        options={{ animation: 'fade' }}
      />
      <Stack.Screen 
        name="MapScreen" 
        options={{ animation: 'fade' }}
      />
      <Stack.Screen 
        name="FavoritesScreen" 
        options={{ animation: 'fade' }}
      />
      <Stack.Screen 
        name="ProfileScreen" 
        options={{ animation: 'fade' }}
      />
      <Stack.Screen 
        name="EditProfileScreen" 
        options={{ animation: 'fade' }}
      />
      <Stack.Screen 
        name="ProductsScreen" 
        options={{ animation: 'fade' }}
      />
      <Stack.Screen 
        name="OrderSummaryScreen" 
        options={{ animation: 'fade' }}
      />
    </Stack>
  );
}

// ==============================
// Styles
// ==============================
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBackground: {
    backgroundColor: '#FFFFFF',
  },
});
