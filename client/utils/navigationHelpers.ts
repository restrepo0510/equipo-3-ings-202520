// utils/navigationHelpers.ts

import { NavItem } from '@/components/ui/bottomNavigation';

/**
 * Available screens for navigation
 */
export type NavigationScreen = 'home' | 'map' | 'favorites' | 'reviews' | 'profile';

/**
 * Creates navigation items configuration for a specific screen
 * ✅ CORREGIDO: Ahora incluye el botón de mapa y corrige isActive
 * 
 * @param currentScreen - The current active screen identifier
 * @param router - Expo router instance
 * @returns Array of navigation items
 */
export const createNavItems = (
  currentScreen: NavigationScreen,
  router: any
): NavItem[] => {
  return [
    {
      id: 'home',
      icon: 'home',
      onPress: () => {
        console.log('🏠 Navegando a el inicio');
        router.push('/(tabs)/HomeScreen');
      },
      isActive: currentScreen === 'home',
    },
    {
      id: 'favorites',
      icon: 'heart-outline',
      onPress: () => {
        console.log('❤️ Navegando a favoritos');
        router.push('/(tabs)/FavoritesScreen');
      },
      isActive: currentScreen === 'favorites',
    },
    {
      id: 'reviews',
      icon: 'chatbubbles-outline',
      onPress: () => {
        console.log('💬 Navegando a opiniones');
        router.push('/(tabs)/ReviewsScreen');
      },
      isActive: currentScreen === 'reviews',
    },
    {
      id: 'profile',
      icon: 'person-outline',
      onPress: () => {
        console.log('👤 Navegando al perfil');
        router.push('/(tabs)/ProfileScreen');
      },
      isActive: currentScreen === 'profile',
    },
  ];
};

/**
 * Creates navigation items for business/restaurant screens
 * Only 3 buttons: Home (products), Add, Profile
 */
export const createBusinessNavItems = (
  currentScreen: 'products' | 'add' | 'profile',
  router: any
): NavItem[] => {
  return [
    {
      id: 'add',
      icon: 'add-circle-outline',
      onPress: () => {
        console.log('➕ Navegando a añadir producto');
        router.push('/(tabs)/AddProductScreen');
      },
      isActive: currentScreen === 'add',
    },
    {
      id: 'profile',
      icon: 'person-outline',
      onPress: () => {
        console.log('👤 Navegando al perfil');
        router.push('/(tabs)/BusinessProfileScreen');
      },
      isActive: currentScreen === 'profile',
    },
  ];
};

/**
 * Creates navigation items for home screen
 * ✅ CORREGIDO: Ahora usa 'home' en lugar de 'map'
 * 
 * 4 buttons: Map, Favorites, Reviews, Profile
 * (Home is the main screen, so it's not in the navigation)
 */
export const createHomeNavItems = (
  currentScreen: NavigationScreen,
  router: any
): NavItem[] => {
  return [
    {
      id: 'map',
      icon: 'location',
      onPress: () => {
        console.log('🗺️ Navegando al mapa');
        router.push('/(tabs)/MapScreen');
      },
      isActive: currentScreen === 'map',
    },
    {
      id: 'favorites',
      icon: 'heart-outline',
      onPress: () => {
        console.log('❤️ Navegando a favoritos');
        router.push('/(tabs)/FavoritesScreen');
      },
      isActive: currentScreen === 'favorites',
    },
    {
      id: 'reviews',
      icon: 'chatbubbles-outline',
      onPress: () => {
        console.log('💬 Navegando a opiniones');
        router.push('/(tabs)/ReviewsScreen');
      },
      isActive: currentScreen === 'reviews',
    },
    {
      id: 'profile',
      icon: 'person-outline',
      onPress: () => {
        console.log('👤 Navegando al perfil');
        router.push('/(tabs)/ProfileScreen');
      },
      isActive: currentScreen === 'profile',
    },
  ];
};