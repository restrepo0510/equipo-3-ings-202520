// constants/map.constants.ts

/**
 * Map Configuration Constants
 * Centralized configuration for map behavior and appearance
 */

/**
 * Map behavior configuration
 */
export const MAP_CONFIG = {
  /** Default search radius for nearby restaurants (km) */
  DEFAULT_SEARCH_RADIUS_KM: 30,
  
  /** Maximum number of restaurants to fetch */
  MAX_RESTAURANTS: 30,
  
  /** Animation duration for map transitions (ms) */
  ANIMATION_DURATION: 500,
  
  /** Initial animation delay (ms) */
  INITIAL_ANIMATION_DELAY: 500,
  
  /** Map zoom levels */
  ZOOM: {
    DEFAULT: {
      LATITUDE_DELTA: 0.05,
      LONGITUDE_DELTA: 0.05,
    },
    FOCUSED: {
      LATITUDE_DELTA: 0.015,
      LONGITUDE_DELTA: 0.015,
    },
    WIDE: {
      LATITUDE_DELTA: 0.1,
      LONGITUDE_DELTA: 0.1,
    },
  },
} as const;

/**
 * Map marker configuration
 */
export const MAP_MARKERS = {
  /** User location marker colors */
  USER: {
    PRIMARY: '#007AFF',
    SECONDARY: 'rgba(0, 122, 255, 0.3)',
  },
  
  /** Restaurant marker colors */
  RESTAURANT: {
    DEFAULT: '#FF6B6B',
    SELECTED: '#27AE60',
  },
  
  /** Marker sizes */
  SIZES: {
    USER_OUTER: 24,
    USER_INNER: 12,
  },
} as const;

/**
 * Restaurant card configuration
 */
export const MAP_CARD = {
  WIDTH: 230,
  IMAGE_SIZE: 70,
  IMAGE_BORDER_RADIUS: 35,
  CARD_BORDER_RADIUS: 20,
  BUTTON_BORDER_RADIUS: 20,
  BOTTOM_OFFSET: 120,
} as const;

/**
 * Map header configuration
 */
export const MAP_HEADER = {
  HEIGHT: 60,
  PADDING_TOP: 50,
  PADDING_HORIZONTAL: 20,
  BORDER_RADIUS: 16,
  ICON_SIZE: {
    BACK: 28,
    CENTER: 24,
  },
} as const;

/**
 * Map text content
 */
export const MAP_TEXT = {
  HEADER: {
    TITLE: 'Lugares cercanos',
  },
  
  LOADING: {
    MESSAGE: 'Cargando restaurantes...',
  },
  
  ERRORS: {
    LOAD_RESTAURANTS_FAILED: 'No se pudieron cargar los restaurantes',
    LOCATION_UNAVAILABLE: 'Ubicación no disponible',
  },
  
  BUTTONS: {
    RETRY: 'Reintentar',
    VIEW_PRODUCTS: 'Ver productos',
  },
  
  MARKERS: {
    USER_LOCATION: 'Tu ubicación',
  },
  
  ACCESSIBILITY: {
    BACK_BUTTON: 'Volver',
    CENTER_BUTTON: 'Centrar en mi ubicación',
    RESTAURANT_MARKER: 'Marcador de restaurante',
  },
} as const;

/**
 * Placeholder URLs
 * ✅ ACTUALIZADO: Sincronizado con el backend
 */
export const MAP_PLACEHOLDERS = {
  /** Default restaurant image (matches backend default) */
  RESTAURANT_IMAGE: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
} as const;

/**
 * ✅ NUEVO: Export individual para compatibilidad
 * @deprecated Use MAP_PLACEHOLDERS.RESTAURANT_IMAGE instead
 */
export const PLACEHOLDER_IMAGE_URL = MAP_PLACEHOLDERS.RESTAURANT_IMAGE;