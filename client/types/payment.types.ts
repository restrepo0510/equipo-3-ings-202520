// types/payment.types.ts

/**
 * Payment method options
 */
export type PaymentMethod = 'efectivo' | 'tarjeta';

/**
 * Payment status
 */
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

/**
 * Payment screen navigation params
 */
export interface PaymentScreenParams {
  /** Order ID or reservation ID */
  orderId: string;
  
  /** Product information */
  productId: string;
  productName: string;
  productImage?: string;
  
  /** Restaurant information */
  restaurantId: string;
  restaurantName: string;
  restaurantAddress?: string;
  restaurantLatitude?: string;
  restaurantLongitude?: string;
  
  /** Pricing */
  quantity: string;
  unitPrice: string;
  subtotal: string;
  discount: string;
  total: string;
  
  /** Delivery information */
  deliveryLatitude?: string;
  deliveryLongitude?: string;
  estimatedDeliveryTime?: string;
}

/**
 * Order summary for payment
 */
export interface PaymentOrderSummary {
  productName: string;
  productImage?: string;
  restaurantName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  total: number;
}

/**
 * ✅ CORREGIDO: Payment intent response from backend
 * Incluye todas las propiedades necesarias para paymentService
 */
export interface PaymentIntentResponse {
  /** Client secret for Stripe payment sheet */
  clientSecret: string;
  
  /** Payment intent ID (opcional) */
  paymentIntentId?: string;
  
  /** Amount in smallest currency unit */
  amount: number;
  
  /** Currency code (e.g., 'cop') */
  currency: string;
  
  /** Status of the payment intent (opcional) */
  status?: string;
}

/**
 * Delivery location
 */
export interface DeliveryLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

/**
 * Payment confirmation request
 */
export interface PaymentConfirmationRequest {
  orderId: string;
  paymentMethod: PaymentMethod;
  paymentIntentId?: string;
  transactionRef?: string;
}

/**
 * Payment confirmation response
 */
export interface PaymentConfirmationResponse {
  success: boolean;
  orderId: string;
  status: PaymentStatus;
  transactionId: string;
  receiptUrl?: string;
  message?: string;
}

/**
 * Payment error
 */
export interface PaymentError {
  code: string;
  message: string;
  declineCode?: string;
  details?: any;
}

/**
 * Type guard to check if payment is successful
 */
export const isPaymentSuccessful = (status: PaymentStatus): boolean => {
  return status === PaymentStatus.COMPLETED;
};

/**
 * Type guard to check if payment is pending
 */
export const isPaymentPending = (status: PaymentStatus): boolean => {
  return status === PaymentStatus.PENDING || status === PaymentStatus.PROCESSING;
};

/**
 * Type guard to check if payment failed
 */
export const isPaymentFailed = (status: PaymentStatus): boolean => {
  return status === PaymentStatus.FAILED;
};