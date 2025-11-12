// types/reservation.types.ts

/**
 * Reservation status enum
 */
export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

/**
 * Base reservation entity
 */
export interface Reservation {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  total: number;
  status: ReservationStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  product?: ReservationProduct;
  user?: ReservationUser;
}

/**
 * Product information in reservation
 */
export interface ReservationProduct {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  originalPrice?: number;
  restaurant?: ReservationRestaurant;
}

/**
 * Restaurant information in reservation
 */
export interface ReservationRestaurant {
  id: string;
  name: string;
  address?: string;
}

/**
 * User information in reservation
 */
export interface ReservationUser {
  id: string;
  name: string;
  email: string;
}

/**
 * DTO for creating a reservation
 */
export interface CreateReservationDto {
  productId: string;
  quantity: number;
}

/**
 * Order summary params from navigation
 */
export interface OrderSummaryParams {
  productId: string;
  productName: string;
  productImage?: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress?: string;
  quantity: string;
  price: string;
  originalPrice?: string;
  restaurantLatitude?: string;
  restaurantLongitude?: string;
}

/**
 * Calculated order totals
 */
export interface OrderTotals {
  quantity: number;
  unitPrice: number;
  originalPrice: number | null;
  subtotal: number;
  discount: number;
  total: number;
}

/**
 * Timer state
 */
export interface TimerState {
  timeLeft: number;
  isExpired: boolean;
  timerColor: string;
}

/**
 * API Error for reservations
 */
export interface ReservationApiError {
  message: string;
  statusCode?: number;
  errors?: string[];
}

/**
 * Type guard: Check if reservation is pending
 */
export const isPendingReservation = (reservation: Reservation): boolean => {
  return reservation.status === ReservationStatus.PENDING;
};

/**
 * Type guard: Check if reservation is expired
 */
export const isExpiredReservation = (reservation: Reservation): boolean => {
  return reservation.status === ReservationStatus.EXPIRED || 
         new Date() > new Date(reservation.expiresAt);
};

/**
 * Type guard: Check if reservation is confirmed
 */
export const isConfirmedReservation = (reservation: Reservation): boolean => {
  return reservation.status === ReservationStatus.CONFIRMED;
};