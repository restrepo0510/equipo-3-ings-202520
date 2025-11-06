// constants/reviews.constants.ts

/**
 * Reviews Module Constants
 * Centralizes magic numbers and strings for maintainability
 */

export const REVIEWS_CONSTANTS = {
  RATING: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 0,
  },
  LOCATION: {
    DEFAULT_RADIUS_KM: 5,
  },
  UI: {
    MAX_DROPDOWN_HEIGHT: 250,
    STAR_SIZE: 32,
    STAR_SIZE_SMALL: 20,
    STAR_SIZE_MEDIUM: 18,
    PRODUCT_IMAGE_SIZE: 60,
    REVIEW_CARD_IMAGE_SIZE: 50,
    ICON_SIZE: 24,
    ICON_SIZE_SMALL: 20,
    MAX_RANDOM_REVIEWS: 10,
    DEFAULT_VISIBLE_REVIEWS: 4,
  },
  VALIDATION: {
    MIN_REVIEW_LENGTH: 1,
    MAX_REVIEW_LENGTH: 500,
  },
} as const;

/**
 * Reviews screen text content
 * Separated for future i18n implementation
 */
export const REVIEWS_TEXT = {
  HEADER: {
    TITLE: 'YUMMI',
    SUBTITLE: 'Opiniones',
  },
  ADD_REVIEW: {
    SELECT_RESTAURANT: 'Selecciona un restaurante',
    SELECT_PRODUCT: 'Selecciona un producto',
    RATE_AND_REVIEW: 'Puntúa y opina',
    WRITE_REVIEW: 'Escribe tu reseña...',
    RESTAURANT_PLACEHOLDER: 'Seleccione un restaurante',
    PRODUCT_PLACEHOLDER: 'Seleccione un producto',
  },
  READ_REVIEW: {
    ANONYMOUS_USER: 'Usuario Anónimo',
    NO_COMMENT: 'Sin comentario disponible.',
    VISIT_RESTAURANT: 'Ver restaurante',
    PRODUCT_DETAILS: 'Detalles del producto...',
  },
  LIST: {
    SELECT_RESTAURANT: 'Seleccione un Restaurante',
    WRITE_OPINION: 'Escribir opinión ...',
    VIEW_REVIEW: 'Ver reseña',
    NO_REVIEWS: 'No hay opiniones disponibles.',
    NO_RESTAURANT_REVIEWS: 'No hay opiniones para este restaurante aún.',
  },
  EMPTY: {
    NO_RESTAURANTS: 'No hay restaurantes cercanos',
    NO_PRODUCTS: 'No hay productos disponibles',
    NO_RESTAURANTS_AVAILABLE: 'No hay restaurantes disponibles',
  },
  ALERTS: {
    ERROR_TITLE: 'Error',
    WARNING_TITLE: 'Atención',
    SUCCESS_TITLE: '¡Reseña enviada!',
    SUCCESS_MESSAGE: 'Tu opinión ha sido publicada correctamente',
    ERROR_LOAD_RESTAURANTS: 'No se pudieron cargar los restaurantes cercanos',
    ERROR_LOAD_PRODUCTS: 'No se pudieron cargar los productos del restaurante',
    ERROR_SUBMIT: 'No se pudo enviar la reseña. Intenta de nuevo',
    SELECT_RESTAURANT: 'Selecciona un restaurante',
    SELECT_PRODUCT: 'Selecciona un producto',
    SELECT_RATING: 'Selecciona una calificación',
    WRITE_OPINION: 'Escribe tu opinión',
    LOGIN_REQUIRED: 'Debes iniciar sesión para enviar una reseña',
  },
  ACCESSIBILITY: {
    BACK_BUTTON: 'Volver',
    STAR_RATING: 'Calificación de estrellas',
    SELECT_RESTAURANT: 'Seleccionar restaurante',
    SELECT_PRODUCT: 'Seleccionar producto',
    SUBMIT_REVIEW: 'Enviar reseña',
    VIEW_REVIEW: 'Ver reseña completa',
  },
} as const;

/**
 * Icon configuration for reviews
 */
export const REVIEWS_ICONS = {
  BACK: 'arrow-back' as const,
  STAR_FILLED: 'star' as const,
  STAR_OUTLINE: 'star-outline' as const,
  SEND: 'send' as const,
  CHEVRON_UP: 'chevron-up' as const,
  CHEVRON_DOWN: 'chevron-down' as const,
  
  SIZE: {
    SMALL: 18,
    MEDIUM: 20,
    LARGE: 24,
    STAR: 32,
    STAR_SMALL: 20,
  },
  
  COLOR: {
    PRIMARY: '#000',
    SECONDARY: '#333',
    WHITE: '#FFF',
    STAR: '#000',
    SUCCESS: '#27AE60',
  },
} as const;

/**
 * API endpoints for reviews
 */
export const REVIEWS_ENDPOINTS = {
  BASE: '/reviews',
  BY_RESTAURANT: (restaurantId: string) => `/reviews/restaurant/${restaurantId}`,
  BY_USER: '/reviews/user',
  DELETE: (reviewId: string) => `/reviews/${reviewId}`,
} as const;