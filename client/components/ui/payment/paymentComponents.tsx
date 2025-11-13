// components/payment/PaymentComponents.tsx

import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { PaymentUtils } from '@/utils/payment.utils';
import { PAYMENT_CONFIG, PAYMENT_TEXT } from '@/constants/payment.constants';
import { styles } from '@/styles/paymentScreen.styles';
import type { PaymentMethod, DeliveryLocation } from '@/types/payment.types';

// ============================================================================
// PAYMENT HEADER
// ============================================================================

interface PaymentHeaderProps {
  onBackPress: () => void;
}

export const PaymentHeader = memo<PaymentHeaderProps>(({ onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBackPress}
        accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.BACK}
        accessibilityRole="button"
      >
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.headerTitle}>
        {PAYMENT_TEXT.HEADER.TITLE}
      </Text>
      
      <View style={styles.placeholder} />
    </View>
  );
});

PaymentHeader.displayName = 'PaymentHeader';

// ============================================================================
// DELIVERY MAP - FIXED VERSION
// ============================================================================

interface DeliveryMapProps {
  location: DeliveryLocation;
  restaurantName: string;
}

export const DeliveryMap = memo<DeliveryMapProps>(
  ({ location, restaurantName }) => {
    // Validate coordinates
    const isValidLocation = PaymentUtils.isValidLocation(
      location.latitude,
      location.longitude
      
    );

    if (!isValidLocation) {
      console.warn('⚠️ Invalid delivery location coordinates');
      return (
        <View style={[styles.mapContainer, styles.mapError]}>
          <Ionicons name="location-outline" size={48} color="#999" />
          <Text style={styles.mapErrorText}>
            Ubicación no disponible
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: PAYMENT_CONFIG.MAP_DELTA,
            longitudeDelta: PAYMENT_CONFIG.MAP_DELTA,
          }}
          // ✅ CRÍTICO: Configuración correcta del mapa
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          scrollEnabled={true}
          zoomEnabled={true}
          rotateEnabled={false}
          pitchEnabled={false}
          // ✅ IMPORTANTE: Estas propiedades ayudan a la renderización
          loadingEnabled={true}
          loadingIndicatorColor="#1B5E20"
          loadingBackgroundColor="#F5F5F5"
        >
          <Marker 
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={PAYMENT_TEXT.MAP.DELIVERY_LOCATION}
            description={restaurantName}
            pinColor="#1B5E20"
          />
        </MapView>
      </View>
    );
  }
);

DeliveryMap.displayName = 'DeliveryMap';

// ============================================================================
// DELIVERY INFO
// ============================================================================

interface DeliveryInfoProps {
  restaurantName: string;
  restaurantAddress?: string; 
  estimatedTime?: string;
}

export const DeliveryInfo = memo<DeliveryInfoProps>(
  ({ restaurantName, restaurantAddress,estimatedTime = PAYMENT_CONFIG.DEFAULT_DELIVERY_TIME }) => {
    return (
      <View style={styles.deliveryInfo}>
        <View>
          <Text style={styles.deliveryLabel}>
            {PAYMENT_TEXT.DELIVERY.ESTIMATED_LABEL}
          </Text>
          <View style={styles.restaurantText}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        {/* ✅ NUEVO: Mostrar la dirección si está disponible */}
        {restaurantAddress && (
          <Text style={styles.restaurantAddress}>{restaurantAddress}</Text>
        )}
      </View>
            
        </View>
        
        <View style={styles.deliveryTimeContainer}>
          <Ionicons name="time-outline" size={20} color="#27AE60" />
          <Text style={styles.deliveryTime}>
            {estimatedTime}
          </Text>
        </View>
      </View>
    );
  }
);

DeliveryInfo.displayName = 'DeliveryInfo';

// ============================================================================
// ORDER SUMMARY
// ============================================================================

interface OrderSummaryProps {
  productName: string;
  quantity: number;
  productImage?: string;
}

export const OrderSummary = memo<OrderSummaryProps>(
  ({ productName, quantity }) => {
    return (
      <View style={styles.orderSummary}>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.quantityText}>
          {PAYMENT_TEXT.ORDER.QUANTITY}: {quantity}
        </Text>
      </View>
    );
  }
);

OrderSummary.displayName = 'OrderSummary';

// ============================================================================
// PRICE BREAKDOWN
// ============================================================================

interface PriceBreakdownProps {
  subtotal: number;
  discount: number;
  total: number;
}

export const PriceBreakdown = memo<PriceBreakdownProps>(
  ({ subtotal, discount, total }) => {
    return (
      <View style={styles.totalsContainer}>
        {/* Subtotal */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            {PAYMENT_TEXT.PRICING.SUBTOTAL}
          </Text>
          <Text style={styles.priceValue}>
            {PaymentUtils.formatCurrency(subtotal)}
          </Text>
        </View>

        {/* Discount (if applicable) */}
        {discount > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabelDiscount}>
              {PAYMENT_TEXT.PRICING.DISCOUNT}
            </Text>
            <Text style={styles.priceValueDiscount}>
              -{PaymentUtils.formatCurrency(discount)}
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Total */}
        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>
            {PAYMENT_TEXT.PRICING.TOTAL}
          </Text>
          <Text style={styles.totalValue}>
            {PaymentUtils.formatCurrency(total)}
          </Text>
        </View>
      </View>
    );
  }
);

PriceBreakdown.displayName = 'PriceBreakdown';

// ============================================================================
// PAYMENT METHOD SELECTOR
// ============================================================================

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector = memo<PaymentMethodSelectorProps>(
  ({ selectedMethod, onMethodChange }) => {
    return (
      <View style={styles.paymentMethods}>
        {/* Cash Button */}
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedMethod === 'efectivo' && styles.paymentButtonActive,
          ]}
          onPress={() => onMethodChange('efectivo')}
          accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.SELECT_CASH}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedMethod === 'efectivo' }}
        >
          <Ionicons 
            name="cash-outline" 
            size={24} 
            color={selectedMethod === 'efectivo' ? '#000' : '#666'} 
          />
          <Text
            style={[
              styles.paymentButtonText,
              selectedMethod === 'efectivo' && styles.paymentButtonTextActive,
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
            selectedMethod === 'tarjeta' && styles.paymentButtonActive,
          ]}
          onPress={() => onMethodChange('tarjeta')}
          accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.SELECT_CARD}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedMethod === 'tarjeta' }}
        >
          <Ionicons name="card-outline" size={24} color="#FFF" />
          <Text style={styles.paymentButtonTextWhite}>
            {PAYMENT_TEXT.METHODS.CARD}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

PaymentMethodSelector.displayName = 'PaymentMethodSelector';

// ============================================================================
// PAYMENT BUTTON
// ============================================================================

interface PaymentButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

export const PaymentButton = memo<PaymentButtonProps>(
  ({ onPress, isLoading }) => {
    return (
      <TouchableOpacity
        style={[
          styles.proceedButton,
          isLoading && styles.proceedButtonDisabled,
        ]}
        onPress={onPress}
        disabled={isLoading}
        accessibilityLabel={PAYMENT_TEXT.ACCESSIBILITY.PROCEED}
        accessibilityRole="button"
        accessibilityState={{ disabled: isLoading }}
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
    );
  }
);

PaymentButton.displayName = 'PaymentButton';