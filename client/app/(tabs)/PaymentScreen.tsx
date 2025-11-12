// app/(tabs)/PaymentScreen.tsx

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
import { PaymentUtils } from '@/utils/payment.utils';
import { PaymentAlertService } from '@/services/paymentAlertService';

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

// Types and constants
import { PAYMENT_CONFIG, PAYMENT_TEXT } from '@/constants/payment.constants';
import { styles } from '@/styles/paymentScreen.styles';
import type { PaymentMethod, DeliveryLocation } from '@/types/payment.types';

/**
 * PaymentScreen Component
 * 
 * Handles payment processing for confirmed orders with full validation
 * Supports both cash and card payments via Stripe
 * 
 * @responsibilities
 * - Validate and parse order parameters
 * - Display order summary with pricing breakdown
 * - Show delivery location on interactive map
 * - Handle payment method selection (cash/card)
 * - Process Stripe payments with proper error handling
 * - Handle cash payment confirmations
 * - Navigate on success/failure with appropriate feedback
 * 
 * @features
 * - Type-safe parameter parsing
 * - Centralized error handling
 * - Deep link support for Stripe redirects
 * - Responsive map with proper provider
 * - Accessibility support
 * - Loading states
 */
export default function PaymentScreen(): React.ReactElement {
  // ============================================================================
  // Hooks & Router
  // ============================================================================
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // ============================================================================
  // Parse and Validate Order Data
  // ============================================================================

  /**
   * Memoized order data parsing
   * Validates and converts route params to typed order data
   */
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
      // Return default values to prevent crashes
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

  // ============================================================================
  // Validation
  // ============================================================================

  /**
   * Validates order data on mount
   */
  useEffect(() => {
    if (!PaymentUtils.isValidAmount(orderData.total)) {
      PaymentAlertService.showInvalidAmount();
      router.back();
    }
  }, [orderData.total, router]);

  // ============================================================================
  // Deep Link Handling
  // ============================================================================

  /**
   * Handles deep link redirects from Stripe payment flow
   */
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

  /**
   * Initializes Stripe payment sheet with order details
   * 
   * @returns Promise resolving to true if initialization successful
   * @throws Will show error alert on failure
   */
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
   * Handles cash payment selection
   * Shows confirmation dialog before proceeding
   */
  const handleCashPayment = useCallback((): void => {
    console.log('💵 Cash payment selected');
    
    PaymentAlertService.showCashPaymentConfirmation(() => {
      console.log('✅ Cash payment confirmed');
      handlePaymentSuccess();
    });
  }, []);

  /**
   * Handles card payment via Stripe
   * Initializes payment sheet and processes payment
   */
  const handleCardPayment = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      // Initialize payment sheet
      const initialized = await initializeStripePayment();
      
      if (!initialized) {
        setIsLoading(false);
        return;
      }

      // Present payment sheet to user
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
   * Routes to appropriate payment method handler
   */
  const handlePayment = useCallback(async (): Promise<void> => {
    if (selectedPaymentMethod === 'efectivo') {
      handleCashPayment();
    } else {
      await handleCardPayment();
    }
  }, [selectedPaymentMethod, handleCashPayment, handleCardPayment]);

  /**
   * Handles successful payment completion
   * Shows success message and navigates to home
   */
  const handlePaymentSuccess = useCallback((): void => {
    PaymentAlertService.showPaymentSuccess(() => {
      router.push('/(tabs)/HomeScreen');
    });
  }, [router]);

  /**
   * Navigates back to previous screen
   */
  const handleGoBack = useCallback((): void => {
    router.back();
  }, [router]);

  // ============================================================================
  // Main Render
  // ============================================================================

  // Normalize delivery location to ensure required map delta properties exist
  const normalizedLocation: DeliveryLocation = useMemo(() => {
    const loc = orderData.deliveryLocation as Partial<DeliveryLocation> & {
      latitude: number;
      longitude: number;
      address?: string;
      latitudeDelta?: number;
      longitudeDelta?: number;
    };

    return {
      latitude: loc.latitude,
      longitude: loc.longitude,
      latitudeDelta: loc.latitudeDelta ?? 0.01,
      longitudeDelta: loc.longitudeDelta ?? 0.01,
      address: loc.address ?? '',
    } as DeliveryLocation;
  }, [orderData.deliveryLocation]);

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Header with back button */}
        <PaymentHeader onBackPress={handleGoBack} />

        {/* Delivery Map with restaurant marker */}
        <DeliveryMap
          location={normalizedLocation}
          restaurantName={orderData.restaurantName}
        />

        {/* Delivery Information */}
        <DeliveryInfo restaurantName={orderData.restaurantName}
          restaurantAddress={normalizedLocation.address} // ✅ Pasar la dirección
         />

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
  );
}