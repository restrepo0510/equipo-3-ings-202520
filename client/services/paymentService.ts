// services/paymentService.ts

import { API_URL } from '@/config/api';
import type { PaymentIntentResponse } from '@/types/payment.types';

/**
 * Payment Service
 * Handles API communication for payment processing
 */
export class PaymentService {
  /**
   * Creates a Stripe payment intent
   * 
   * @param amount - Amount in pesos
   * @param currency - Currency code (default: COP)
   * @returns Payment intent with client secret
   * @throws Error if request fails
   */
  static async createPaymentIntent(
    amount: number,
    currency: string = 'cop'
  ): Promise<PaymentIntentResponse> {
    try {
      console.log('💳 Creating payment intent:', { amount, currency });

      const response = await fetch(`${API_URL}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create payment intent');
      }

      const data: PaymentIntentResponse = await response.json();
      console.log('✅ Payment intent created:', data.clientSecret ? 'Success' : 'No secret');

      return data;
    } catch (error) {
      console.error('❌ Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Confirms a cash payment
   * 
   * @param orderId - Order ID
   * @param token - Auth token
   * @returns Confirmation response
   * @throws Error if request fails
   */
  static async confirmCashPayment(
    orderId: string,
    token: string
  ): Promise<void> {
    try {
      console.log('💵 Confirming cash payment for order:', orderId);

      const response = await fetch(`${API_URL}/payments/cash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to confirm cash payment');
      }

      console.log('✅ Cash payment confirmed');
    } catch (error) {
      console.error('❌ Error confirming cash payment:', error);
      throw error;
    }
  }

  /**
   * Gets payment status
   * 
   * @param orderId - Order ID
   * @param token - Auth token
   * @returns Payment status
   * @throws Error if request fails
   */
  static async getPaymentStatus(
    orderId: string,
    token: string
  ): Promise<{ status: string; paid: boolean }> {
    try {
      const response = await fetch(`${API_URL}/payments/${orderId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get payment status');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Error getting payment status:', error);
      throw error;
    }
  }
}