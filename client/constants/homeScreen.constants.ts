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
 * Default values for the screen
 */
export const DEFAULT_VALUES = {
  SEARCH_RADIUS_KM: 10,
  DEFAULT_USER_NAME: 'Usuario',
  GRID_RESTAURANT_COUNT: 2,
  TOP_RESTAURANT_SLICE_START: 2,
} as const;

/**
 * Placeholder images for fallback
 */
export const PLACEHOLDER_IMAGES = {
  RESTAURANT_CARD: 'https://via.placeholder.com/200',
  RESTAURANT_TOP: 'https://via.placeholder.com/400x200',
  RESTAURANT_LIST: 'https://via.placeholder.com/100',
} as const;