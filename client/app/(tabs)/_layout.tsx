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
          animation: 'fade',
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
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="ProductsScreen"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="OrdersScreen"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="OrderSummaryScreen"
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  );
}