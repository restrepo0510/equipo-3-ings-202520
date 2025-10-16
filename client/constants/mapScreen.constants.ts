// constants/mapScreen.constants.ts

/**
 * Map configuration constants
 * Defines default values for map behavior and markers
 */

/**
 * Default search radius for nearby restaurants (in kilometers)
 */
export const DEFAULT_SEARCH_RADIUS_KM = 100;

/**
 * Map region delta values
 * Controls the zoom level of the map
 * Smaller values = more zoomed in
 */
export const MAP_DELTA = {
  LATITUDE: 0.05,
  LONGITUDE: 0.05,
} as const;

/**
 * User location marker dimensions
 */
export const USER_MARKER = {
  OUTER_SIZE: 24,
  INNER_SIZE: 12,
  BORDER_RADIUS_OUTER: 12,
  BORDER_RADIUS_INNER: 6,
  OPACITY: 0.3,
} as const;

/**
 * Restaurant card dimensions
 */
export const RESTAURANT_CARD = {
  WIDTH: 230,
  IMAGE_SIZE: 70,
  IMAGE_BORDER_RADIUS: 35,
  CARD_BORDER_RADIUS: 20,
  BUTTON_BORDER_RADIUS: 20,
} as const;

/**
 * Card positioning
 */
export const CARD_POSITION = {
  BOTTOM_OFFSET: 120,
} as const;

/**
 * Placeholder image URL for restaurants without images
 */
export const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/100';