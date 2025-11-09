// constants/reservations.constants.ts

import { ReservationStatus } from '@/types/reservation.types'; // ✅ AGREGAR IMPORT

/**
 * Reservation time constants
 */
export const RESERVATION_TIME = {
  DURATION_SECONDS: 300,
  DURATION_MS: 5 * 60 * 1000,
  WARNING_THRESHOLD: 180,
  DANGER_THRESHOLD: 60,
} as const;

/**
 * Timer colors based on time remaining
 */
export const TIMER_COLORS = {
  SAFE: '#27AE60',
  WARNING: '#F39C12',
  DANGER: '#E74C3C',
} as const;

/**
 * Reservation API endpoints
 */
export const RESERVATION_ENDPOINTS = {
  BASE: '/reservations',
  MY_RESERVATIONS: '/reservations/my-reservations',
  BY_ID: (id: string) => `/reservations/${id}`,
  CONFIRM: (id: string) => `/reservations/${id}/confirm`,
  CANCEL: (id: string) => `/reservations/${id}`,
} as const;

/**
 * Reservation text content
 */
export const RESERVATION_TEXT = {
  HEADER: {
    TITLE: 'Resumen de Pedido',
  },
  TIMER: {
    LABEL: 'Tiempo restante de reserva',
  },
  SECTIONS: {
    RESTAURANT: 'Restaurante',
    ORDER_DETAIL: 'Detalle del Pedido',
  },
  PRICE_LABELS: {
    SUBTOTAL: 'Subtotal',
    DISCOUNT: 'Descuento',
    TOTAL: 'Total a pagar',
    QUANTITY: 'Cantidad',
    UNIT_PRICE: 'c/u',
  },
  NOTES: {
    TITLE: 'Notas importantes',
    TIME_LIMIT: 'Esta reserva es válida por 5 minutos',
    PAYMENT_REQUIRED: 'Debes completar el pago para confirmar tu pedido',
    PICKUP: (restaurantName: string) => `Recoge tu pedido en ${restaurantName}`,
  },
  BUTTONS: {
    CANCEL: 'Cancelar',
    PAY: 'Proceder al pago',
  },
  ALERTS: {
    TIME_EXPIRED_TITLE: 'Tiempo expirado',
    TIME_EXPIRED_MESSAGE: 'Tu reserva ha expirado. Por favor, vuelve a intentarlo.',
    CANCEL_TITLE: 'Cancelar reserva',
    CANCEL_MESSAGE: '¿Estás seguro de que deseas cancelar esta reserva?',
    CANCEL_NO: 'No',
    CANCEL_YES: 'Sí, cancelar',
    CONFIRM_TITLE: '¡Reserva confirmada!',
    CONFIRM_MESSAGE: (timeLeft: string) => 
      `Tienes ${timeLeft} para completar el pago.\n\nAhora serás redirigido a la pasarela de pagos.`,
    CONFIRM_BUTTON: 'Continuar al pago',
    COMING_SOON_TITLE: 'Próximamente',
    COMING_SOON_MESSAGE: 'La integración con la pasarela de pagos estará disponible pronto.',
    ERROR_TITLE: 'Error',
    ERROR_MESSAGE: 'No se pudo procesar la reserva. Intenta nuevamente.',
    ERROR_EXPIRED: 'Tu reserva ha expirado',
  },
} as const;

/**
 * Reservation status display
 */
export const RESERVATION_STATUS_DISPLAY = {
  [ReservationStatus.PENDING]: 'Pendiente',
  [ReservationStatus.CONFIRMED]: 'Confirmada',
  [ReservationStatus.EXPIRED]: 'Expirada',
  [ReservationStatus.CANCELLED]: 'Cancelada',
} as const;

/**
 * Currency format
 */
export const CURRENCY_CONFIG = {
  LOCALE: 'es-CO',
  CURRENCY: 'COP',
  SYMBOL: '$',
} as const;