// app/(tabs)/FavoritesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BottomNavigation } from '../../components/ui/BottomNavigation';
import { createNavItems } from '../../utils/navigationHelpers';

export default function FavoritesScreen() {
  const router = useRouter();
  const navItems = createNavItems('favorites', router);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>❤️ Favoritos</Text>
        <Text style={styles.subtitle}>Próximamente...</Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 100, // Space for bottom nav
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
  },
});