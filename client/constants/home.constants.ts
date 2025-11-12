// constants/homeScreen.constants.ts

import { Dimensions } from 'react-native';

/**
 * Screen dimensions
 */
const { width } = Dimensions.get('window');

/**
 * Grid card width calculation
 * Takes screen width minus margins and divides by 2 for two columns
 */
export const CARD_WIDTH = (width - 48) / 2;

/**
 * Default search radius for nearby restaurants (in kilometers)
 * Increased to 20km to ensure we find restaurants in the area
 */
export const DEFAULT_VALUES = {
  SEARCH_RADIUS_KM: 20, // Aumentado de 10 a 20
  DEFAULT_USER_NAME: 'Usuario',
  GRID_RESTAURANT_COUNT: 2,
  TOP_RESTAURANT_SLICE_START: 2,
} as const;

/**
 * Placeholder images for fallback
 */
export const PLACEHOLDER_IMAGES = {
  RESTAURANT_CARD: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
  RESTAURANT_TOP: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
  RESTAURANT_LIST: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
  RESTAURANT_LOGO: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
} as const;