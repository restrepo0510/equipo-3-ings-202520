// app/(tabs)/PaymentScreen.tsx - Updated with Cash Receipt Integration

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// Services and utils
import { PaymentService } from '@/services/paymentService';
import { CashReceiptService } from '@/services/cashReceiptService';
import { PaymentUtils } from '@/utils/payment.utils';
import { PaymentAlertService } from '@/services/paymentAlertService';
import { useAuth } from '@/context/AuthContext';

// Components
import {
  PaymentHeader,
  DeliveryMap,
  DeliveryInfo,
  OrderSummary,
  PriceBreakdown,
  PaymentMethodSelector,
  PaymentButton,
} from '@/components/ui/payment/paymentComponents';
import { CashReceiptModal } from '@/components/ui/payment/cashReceiptModal';

// Types and constants
import { PAYMENT_CONFIG, PAYMENT_TEXT } from '@/constants/payment.constants';
import { styles } from '@/styles/paymentScreen.styles';
import type { PaymentMethod } from '@/types/payment.types';
import type { CashReceipt } from '@/types/cashReceipt.types';

/**
 * PaymentScreen Component
 * 
 * Enhanced with cash receipt generation
 * 
 * @features
 * - Card payment via Stripe
 * - Cash payment with receipt generation
 * - QR code for easy validation
 * - PDF receipt download
 */
export default function PaymentScreen(): React.ReactElement {
  // ============================================================================
  // Hooks & Router
  // ============================================================================
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // ============================================================================
  // Parse and Validate Order Data
  // ============================================================================

  const orderData = useMemo(() => {
    try {
      const validatedParams = PaymentUtils.validateAndConvertParams(params);
      return PaymentUtils.parsePaymentParams(validatedParams);
    } catch (error) {
      console.error('❌ Error parsing payment params:', error);
      PaymentAlertService.showError(
        'Error',
        'Datos de pago inválidos. Por favor, intenta nuevamente.'
      );
      router.back();
      return {
        productName: '',
        quantity: 1,
        subtotal: 0,
        discount: 0,
        total: 0,
        restaurantName: '',
        deliveryLocation: PAYMENT_CONFIG.DEFAULT_COORDINATES,
      };
    }
  }, [params, router]);

  // ============================================================================
  // State Management
  // ============================================================================

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('efectivo');
  
  // ✅ NEW: Cash receipt state
  const [cashReceipt, setCashReceipt] = useState<CashReceipt | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);

  // ============================================================================
  // Validation
  // ============================================================================

  useEffect(() => {
    if (!PaymentUtils.isValidAmount(orderData.total)) {
      PaymentAlertService.showInvalidAmount();
      router.back();
    }
  }, [orderData.total, router]);

  // ============================================================================
  // Deep Link Handling
  // ============================================================================

  useEffect(() => {
    const handleDeepLink = (event: { url: string }): void => {
      if (event.url.startsWith(PAYMENT_CONFIG.STRIPE_REDIRECT_URL)) {
        console.log('✅ Returned from Stripe payment');
        PaymentAlertService.showStripeRedirect();
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, []);

  // ============================================================================
  // Stripe Payment Initialization
  // ============================================================================

  const initializeStripePayment = useCallback(async (): Promise<boolean> => {
    try {
      console.log('💳 Initializing Stripe payment...');

      const paymentIntent = await PaymentService.createPaymentIntent(
        orderData.total,
        PAYMENT_CONFIG.CURRENCY
      );

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent.clientSecret,
        merchantDisplayName: orderData.restaurantName,
        style: 'automatic',
        returnURL: PAYMENT_CONFIG.STRIPE_REDIRECT_URL,
      });

      if (error) {
        console.error('❌ Stripe initialization error:', error.message);
        PaymentAlertService.showPaymentError(error.message);
        return false;
      }

      console.log('✅ Stripe payment sheet initialized');
      return true;
    } catch (error: any) {
      console.error('❌ Error initializing Stripe:', error);
      PaymentAlertService.showPaymentError(
        error.message || 'Error al inicializar el pago'
      );
      return false;
    }
  }, [orderData.total, orderData.restaurantName, initPaymentSheet]);

  // ============================================================================
  // Payment Handlers
  // ============================================================================

 /**
 * ✅ FIXED: Handle cash payment with CORRECT calculations
 * Este método ahora calcula correctamente todos los valores numéricos
 */
const handleCashPayment = useCallback(async (): Promise<void> => {
  if (!token) {
    PaymentAlertService.showError('Error', 'Sesión expirada. Por favor, inicia sesión nuevamente.');
    return;
  }

  setIsLoading(true);

  try {
    console.log('🧾 Creating cash receipt...');
    console.log('📦 Order data received:', orderData);

    const routeParams = params as any;

    // ✅ CRITICAL: Parse all numeric values from orderData
    // orderData ya tiene los valores parseados correctamente por PaymentUtils
    const quantity = orderData.quantity;
    const subtotal = orderData.subtotal;
    const discount = orderData.discount;
    const total = orderData.total;
    
    // ✅ Calculate unit price from subtotal (before discount)
    const unitPrice = subtotal / quantity;

    console.log('💰 Values to send to receipt:', {
      quantity,
      unitPrice,
      subtotal,
      discount,
      total,
      restaurantAddress: routeParams.restaurantAddress || '',
    });

    // ✅ Validate all numeric values
    if (isNaN(unitPrice) || unitPrice <= 0) {
      throw new Error('Invalid unit price calculation');
    }
    if (isNaN(subtotal) || subtotal <= 0) {
      throw new Error('Invalid subtotal');
    }
    if (isNaN(total) || total <= 0) {
      throw new Error('Invalid total amount');
    }

    // Create cash receipt with validated numeric values
    const receipt = await CashReceiptService.createReceipt(
      {
        orderId: routeParams.orderId,
        restaurantId: routeParams.restaurantId,
        productId: routeParams.productId,
        productName: orderData.productName || 'Producto',
        quantity,           // ✅ number
        unitPrice,          // ✅ number (calculated correctly)
        subtotal,           // ✅ number
        discount,           // ✅ number
        totalAmount: total, // ✅ number
        restaurantAddress: routeParams.restaurantAddress || '',
      },
      token
    );

    console.log('✅ Cash receipt created successfully:', receipt.receiptCode);
    console.log('📊 Receipt values:', {
      unitPrice: receipt.unitPrice,
      subtotal: receipt.subtotal,
      discount: receipt.discount,
      totalAmount: receipt.totalAmount,
    });

    // Show receipt modal
    setCashReceipt(receipt);
    setShowReceiptModal(true);
  } catch (error: any) {
    console.error('❌ Error creating cash receipt:', error);
    PaymentAlertService.showPaymentError(
      error.message || 'Error al crear el recibo. Por favor, intenta nuevamente.'
    );
  } finally {
    setIsLoading(false);
  }
}, [token, params, orderData]);
  /**
   * Handle card payment via Stripe
   */
  const handleCardPayment = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const initialized = await initializeStripePayment();
      
      if (!initialized) {
        setIsLoading(false);
        return;
      }

      const { error } = await presentPaymentSheet();

      if (error) {
        console.error('❌ Stripe payment error:', error.message);
        PaymentAlertService.showPaymentError(error.message);
      } else {
        console.log('✅ Stripe payment successful');
        handlePaymentSuccess();
      }
    } catch (error: any) {
      console.error('❌ Error processing card payment:', error);
      PaymentAlertService.showPaymentError(
        error.message || 'Error al procesar el pago'
      );
    } finally {
      setIsLoading(false);
    }
  }, [initializeStripePayment, presentPaymentSheet]);

  /**
   * Main payment handler
   */
  const handlePayment = useCallback(async (): Promise<void> => {
    if (selectedPaymentMethod === 'efectivo') {
      await handleCashPayment();
    } else {
      await handleCardPayment();
    }
  }, [selectedPaymentMethod, handleCashPayment, handleCardPayment]);

  /**
   * Handle successful payment completion (for card payments)
   */
  const handlePaymentSuccess = useCallback((): void => {
    PaymentAlertService.showPaymentSuccess(() => {
      router.push('/(tabs)/HomeScreen');
    });
  }, [router]);

  /**
   * Navigate back
   */
  const handleGoBack = useCallback((): void => {
    router.back();
  }, [router]);

  /**
   * ✅ NEW: Handle close receipt modal
   */
  const handleCloseReceipt = useCallback((): void => {
    setShowReceiptModal(false);
  }, []);

  /**
   * ✅ NEW: Handle go home from receipt
   */
  const handleGoHomeFromReceipt = useCallback((): void => {
    setShowReceiptModal(false);
    router.push('/(tabs)/HomeScreen');
  }, [router]);

  // ============================================================================
  // Main Render
  // ============================================================================

  return (
    <>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <PaymentHeader onBackPress={handleGoBack} />

          {/* Delivery Map */}
          <DeliveryMap
            location={orderData.deliveryLocation}
            restaurantName={orderData.restaurantName}
          />

          {/* Delivery Information */}
          <DeliveryInfo restaurantName={orderData.restaurantName} />

          {/* Order Summary */}
          <OrderSummary
            productName={orderData.productName}
            quantity={orderData.quantity}
          />

          {/* Price Breakdown */}
          <PriceBreakdown
            subtotal={orderData.subtotal}
            discount={orderData.discount}
            total={orderData.total}
          />

          {/* Payment Method Selection */}
          <PaymentMethodSelector
            selectedMethod={selectedPaymentMethod}
            onMethodChange={setSelectedPaymentMethod}
          />

          {/* Proceed to Payment Button */}
          <PaymentButton
            onPress={handlePayment}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>

      {/* ✅ NEW: Cash Receipt Modal */}
      {token && (
        <CashReceiptModal
          visible={showReceiptModal}
          receipt={cashReceipt}
          token={token}
          onClose={handleCloseReceipt}
          onGoHome={handleGoHomeFromReceipt}
        />
      )}
    </>
  );
}