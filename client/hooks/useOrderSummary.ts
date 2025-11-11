// hooks/useOrderSummary.ts

import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ReservationApiService } from '@/services/reservationService';
import { ReservationAlertService } from '@/services/reservationAlertService';
import { ReservationUtils } from '@/utils/reservation.utils';
import type { OrderSummaryParams } from '@/types/reservation.types';

/**
 * Hook return type
 */
interface UseOrderSummaryReturn {
  isProcessing: boolean;
  handleCancel: () => void;
  handleProceedToPayment: (
    params: OrderSummaryParams,
    timeLeft: number,
    token: string
  ) => Promise<void>;
}

/**
 * useOrderSummary Hook
 * 
 * Manages order summary operations
 * Handles payment processing and cancellation
 * 
 * @returns Order summary operations
 */
export const useOrderSummary = (): UseOrderSummaryReturn => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handle cancel reservation
   */
  const handleCancel = useCallback((): void => {
    ReservationAlertService.showCancelConfirmation(() => {
      router.back();
    });
  }, [router]);

  /**
   * Handle proceed to payment
   */
  const handleProceedToPayment = useCallback(async (
    params: OrderSummaryParams,
    timeLeft: number,
    token: string
  ): Promise<void> => {
    if (ReservationUtils.isTimeExpired(timeLeft)) {
      ReservationAlertService.showExpiredError();
      return;
    }

    try {
      setIsProcessing(true);

      // Create reservation in backend
      // await ReservationApiService.createReservation({
      //   productId: params.productId,
      //   quantity: parseInt(params.quantity),
      // }, token);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show confirmation
      ReservationAlertService.showReservationConfirmed(
        ReservationUtils.formatTime(timeLeft),
        () => {
          // Navigate to payment gateway (coming soon)
          ReservationAlertService.showComingSoon(() => {
            router.push('/(tabs)/HomeScreen');
          });
        }
      );
    } catch (error) {
      console.error('Error processing reservation:', error);
      ReservationAlertService.showProcessingError();
    } finally {
      setIsProcessing(false);
    }
  }, [router]);

  return {
    isProcessing,
    handleCancel,
    handleProceedToPayment,
  };
};