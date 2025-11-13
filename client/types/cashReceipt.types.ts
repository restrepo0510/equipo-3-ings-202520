// types/cashReceipt.types.ts

/**
 * Cash Receipt Status
 */
export enum CashReceiptStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

/**
 * Cash Receipt Interface
 */
export interface CashReceipt {
  id: string;
  receiptCode: string;
  orderId?: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  totalAmount: number;
  status: CashReceiptStatus;
  expiresAt: string;
  validatedAt?: string;
  validatedBy?: string;
  qrCodeData: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Cash Receipt Request
 * ✅ UPDATED: Agregado restaurantAddress
 */
export interface CreateCashReceiptRequest {
  orderId?: string;
  restaurantId: string;
  restaurantAddress?: string; // ✅ NUEVO
  productId?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount?: number;
  totalAmount: number;
  notes?: string;
}

/**
 * Cash Receipt Response
 */
export interface CashReceiptResponse {
  success: boolean;
  message?: string;
  data: CashReceipt;
}

/**
 * Cash Receipts List Response
 */
export interface CashReceiptsListResponse {
  success: boolean;
  data: CashReceipt[];
  meta: {
    total: number;
    limit: number;
    skip: number;
  };
}

/**
 * Receipt Status Colors
 */
export const RECEIPT_STATUS_COLORS = {
  [CashReceiptStatus.PENDING]: '#F39C12',
  [CashReceiptStatus.VALIDATED]: '#27AE60',
  [CashReceiptStatus.EXPIRED]: '#E74C3C',
  [CashReceiptStatus.CANCELLED]: '#95A5A6',
} as const;

/**
 * Receipt Status Labels
 */
export const RECEIPT_STATUS_LABELS = {
  [CashReceiptStatus.PENDING]: 'Pendiente',
  [CashReceiptStatus.VALIDATED]: 'Validado',
  [CashReceiptStatus.EXPIRED]: 'Expirado',
  [CashReceiptStatus.CANCELLED]: 'Cancelado',
} as const;