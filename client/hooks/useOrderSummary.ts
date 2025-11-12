// hooks/useOrderSummary.ts

import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ReservationAlertService } from '@/services/reservationAlertService';
import { ReservationUtils } from '@/utils/reservation.utils';
import type { OrderSummaryParams } from '@/types/reservation.types';
import {restaurantService} from '@/services/restaurantService';

/**
 * Hook return type
 */
interface UseOrderSummaryReturn {
  isProcessing: boolean;
  handleCancel: () => void;
  handleProceedToPayment: (
    orderParams: OrderSummaryParams,
    timeLeft: number,
    token: string
  ) => Promise<void>;
}

/**
 * useOrderSummary Hook
 * 
 * Manages order summary actions (cancel, proceed to payment)
 * Handles navigation and confirmation dialogs
 * 
 * @returns Order summary actions and state
 */
export const useOrderSummary = (): UseOrderSummaryReturn => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handles cancellation of reservation
   * Shows confirmation dialog before canceling
   */
  const handleCancel = useCallback((): void => {
    ReservationAlertService.showCancelConfirmation(
      () => {
        console.log('❌ Reservation cancelled by user');
        router.back();
      },
      () => {
        console.log('ℹ️ Cancel dismissed');
      }
    );
  }, [router]);

  /**
   * Handles proceeding to payment
   * Validates time remaining and navigates to payment screen
   */
  const handleProceedToPayment = useCallback(
    async (
      orderParams: OrderSummaryParams,
      timeLeft: number,
      token: string
    ): Promise<void> => {
      // Validate time remaining
      if (timeLeft <= 0) {
        ReservationAlertService.showExpiredError();
        return;
      }

      setIsProcessing(true);

      try {
        const restaurantDetails = await restaurantService.getById(orderParams.restaurantId);
        // Calculate totals
        const totals = ReservationUtils.parseOrderParams(orderParams);
        
        // Format time remaining
        const timeRemaining = ReservationUtils.formatTime(timeLeft);

        console.log('✅ Proceeding to payment:', {
          product: orderParams.productName,
          total: totals.total,
          timeLeft: timeRemaining,
        });

        // Show confirmation alert
        ReservationAlertService.showReservationConfirmed(
          timeRemaining,
          () => {
            // Navigate to payment screen with all order data
            router.push({
              pathname: '/(tabs)/PaymentScreen',
              params: {
                // Generate order ID (you might want to get this from backend)
                orderId: `order_${Date.now()}`,
                
                // Product info
                productId: orderParams.productId,
                productName: orderParams.productName,
                productImage: orderParams.productImage || '',
                
                // Restaurant info
                restaurantId: orderParams.restaurantId,
                restaurantName: orderParams.restaurantName,
                restaurantAddress: orderParams.restaurantAddress || '',
                restaurantLatitude: restaurantDetails.latitude.toString(), // ✅ AÑADIR
                restaurantLongitude: restaurantDetails.longitude.toString(), // ✅ AÑADIR
                // Pricing
                quantity: orderParams.quantity,
                unitPrice: orderParams.price,
                subtotal: totals.subtotal.toString(),
                discount: totals.discount.toString(),
                total: totals.total.toString(),
                
                // Time remaining
                timeRemaining,
              },
            });
          }
        );
      } catch (error) {
        console.error('❌ Error proceeding to payment:', error);
        ReservationAlertService.showProcessingError();
      } finally {
        setIsProcessing(false);
      }
    },
    [router]
  );

  return {
    isProcessing,
    handleCancel,
    handleProceedToPayment,
  };
};