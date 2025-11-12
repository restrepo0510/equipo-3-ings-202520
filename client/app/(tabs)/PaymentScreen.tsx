// app/(tabs)/PaymentScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
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
import MapView, { Marker } from 'react-native-maps';

// Services and utils
import { PaymentService } from '@/services/paymentService';
import { PaymentUtils } from '@/utils/payment.utils';
import { PaymentAlertService } from '@/services/paymentAlertService';

// Types and constants
import { PAYMENT_CONFIG, PAYMENT_TEXT } from '@/constants/payment.constants';
import { styles } from '@/styles/paymentScreen.styles';
import type { PaymentScreenParams, PaymentMethod } from '@/types/payment.types';

/**
 * PaymentScreen Component
 * 
 * Handles payment processing for confirmed orders
 * Supports both cash and card payments via Stripe
 * 
 * @responsibilities
 * - Display order summary
 * - Show delivery location on map
 * - Handle payment method selection
 * - Process Stripe payments
 * - Handle cash payments
 * - Navigate on success/failure
 */
export default function PaymentScreen(): React.ReactElement {
  // ============================================================================
  // Hooks & Router
  // ============================================================================
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // ============================================================================
  // State Management
  // ============================================================================

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('efectivo');

  // Parse order data from params (cast to PaymentScreenParams)
const orderData = PaymentUtils.parsePaymentParams(PaymentUtils.validateAndConvertParams(params));  // ============================================================================
  // Deep Link Handling
  // ============================================================================

  /**
   * Handles deep link redirects from Stripe
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
   * Initializes Stripe payment sheet
   * 
   * @returns true if initialization successful
   */
  const initializeStripePayment = useCallback(async (): Promise<boolean> => {
    try {
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
      PaymentAlertService.showPaymentError(error.message);
      return false;
    }
  }, [orderData.total, orderData.restaurantName, initPaymentSheet]);

  // ============================================================================
  // Payment Handlers
  // ============================================================================

  /**
   * Handles cash payment selection
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

      // Present payment sheet
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
      PaymentAlertService.showPaymentError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [initializeStripePayment, presentPaymentSheet]);

  /**
   * Main payment handler - routes to correct payment method
   */
  const handlePayment = useCallback(async (): Promise<void> => {
    if (selectedPaymentMethod === 'efectivo') {
      handleCashPayment();
    } else {
      await handleCardPayment();
    }
  }, [selectedPaymentMethod, handleCashPayment, handleCardPayment]);

  /**
   * Handles successful payment
   */
  const handlePaymentSuccess = useCallback((): void => {
    PaymentAlertService.showPaymentSuccess(() => {
      // Navigate back to home or order history
      router.push('/(tabs)/HomeScreen');
    });
  }, [router]);

  /**
   * Navigates back to order summary
   */
  const handleGoBack = useCallback((): void => {
    router.back();
  }, [router]);

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /**
   * Renders payment method selector
   */
  const renderPaymentMethods = (): React.ReactElement => (
    <View style={styles.paymentMethods}>
      {/* Cash Button */}
      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === 'efectivo' && styles.paymentButtonActive,
        ]}
        onPress={() => setSelectedPaymentMethod('efectivo')}
        accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.SELECT_CASH}
        accessibilityRole="button"
      >
        <Ionicons 
          name="cash-outline" 
          size={24} 
          color={selectedPaymentMethod === 'efectivo' ? '#000' : '#666'} 
        />
        <Text
          style={[
            styles.paymentButtonText,
            selectedPaymentMethod === 'efectivo' && styles.paymentButtonTextActive,
          ]}
        >
          {PAYMENT_TEXT.METHODS.CASH}
        </Text>
      </TouchableOpacity>

      {/* Card Button */}
      <TouchableOpacity
        style={[
          styles.paymentButton,
          styles.paymentButtonDark,
          selectedPaymentMethod === 'tarjeta' && styles.paymentButtonActive,
        ]}
        onPress={() => setSelectedPaymentMethod('tarjeta')}
        accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.SELECT_CARD}
        accessibilityRole="button"
      >
        <Ionicons name="card-outline" size={24} color="#FFF" />
        <Text style={styles.paymentButtonTextWhite}>
          {PAYMENT_TEXT.METHODS.CARD}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // ============================================================================
  // Main Render
  // ============================================================================

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleGoBack}
            accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.BACK}
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{PAYMENT_TEXT.HEADER.TITLE}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Delivery Map */}
        <View style={styles.mapContainer}>
          <MapView
  style={styles.map}
  initialRegion={{
    latitude: orderData.deliveryLocation.latitude,
    longitude: orderData.deliveryLocation.longitude,
    latitudeDelta: PAYMENT_CONFIG.MAP_DELTA,
    longitudeDelta: PAYMENT_CONFIG.MAP_DELTA,
  }}
>
  <Marker 
    coordinate={orderData.deliveryLocation}
    title={PAYMENT_TEXT.MAP.DELIVERY_LOCATION}
    description={orderData.restaurantName}
  />
</MapView>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryInfo}>
          <View>
            <Text style={styles.deliveryLabel}>
              {PAYMENT_TEXT.DELIVERY.ESTIMATED_LABEL}
            </Text>
            <Text style={styles.restaurantName}>
              {orderData.restaurantName}
            </Text>
          </View>
          <View style={styles.deliveryTimeContainer}>
            <Ionicons name="time-outline" size={20} color="#27AE60" />
            <Text style={styles.deliveryTime}>
              {PAYMENT_CONFIG.DEFAULT_DELIVERY_TIME}
            </Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.productName}>{orderData.productName}</Text>
          <Text style={styles.quantityText}>
            {PAYMENT_TEXT.ORDER.QUANTITY}: {orderData.quantity}
          </Text>
        </View>

        {/* Price Breakdown */}
        <View style={styles.totalsContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              {PAYMENT_TEXT.PRICING.SUBTOTAL}
            </Text>
            <Text style={styles.priceValue}>
              {PaymentUtils.formatCurrency(orderData.subtotal)}
            </Text>
          </View>

          {orderData.discount > 0 && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabelDiscount}>
                {PAYMENT_TEXT.PRICING.DISCOUNT}
              </Text>
              <Text style={styles.priceValueDiscount}>
                -{PaymentUtils.formatCurrency(orderData.discount)}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>
              {PAYMENT_TEXT.PRICING.TOTAL}
            </Text>
            <Text style={styles.totalValue}>
              {PaymentUtils.formatCurrency(orderData.total)}
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        {renderPaymentMethods()}

        {/* Proceed Button */}
        <TouchableOpacity
          style={[
            styles.proceedButton,
            isLoading && styles.proceedButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={isLoading}
          accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.PROCEED}
          accessibilityRole="button"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={24} color="#FFF" />
              <Text style={styles.proceedButtonText}>
                {PAYMENT_TEXT.BUTTONS.PROCEED}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}