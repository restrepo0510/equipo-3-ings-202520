// app/(tabs)/_layout.tsx

import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

/**
 * Tab Layout with Stack Navigation
 * Protected routes that require authentication
 */
export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Loading State
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#27AE60" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      {/* Auth Screens - Always accessible */}
      <Stack.Screen 
        name="LoginScreen" 
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen 
        name="SignUpScreen" 
        options={{
          animation: 'slide_from_right',
        }}
      />

      {/* Protected Screens - Always declared but guarded by navigation */}
      <Stack.Screen 
        name="HomeScreen" 
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen 
        name="MapScreen" 
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="FavoritesScreen" 
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="ProfileScreen" 
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="EditProfileScreen" 
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="ProductsScreen" 
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="OrdersScreen" 
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}