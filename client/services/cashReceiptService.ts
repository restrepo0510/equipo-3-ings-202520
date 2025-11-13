// services/cashReceiptService.ts

import { API_URL } from '@/config/api';
import type {
  CashReceipt,
  CreateCashReceiptRequest,
  CashReceiptResponse,
  CashReceiptsListResponse,
  CashReceiptStatus,
} from '@/types/cashReceipt.types';

/**
 * Cash Receipt Service
 * Handles all API communication for cash payment receipts
 */
export class CashReceiptService {
  /**
   * Create a new cash receipt
   * ✅ MEJORADO: Logs detallados para debug
   */
  static async createReceipt(
    data: CreateCashReceiptRequest,
    token: string
  ): Promise<CashReceipt> {
    try {
      console.log('🧾 Creating cash receipt with data:', data);

      const response = await fetch(`${API_URL}/cash-receipts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Backend error:', errorData);
        throw new Error(errorData.message || 'Failed to create receipt');
      }

      const result: CashReceiptResponse = await response.json();
      
      console.log('✅ Receipt created successfully');
      console.log('📦 Backend response:', result.data);
      console.log('💰 Values in response:', {
        unitPrice: result.data.unitPrice,
        subtotal: result.data.subtotal,
        discount: result.data.discount,
        totalAmount: result.data.totalAmount,
        restaurantAddress: result.data.restaurantAddress,
      });

      return result.data;
    } catch (error) {
      console.error('❌ Error creating receipt:', error);
      throw error;
    }
  }

  /**
   * Get user's receipts
   */
  static async getUserReceipts(
    token: string,
    options?: {
      status?: CashReceiptStatus;
      restaurantId?: string;
      limit?: number;
      skip?: number;
    }
  ): Promise<{ receipts: CashReceipt[]; total: number }> {
    try {
      const params = new URLSearchParams();
      
      if (options?.status) params.append('status', options.status);
      if (options?.restaurantId) params.append('restaurantId', options.restaurantId);
      if (options?.limit) params.append('limit', options.limit.toString());
      if (options?.skip) params.append('skip', options.skip.toString());

      const url = `${API_URL}/cash-receipts?${params.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch receipts');
      }

      const result: CashReceiptsListResponse = await response.json();
      
      return {
        receipts: result.data,
        total: result.meta.total,
      };
    } catch (error) {
      console.error('❌ Error fetching receipts:', error);
      throw error;
    }
  }

  /**
   * Get receipt by ID
   */
  static async getReceiptById(
    receiptId: string,
    token: string
  ): Promise<CashReceipt> {
    try {
      const response = await fetch(`${API_URL}/cash-receipts/${receiptId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Receipt not found');
      }

      const result: CashReceiptResponse = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching receipt:', error);
      throw error;
    }
  }

  /**
   * Download receipt PDF
   * Returns the PDF as a blob/data URL
   */
  static async downloadReceiptPDF(
    receiptId: string,
    token: string
  ): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/cash-receipts/${receiptId}/pdf`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      const blob = await response.blob();
      
      // Convert blob to base64 data URL for React Native
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('❌ Error downloading PDF:', error);
      throw error;
    }
  }

  /**
   * Check receipt status by code
   */
  static async checkReceiptStatus(receiptCode: string): Promise<{
    receiptCode: string;
    status: CashReceiptStatus;
    isExpired: boolean;
    canBeValidated: boolean;
    restaurantName: string;
    productName: string;
    totalAmount: number;
    expiresAt: string;
  }> {
    try {
      const response = await fetch(`${API_URL}/cash-receipts/check/${receiptCode}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Receipt not found');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error checking receipt:', error);
      throw error;
    }
  }

  /**
   * Cancel a receipt
   */
  static async cancelReceipt(
    receiptId: string,
    token: string
  ): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/cash-receipts/${receiptId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to cancel receipt');
      }

      console.log('✅ Receipt cancelled');
    } catch (error) {
      console.error('❌ Error cancelling receipt:', error);
      throw error;
    }
  }
}