// utils/navigationHelpers.ts

import { NavItem } from '../components/ui/BottomNavigation';

/**
 * Creates navigation items configuration for a specific screen
 * @param currentScreen - The current active screen identifier
 * @param router - Expo router instance
 */
export const createNavItems = (
  currentScreen: 'home' | 'map' | 'favorites' | 'chat' | 'profile',
  router: any
): NavItem[] => {
  return [
    {
      id: 'home',
      icon: 'home-outline',
      onPress: () => router.push('/(tabs)/HomeScreen'),
      isActive: currentScreen === 'home',
    },
    {
      id: 'favorites',
      icon: 'heart-outline',
      onPress: () => router.push('/(tabs)/FavoritesScreen'),
      isActive: currentScreen === 'favorites',
    },
    {
      id: 'chat',
      icon: 'chatbubble-outline',
      onPress: () => router.push('/(tabs)/chat'),
      isActive: currentScreen === 'chat',
    },
    {
      id: 'profile',
      icon: 'person',
      onPress: () => router.push('/(tabs)/ProfileScreen'),
      isActive: currentScreen === 'profile',
    },
  ];
};

// ============================================================
// USAGE EXAMPLES - Replace navigation items in your screens
// ============================================================

/*
// In HomeScreen.tsx:
import { createNavItems } from '../../utils/navigationHelpers';

export default function HomeScreen() {
  const router = useRouter();
  const navItems = createNavItems('home', router);
  
  return (
    <View style={styles.container}>
      // ... your content
      <BottomNavigation items={navItems} />
    </View>
  );
}

// In MapScreen.tsx:
import { createNavItems } from '../../utils/navigationHelpers';

export default function MapScreen() {
  const router = useRouter();
  const navItems = createNavItems('map', router);
  
  return (
    <View style={styles.container}>
      // ... your content
      <BottomNavigation items={navItems} />
    </View>
  );
}

// In ProfileScreen.tsx:
import { createNavItems } from '../../utils/navigationHelpers';

export default function ProfileScreen() {
  const router = useRouter();
  const navItems = createNavItems('profile', router);
  
  return (
    <View style={styles.container}>
      // ... your content
      <BottomNavigation items={navItems} />
    </View>
  );
}

// In EditProfileScreen.tsx:
import { createNavItems } from '../../utils/navigationHelpers';

export default function EditProfileScreen() {
  const router = useRouter();
  const navItems = createNavItems('profile', router); // profile stays active
  
  return (
    <View style={styles.container}>
      // ... your content
      <BottomNavigation items={navItems} />
    </View>
  );
}
*/