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
 * (¡AQUÍ ESTÁ LA CORRECCIÓN!)
 */
function NavigationGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      console.log('Auth: Cargando estado...');
      return; // Espera a que termine de cargar
    }

    // Mover estas definiciones aquí arriba
    const currentScreen = segments[1]; // Puede ser 'LoginScreen', 'HomeScreen', o undefined
    const isAuthScreen = currentScreen === 'LoginScreen' || currentScreen === 'SignUpScreen';

    console.log('🔍 Navigation Check:', {
      isAuthenticated,
      segments,
      isAuthScreen,
    });

    // --- LÓGICA CORREGIDA ---
    
    // 1. Si el usuario NO está autenticado
    if (!isAuthenticated) {
      // Y no está ya en una pantalla de auth, mándalo a Login.
      if (!isAuthScreen) {
        console.log('🔒 Redirigiendo a Login (no autenticado)');
        router.replace('/(tabs)/LoginScreen');
      }
      // Si no está autenticado Y SÍ está en 'LoginScreen', no hace nada y lo deja ahí.
    } 
    // 2. Si el usuario SÍ está autenticado
    else {
      // Y está en una pantalla de Auth (Login/Signup) O en la raíz (segments.length === 0)
      if (isAuthScreen || segments.length === 0) {
        console.log('✅ Redirigiendo a Home (autenticado)');
        router.replace('/(tabs)/HomeScreen');
      }
      // Si está autenticado y NO está en una pantalla de auth (ej. en 'HomeScreen'),
      // no hace nada y lo deja donde está.
    }
    // --- FIN DE LA CORRECCIÓN ---

  }, [isAuthenticated, segments, isLoading, router]);

  // Muestra un loader mientras se decide la ruta
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27AE60" />
      </View>
    );
  }

  // Muestra los hijos (la app) solo cuando ya no está cargando
  return <>{children}</>;
}


/**
 * Root Layout Component
 * (El resto de tu archivo está perfecto, lo dejamos igual)
 */
export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

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