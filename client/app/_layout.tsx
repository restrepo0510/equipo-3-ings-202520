// app/_layout.tsx

import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { AlertProvider } from '@/context/AlertProvider';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

/**
 * Navigation Guard Component
 * Handles automatic redirection based on authentication state
 */
function NavigationGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === '(tabs)';
    
    if (!inTabsGroup) return;

    const currentScreen = segments[1];
    const isAuthScreen = currentScreen === 'LoginScreen' || currentScreen === 'SignUpScreen';

    console.log('🔍 Navigation Check:', {
      isAuthenticated,
      currentScreen,
      isAuthScreen,
    });

    // Redirect logic
    if (!isAuthenticated && !isAuthScreen) {
      console.log('🔒 Redirecting to Login (not authenticated)');
      router.replace('/(tabs)/LoginScreen');
    } else if (isAuthenticated && (isAuthScreen || !currentScreen)) {
      console.log('✅ Redirecting to Home (already authenticated)');
      router.replace('/(tabs)/HomeScreen');
    }
  }, [isAuthenticated, segments, isLoading, router]);

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27AE60" />
      </View>
    );
  }

  return <>{children}</>;
}

/**
 * Root Layout Component
 * Wraps the entire app with AuthProvider and navigation guard
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <AlertProvider>
        <FavoritesProvider>
          <NavigationGuard>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#FFFFFF' },
              }}
            >
              <Stack.Screen 
                name="(tabs)" 
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </NavigationGuard>
        </FavoritesProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});