// utils/navigationHelpers.ts

import { NavItem } from '../components/ui/BottomNavigation';

/**
 * Creates navigation items configuration for a specific screen
 * @param currentScreen - The current active screen identifier
 * @param router - Expo router instance
 */
export const createNavItems = (
  currentScreen:  'home' |'map' | 'favorites' | 'reviews' | 'profile',
  router: any
): NavItem[] => {
  return [
   
    {
      id: 'map',
      icon: 'location',
      onPress: () => {
        console.log('🗺️ Llendo al mapa');
        router.push('/(tabs)/MapScreen');
      },
      isActive: currentScreen === 'map',
    },
    {
      id: 'favorites',
      icon: 'heart-outline',
      onPress: () => {
        console.log('❤️ Llendo a favoritos');
        router.push('/(tabs)/FavoritesScreen');
      },
      isActive: currentScreen === 'favorites',
    },
     {
      id: 'reviews',
      icon: 'chatbubbles-outline',
      onPress: () => {
        console.log('💬 Llendo a las opiniones');
        router.push('/(tabs)/ReviewsScreen');
      },
      isActive: currentScreen === 'reviews',
    },
    {
      id: 'profile',
      icon: 'person',
      onPress: () => {
        console.log('👤 Llendo al perfil');
        router.push('/(tabs)/ProfileScreen');
      },
      isActive: currentScreen === 'profile',
    },
  ];
};