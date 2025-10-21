// styles/authTheme.ts
/**
 * Authentication Theme
 * 
 * Design system constants for authentication screens
 * Colors, typography, spacing, and other design tokens
 */

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Color Palette
 */
export const COLORS = {
  // Primary Colors
  primary: '#556B2F',
  primaryDark: '#004226',
  primaryLight: '#768959',
  
  // Background Colors
  background: '#f2f2f2',
  white: '#ffffff',
  black: '#000000',
  
  // Text Colors
  text: '#222222',
  textLight: '#E8F5E9', 
  textSecondary: '#7F8C8D',
  placeholder: '#999999',
  placeholderLight: '#bbbbbb',
  
  // Status Colors
  error: '#e8c423ff',
  success: '#27AE60',
  warning: '#FDFFD1',
  warningText: '#6b6b3f',
  
  // Border Colors
  border: '#3E400E',
  borderLight: '#E5E7EB',
  separator: '#0C1706',
  
  // Other
  transparent: 'transparent',
} as const;

/**
 * Typography Scale
 */
export const TYPOGRAPHY = {
  title: {
    fontSize: 35,
    fontWeight: '700' as const,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 14,
  },
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
  },
  small: {
    fontSize: 12,
  },
} as const;

/**
 * Spacing Scale
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

/**
 * Border Radius Scale
 */
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 25,
  xxl: 40,
  full: 9999,
} as const;

/**
 * Shadow Styles
 */
export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

/**
 * Screen Dimensions
 */
export const DIMENSIONS = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  
  // Common widths
  cardWidth: SCREEN_WIDTH * 0.9,
  maxCardWidth: 400,
  minCardWidth: 320,
} as const;

/**
 * Animation Durations
 */
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;