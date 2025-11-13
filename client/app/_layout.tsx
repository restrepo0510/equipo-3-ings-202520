// app/_layout.tsx

import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';
import { RestaurantsProvider } from '../context/RestaurantsContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { AlertProvider } from '@/context/AlertProvider';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true); 
/**
 * Navigation Guard Component
 * (Sin cambios en esta función)
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
 * Wraps the entire app with all necessary providers
 * 
 * Provider Hierarchy:
 * 1. AuthProvider - Authentication state
 * 2. AlertProvider - Global alerts/toasts
 * 3. RestaurantsProvider - Restaurant data (NEW)
 * 4. FavoritesProvider - User favorites
 * 5. NavigationGuard - Route protection
 */
export default function RootLayout() {

  // 2. OBTENER LA CLAVE PUBLICABLE DE TU .env
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  // 3. VALIDAR QUE LA CLAVE EXISTA
  if (!publishableKey) {
    console.error('🔴 ¡ERROR CRÍTICO! Falta EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY en el archivo .env de la carpeta /client');
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red', padding: 20, textAlign: 'center' }}>
          Error: La clave publicable de Stripe no está configurada.
        </Text>
      </View>
    );
  }

  // 4. ENVOLVER LA APP CON STRIPEPROVIDER
  return (
    <StripeProvider publishableKey={publishableKey}>
  <AuthProvider>
    <AlertProvider>
      <RestaurantsProvider>
        <FavoritesProvider>
          <NavigationGuard>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#FFFFFF' },
                animation: 'fade',
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
      </RestaurantsProvider>
    </AlertProvider>
  </AuthProvider>
</StripeProvider>
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