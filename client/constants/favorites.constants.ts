// constants/favorites.constants.ts

/**
 * Favorites Module Constants
 * Centralizes magic numbers and strings for maintainability
 */

export const FAVORITES_CONSTANTS = {
  LOADING: {
    RETRY_DELAY_MS: 1000,
    MAX_RETRIES: 3,
  },
  UI: {
    CARD_IMAGE_SIZE: 90,
    HEART_ICON_SIZE: 25,
    EMPTY_ICON_SIZE: 80,
    BACK_ICON_SIZE: 24,
  },
} as const;

/**
 * Favorites screen text content
 * Separated for future i18n implementation
 */
export const FAVORITES_TEXT = {
  HEADER: {
    TITLE: 'YUMMI',
    SUBTITLE: 'Favs',
  },
  LOADING: {
    MESSAGE: 'Cargando favoritos...',
  },
  EMPTY: {
    TITLE: 'No hay favoritos',
    SUBTITLE: 'Agrega productos a tus favoritos para verlos aquí',
  },
  PRODUCT: {
    NO_DESCRIPTION: 'Sin descripción',
    NOT_AVAILABLE: 'No Disp',
  },
  ALERTS: {
    ERROR_TITLE: 'Error',
    REMOVE_ERROR: 'No se pudo eliminar de favoritos',
    ADD_ERROR: 'No se pudo agregar a favoritos',
    LOGIN_REQUIRED: 'Debes iniciar sesión para agregar favoritos',
    LOAD_ERROR: 'No se pudieron cargar los favoritos',
  },
  ACCESSIBILITY: {
    BACK_BUTTON: 'Volver',
    REMOVE_FAVORITE: 'Eliminar de favoritos',
    PRODUCT_CARD: 'Tarjeta de producto',
  },
} as const;

/**
 * Icon configuration for favorites
 */
export const FAVORITES_ICONS = {
  BACK: 'arrow-back' as const,
  HEART_FILLED: 'heart' as const,
  HEART_OUTLINE: 'heart-outline' as const,
  RESTAURANT: 'restaurant' as const,
  ALERT: 'alert-circle-outline' as const,
  
  SIZE: {
    SMALL: 20,
    MEDIUM: 24,
    LARGE: 28,
    EXTRA_LARGE: 80,
  },
  
  COLOR: {
    PRIMARY: '#2C3E50',
    SECONDARY: '#7F8C8D',
    HEART: '#FF6B6B',
    SUCCESS: '#27AE60',
    ERROR: '#E74C3C',
    EMPTY: '#BDC3C7',
  },
} as const;

/**
 * API endpoints for favorites
 */
export const FAVORITES_ENDPOINTS = {
  BASE: '/favorites',
  BY_PRODUCT: (productId: string) => `/favorites/${productId}`,
  CHECK: (productId: string) => `/favorites/check/${productId}`,
} as const;