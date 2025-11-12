// constants/payment.constants.ts

/**
 * Payment Configuration Constants
 */
export const PAYMENT_CONFIG = {
  /** Stripe configuration */
  STRIPE_REDIRECT_URL: 'client://stripe-redirect',
  CURRENCY: 'cop',
  
  /** Map configuration */
  MAP_DELTA: 0.01,
  
  /** Default delivery time in minutes */
  DEFAULT_DELIVERY_TIME: '40min',
  
  /** Default delivery coordinates (fallback) */
  DEFAULT_COORDINATES: {
    latitude: 4.6097,
    longitude: -74.0817,
  },
} as const;

/**
 * Payment Text Content
 */
export const PAYMENT_TEXT = {
  HEADER: {
    TITLE: 'Pago',
  },
  
  DELIVERY: {
    ESTIMATED_LABEL: 'Entrega Estimada',
  },
  
  ORDER: {
    QUANTITY: 'Cantidad',
  },
  
  PRICING: {
    SUBTOTAL: 'SUBTOTAL',
    DISCOUNT: 'DESCUENTO',
    TOTAL: 'TOTAL',
  },
  
  METHODS: {
    CASH: 'EFECTIVO',
    CARD: 'TARJETA',
  },
  
  BUTTONS: {
    PROCEED: 'PROCEDER CON EL PAGO',
  },
  
  MAP: {
    DELIVERY_LOCATION: 'Ubicación de entrega',
  },
  
  ALERTS: {
    CASH_TITLE: 'Pago en Efectivo',
    CASH_MESSAGE: 'Tu pedido será pagado en efectivo al momento de la entrega',
    
    SUCCESS_TITLE: '¡Éxito!',
    SUCCESS_MESSAGE: 'Tu pago fue procesado correctamente',
    
    ERROR_TITLE: 'Error',
    ERROR_MESSAGE: 'Ocurrió un error al procesar el pago',
    
    STRIPE_REDIRECT_TITLE: 'Redirigido desde Stripe',
    STRIPE_REDIRECT_MESSAGE: 'Has vuelto a la aplicación',
  },
  
  ACCESSIBILITY: {
    BACK: 'Volver',
    SELECT_CASH: 'Seleccionar pago en efectivo',
    SELECT_CARD: 'Seleccionar pago con tarjeta',
    PROCEED: 'Proceder con el pago',
  },
} as const;