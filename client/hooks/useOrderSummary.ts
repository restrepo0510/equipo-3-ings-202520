// hooks/useOrderSummary.ts

import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ReservationAlertService } from '@/services/reservationAlertService';
import { ReservationUtils } from '@/utils/reservation.utils';
import type { OrderSummaryParams } from '@/types/reservation.types';
import { restaurantService } from '@/services/restaurantService';

interface UseOrderSummaryReturn {
  isProcessing: boolean;
  handleCancel: () => void;
  handleProceedToPayment: (
    orderParams: OrderSummaryParams,
    timeLeft: number,
    token: string
  ) => Promise<void>;
}

export const useOrderSummary = (): UseOrderSummaryReturn => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleProceedToPayment = useCallback(
    async (
      orderParams: OrderSummaryParams,
      timeLeft: number,
      token: string
    ): Promise<void> => {
      if (timeLeft <= 0) {
        ReservationAlertService.showExpiredError();
        return;
      }

      setIsProcessing(true);

      try {
        console.log('🔍 Fetching restaurant details...');
        
        const restaurantDetails = await restaurantService.getById(orderParams.restaurantId);
        
        console.log('🏪 Restaurant details:', {
          name: restaurantDetails.name,
          address: restaurantDetails.address,
          latitude: restaurantDetails.latitude,
          longitude: restaurantDetails.longitude,
        });

        // ✅ Calculate totals CORRECTLY
        const totals = ReservationUtils.parseOrderParams(orderParams);
        
        console.log('💰 Calculated totals:', {
          quantity: totals.quantity,
          unitPrice: totals.unitPrice,
          originalPrice: totals.originalPrice,
          subtotal: totals.subtotal,
          discount: totals.discount,
          total: totals.total,
        });
        
        const timeRemaining = ReservationUtils.formatTime(timeLeft);

        console.log('✅ Proceeding to payment with correct values');

        ReservationAlertService.showReservationConfirmed(
          timeRemaining,
          () => {
            // ✅ CRÍTICO: Pasar los valores NUMÉRICOS calculados, no los strings originales
            const paymentParams = {
              orderId: `order_${Date.now()}`,
              
              // Product info
              productId: orderParams.productId,
              productName: orderParams.productName,
              productImage: orderParams.productImage || '',
              
              // Restaurant info
              restaurantId: orderParams.restaurantId,
              restaurantName: restaurantDetails.name,
              restaurantAddress: restaurantDetails.address || '',
              restaurantLatitude: restaurantDetails.latitude.toString(),
              restaurantLongitude: restaurantDetails.longitude.toString(),
              
              // ✅ FIXED: Usar los valores CALCULADOS (numbers) convertidos a strings
              // Esto asegura que los cálculos sean correctos
              quantity: totals.quantity.toString(),
              unitPrice: totals.unitPrice.toString(),
              subtotal: totals.subtotal.toString(),
              discount: totals.discount.toString(),
              total: totals.total.toString(),
              
              // Time remaining
              timeRemaining,
            };

            console.log('🚀 Navigation params:', paymentParams);
            console.log('🔢 Numeric validation:', {
              quantityNum: totals.quantity,
              unitPriceNum: totals.unitPrice,
              subtotalNum: totals.subtotal,
              discountNum: totals.discount,
              totalNum: totals.total,
            });
            

            router.push({
              pathname: '/(tabs)/PaymentScreen',
              params: paymentParams,
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