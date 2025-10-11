// components/ui/BottomNavigation.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Navigation item configuration
 */
export type NavItem = {
  /** Unique identifier for the nav item */
  id: string;
  /** Icon name from Ionicons */
  icon: keyof typeof Ionicons.glyphMap;
  /** Callback when item is pressed */
  onPress: () => void;
  /** Whether this item is currently active */
  isActive?: boolean;
};

/**
 * Props for BottomNavigation component
 */
interface BottomNavigationProps {
  /** Array of navigation items to display */
  items: NavItem[];
  /** Custom background color (optional) */
  backgroundColor?: string;
  /** Custom active icon color (optional) */
  activeColor?: string;
  /** Custom inactive icon color (optional) */
  inactiveColor?: string;
}

/**
 * BottomNavigation Component
 * 
 * Reusable bottom navigation bar with floating design and shadow.
 * Displays icons that can be configured and handles navigation actions.
 * 
 * @example
 * ```tsx
 * const navItems: NavItem[] = [
 *   { id: 'home', icon: 'location', onPress: () => navigate('Home') },
 *   { id: 'favorites', icon: 'heart-outline', onPress: () => navigate('Favorites') },
 * ];
 * 
 * <BottomNavigation items={navItems} />
 * ```
 */
export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  backgroundColor = '#1B3A2F',
  activeColor = '#27AE60',
  inactiveColor = '#FFFFFF',
}) => {
  return (
    <View style={[styles.bottomNav, { backgroundColor }]}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.navItem}
          onPress={item.onPress}
          accessibilityRole="button"
          accessibilityLabel={`Navigate to ${item.id}`}
        >
          <Ionicons
            name={item.icon}
            size={28}
            color={item.isActive ? activeColor : inactiveColor}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    padding: 8,
  },
});