// app/_layout.tsx

import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

/**
 * Root Layout
 * 
 * Wraps the entire app with AuthProvider
 * This makes authentication state available everywhere
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </AuthProvider>
  );
}