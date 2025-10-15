// app/_layout.tsx

import React, { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments, usePathname } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

/**
 * Navigation Guard Component
 * Handles automatic redirection based on authentication state
 */
function NavigationGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // console.log('🔐 Auth State:', { 
    //   isAuthenticated, 
    //   hasUser: !!user,
    //   currentPath: pathname,
    //   segments: segments.join('/'),
    // });

    const inTabsGroup = segments[0] === '(tabs)';
    
    if (!inTabsGroup) {
      // console.log('⚠️ Not in tabs group, waiting...');
      return;
    }

    const currentScreen = segments[1] || 'index';
    const isAuthScreen = currentScreen === 'LoginScreen' || currentScreen === 'SignUpScreen';

    // User NOT authenticated
    if (!isAuthenticated && !isAuthScreen) {
      // console.log('🔄 Redirecting to Login (not authenticated)');
      router.replace('/(tabs)/LoginScreen');
      setHasNavigated(true);
    } 
    // User IS authenticated but on auth screen
    else if (isAuthenticated && isAuthScreen) {
      // console.log('🔄 Redirecting to Home (already authenticated)');
      router.replace('/(tabs)/HomeScreen');
      setHasNavigated(true);
    }
    // First load - route to correct screen
    else if (!hasNavigated && segments.length <= 1) {
      if (isAuthenticated) {
        // console.log('🏠 Initial navigation to Home');
        router.replace('/(tabs)/HomeScreen');
      } else {
        // console.log('🔑 Initial navigation to Login');
        router.replace('/(tabs)/LoginScreen');
      }
      setHasNavigated(true);
    }
  }, [isAuthenticated, user, segments, isLoading, pathname, hasNavigated]);

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