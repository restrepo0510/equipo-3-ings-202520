// constants/products.constants.ts

/**
 * Products feature constants
 * Configuration and text content
 */

export const PRODUCTS_TEXT = {
  HEADER: {
    TITLE: 'YUMMI',
  },

  SECTIONS: {
    PRODUCTS_LIST: 'Productos:',
  },

  EMPTY: {
    TITLE: 'No hay productos disponibles',
    SUBTITLE: 'Este restaurante aún no tiene productos publicados',
  },

  LOADING: {
    PRODUCTS: 'Cargando productos...',
  },

  ERRORS: {
    NO_RESTAURANT: 'No se especificó un restaurante',
    NO_TOKEN: 'No hay token de autenticación',
    LOAD_FAILED: 'No se pudieron cargar los productos',
    RESTAURANT_LOAD_FAILED: 'No se pudo cargar la información del restaurante',
    PRODUCT_UNAVAILABLE: 'Producto no disponible',
    PRODUCT_UNAVAILABLE_MESSAGE: 'Este producto no está disponible actualmente',
  },

  BUTTONS: {
    RETRY: 'Reintentar',
    BACK: 'Volver',
  },

  PRODUCT: {
    NOT_AVAILABLE: 'No Disp',
    DEFAULT_DESCRIPTION: 'Detalles del producto...',
  },

  ACCESSIBILITY: {
    BACK_BUTTON: 'Botón de regresar',
    RETRY_BUTTON: 'Reintentar carga',
    FAVORITE_BUTTON: 'Agregar a favoritos',
    PRODUCT_CARD: 'Tarjeta de producto',
  },
} as const;

export const PRODUCTS_ICONS = {
  BACK: 'arrow-back' as const,
  REFRESH: 'refresh' as const,
  RESTAURANT: 'restaurant' as const,
  EMPTY: 'fast-food-outline' as const,
  ERROR: 'alert-circle-outline' as const,
  HEART_FILLED: 'heart' as const,
  HEART_OUTLINE: 'heart-outline' as const,

  SIZE: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 64,
    EXTRA_LARGE: 80,
  },

  COLOR: {
    PRIMARY: '#000',
    SECONDARY: '#7F8C8D',
    SUCCESS: '#27AE60',
    ERROR: '#E74C3C',
    FAVORITE: '#E74C3C',
    DISABLED: '#BDC3C7',
  },
} as const;

export const PRODUCTS_CONFIG = {
  IMAGE: {
    PLACEHOLDER: 'https://via.placeholder.com/150',
    SIZE: 150,
  },

  FORMATTING: {
    LOCALE: 'es-CO',
    CURRENCY_SYMBOL: '$',
  },
} as const; 