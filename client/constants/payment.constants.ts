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
  
  /** Default delivery coordinates (fallback - Medellín) */
  DEFAULT_COORDINATES: {
    latitude: 4.6097,
    longitude: -74.0817,
  },
  
  /** Payment amount limits */
  MIN_AMOUNT: 1000, // Minimum 1,000 COP
  MAX_AMOUNT: 100000000, // Maximum 100,000,000 COP
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
    MAP_ERROR: 'Ubicación no disponible',
  },
  
  ORDER: {
    QUANTITY: 'Cantidad',
    UNIT_PRICE: 'Precio unitario',
  },
  
  PRICING: {
    SUBTOTAL: 'SUBTOTAL',
    DISCOUNT: 'DESCUENTO',
    TOTAL: 'TOTAL',
  },
  
  METHODS: {
    CASH: 'EFECTIVO',
    CARD: 'TARJETA',
    CASH_DESCRIPTION: 'Paga en efectivo en el restaurante',
    CARD_DESCRIPTION: 'Paga de forma segura con tarjeta',
  },
  
  BUTTONS: {
    PROCEED: 'PROCEDER CON EL PAGO',
    PROCESSING: 'Procesando...',
  },
  
  MAP: {
    DELIVERY_LOCATION: 'Ubicación de entrega',
    RESTAURANT_LOCATION: 'Ubicación del restaurante',
  },
  
  ALERTS: {
    CASH_TITLE: 'Pago en Efectivo',
    CASH_MESSAGE: 'Se generará un recibo que debes presentar en el restaurante para pagar en efectivo.',
    
    CASH_CONFIRM_TITLE: 'Confirmar Pago en Efectivo',
    CASH_CONFIRM_MESSAGE: (restaurant: string, amount: string) => 
      `Vas a generar un recibo por ${amount} para pagar en:\n\n${restaurant}\n\n¿Deseas continuar?`,
    
    CARD_CONFIRM_TITLE: 'Confirmar Pago con Tarjeta',
    CARD_CONFIRM_MESSAGE: (amount: string) =>
      `Vas a pagar ${amount} con tarjeta.\n\nSerás redirigido a Stripe.\n\n¿Deseas continuar?`,
    
    SUCCESS_TITLE: '¡Éxito!',
    SUCCESS_MESSAGE: 'Tu pago fue procesado correctamente.\n\nRecibirás una confirmación por correo electrónico.',
    
    ERROR_TITLE: 'Error en el Pago',
    ERROR_MESSAGE: 'Ocurrió un error al procesar el pago.\n\nPor favor, intenta nuevamente.',
    
    INVALID_AMOUNT_TITLE: 'Monto Inválido',
    INVALID_AMOUNT_MESSAGE: 'El monto del pago no es válido.\n\nPor favor, verifica e intenta nuevamente.',
    
    NETWORK_ERROR_TITLE: 'Error de Conexión',
    NETWORK_ERROR_MESSAGE: 'No se pudo conectar con el servidor.\n\nVerifica tu conexión a internet.',
    
    STRIPE_INIT_ERROR_TITLE: 'Error de Inicialización',
    STRIPE_INIT_ERROR_MESSAGE: 'No se pudo inicializar el sistema de pagos.\n\nIntenta nuevamente más tarde.',
    
    STRIPE_REDIRECT_TITLE: 'Redirigido desde Stripe',
    STRIPE_REDIRECT_MESSAGE: 'Has regresado a la aplicación.\n\nTu pago está siendo procesado.',
    
    CANCELLED_TITLE: 'Pago Cancelado',
    CANCELLED_MESSAGE: 'Has cancelado el proceso de pago.\n\nTu pedido no ha sido confirmado.',
    
    INSUFFICIENT_DATA_TITLE: 'Datos Incompletos',
    INSUFFICIENT_DATA_MESSAGE: 'Faltan datos requeridos para procesar el pago.\n\nPor favor, vuelve e intenta nuevamente.',
    
    LOCATION_ERROR_TITLE: 'Ubicación No Disponible',
    LOCATION_ERROR_MESSAGE: 'No se pudo obtener la ubicación de entrega.\n\nSe usará la ubicación del restaurante.',
  },
  
  ACCESSIBILITY: {
    BACK: 'Volver',
    SELECT_CASH: 'Seleccionar pago en efectivo',
    SELECT_CARD: 'Seleccionar pago con tarjeta',
    PROCEED: 'Proceder con el pago',
    MAP: 'Mapa de ubicación de entrega',
  },
} as const;

/**
 * Payment Colors
 */
export const PAYMENT_COLORS = {
  PRIMARY: '#1B5E20',
  SUCCESS: '#27AE60',
  ERROR: '#E74C3C',
  WARNING: '#F39C12',
  INFO: '#3498DB',
  
  CASH_METHOD: '#4CAF50',
  CARD_METHOD: '#2C3E50',
  
  DISCOUNT: '#27AE60',
} as const;