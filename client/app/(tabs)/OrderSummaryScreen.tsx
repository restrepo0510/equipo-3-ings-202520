// app/(tabs)/OrderSummaryScreen.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useReservationTimer } from '@/hooks/useReservationTimer';
import { useOrderSummary } from '@/hooks/useOrderSummary';
import { ReservationUtils } from '@/utils/reservation.utils';
import { ReservationAlertService } from '@/services/reservationAlertService';
import { RESERVATION_TEXT, RESERVATION_TIME } from '@/constants/reservations.constants';
import type { OrderSummaryParams } from '@/types/reservation.types';
import { styles } from '@/styles/OrderSummaryScreen.styles';

/**
 * OrderSummaryScreen Component
 * 
 * Displays order summary with 5-minute countdown timer
 * Allows user to proceed to payment or cancel reservation
 */
export default function OrderSummaryScreen() {
  const router = useRouter();
  const { token } = useAuth();
  
  // ✅ CORRECCIÓN: No usar tipado genérico, dejar que infiera
  const params = useLocalSearchParams();

  // Parse params manually with type assertion
  const orderParams: OrderSummaryParams = {
    productId: params.productId as string,
    productName: params.productName as string,
    productImage: params.productImage as string,
    restaurantId: params.restaurantId as string,
    restaurantName: params.restaurantName as string,
    restaurantAddress: params.restaurantAddress as string,
    quantity: params.quantity as string,
    price: params.price as string,
    originalPrice: params.originalPrice as string,
  };

  // Custom hooks
  const { timerState, stopTimer } = useReservationTimer(
    RESERVATION_TIME.DURATION_SECONDS,
    () => handleTimeExpired()
  );

  const { isProcessing, handleCancel, handleProceedToPayment } = useOrderSummary();

  // Parse and calculate order totals
  const orderTotals = ReservationUtils.parseOrderParams(orderParams);

  /**
   * Handle time expired
   */
  const handleTimeExpired = (): void => {
    stopTimer();
    ReservationAlertService.showTimeExpired(() => router.back());
  };

  /**
   * Handle payment process
   */
  const handlePayment = async (): Promise<void> => {
    if (!token) {
      console.error('No token available');
      return;
    }

    await handleProceedToPayment(orderParams, timerState.timeLeft, token);
  };

  /**
   * Cleanup timer on unmount
   */
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <OrderHeader onClose={handleCancel} />

      {/* Timer Section */}
      <TimerSection timerState={timerState} />

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Card */}
        <ProductCard params={orderParams} totals={orderTotals} />

        {/* Restaurant Info */}
        <RestaurantInfo params={orderParams} />

        {/* Price Breakdown */}
        <PriceBreakdown totals={orderTotals} />

        {/* Important Notes */}
        <ImportantNotes restaurantName={orderParams.restaurantName} />
      </ScrollView>

      {/* Action Buttons */}
      <ActionButtons
        isProcessing={isProcessing}
        isExpired={timerState.isExpired}
        onCancel={handleCancel}
        onPay={handlePayment}
      />
    </View>
  );
}
/**
 * OrderHeader Component
 */
interface OrderHeaderProps {
  onClose: () => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ onClose }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onClose}>
      <Ionicons name="close" size={28} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{RESERVATION_TEXT.HEADER.TITLE}</Text>
    <View style={{ width: 28 }} />
  </View>
);

/**
 * TimerSection Component
 */
interface TimerSectionProps {
  timerState: {
    timeLeft: number;
    isExpired: boolean;
    timerColor: string;
  };
}

const TimerSection: React.FC<TimerSectionProps> = ({ timerState }) => {
  const timerIcon = ReservationUtils.getTimerIcon(timerState.timeLeft);

  return (
    <View style={[styles.timerContainer, { backgroundColor: timerState.timerColor }]}>
      <Ionicons name="timer" size={32} color="#FFF" />
      <View style={styles.timerContent}>
        <Text style={styles.timerText}>{RESERVATION_TEXT.TIMER.LABEL}</Text>
        <Text style={styles.timerCountdown}>
          {ReservationUtils.formatTime(timerState.timeLeft)}
        </Text>
      </View>
      <Ionicons name={timerIcon} size={32} color="#FFF" />
    </View>
  );
};

/**
 * ProductCard Component
 */
interface ProductCardProps {
  params: OrderSummaryParams;
  totals: {
    quantity: number;
    unitPrice: number;
    originalPrice: number | null;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ params, totals }) => (
  <View style={styles.productCard}>
    <Image
      source={{ uri: params.productImage || 'https://via.placeholder.com/100' }}
      style={styles.productImage}
    />
    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={2}>
        {params.productName}
      </Text>
      <Text style={styles.productQuantity}>
        {RESERVATION_TEXT.PRICE_LABELS.QUANTITY}: {totals.quantity}
      </Text>
      
    </View>
  </View>
);

/**
 * RestaurantInfo Component
 */
interface RestaurantInfoProps {
  params: OrderSummaryParams;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ params }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{RESERVATION_TEXT.SECTIONS.RESTAURANT}</Text>
    <View style={styles.restaurantCard}>
      <Ionicons name="restaurant" size={24} color="#27AE60" />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{params.restaurantName}</Text>
        {params.restaurantAddress && (
          <View style={styles.addressRow}>
            <Ionicons name="location" size={16} color="#7F8C8D" />
            <Text style={styles.addressText}>{params.restaurantAddress}</Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

/**
 * PriceBreakdown Component
 */
interface PriceBreakdownProps {
  totals: {
    subtotal: number;
    discount: number;
    total: number;
  };
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ totals }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{RESERVATION_TEXT.SECTIONS.ORDER_DETAIL}</Text>
    <View style={styles.priceBreakdown}>
      {/* Subtotal */}
      <View style={styles.priceDetailRow}>
        <Text style={styles.priceLabel}>{RESERVATION_TEXT.PRICE_LABELS.SUBTOTAL}</Text>
        <Text style={styles.priceValue}>
          {ReservationUtils.formatCurrency(totals.subtotal)}
        </Text>
      </View>

      {/* Discount */}
      {totals.discount > 0 && (
        <View style={styles.priceDetailRow}>
          <Text style={styles.priceLabelDiscount}>
            {RESERVATION_TEXT.PRICE_LABELS.DISCOUNT}
          </Text>
          <Text style={styles.priceValueDiscount}>
            -{ReservationUtils.formatCurrency(totals.discount)}
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      {/* Total */}
      <View style={styles.priceDetailRow}>
        <Text style={styles.totalLabel}>{RESERVATION_TEXT.PRICE_LABELS.TOTAL}</Text>
        <Text style={styles.totalValue}>
          {ReservationUtils.formatCurrency(totals.total)}
        </Text>
      </View>
    </View>
  </View>
);

/**
 * ImportantNotes Component
 */
interface ImportantNotesProps {
  restaurantName: string;
}

const ImportantNotes: React.FC<ImportantNotesProps> = ({ restaurantName }) => (
  <View style={styles.notesContainer}>
    <NoteRow icon="information-circle" text={RESERVATION_TEXT.NOTES.TIME_LIMIT} />
    <NoteRow icon="card" text={RESERVATION_TEXT.NOTES.PAYMENT_REQUIRED} />
    <NoteRow icon="bag-check" text={RESERVATION_TEXT.NOTES.PICKUP(restaurantName)} />
  </View>
);

/**
 * NoteRow Component
 */
interface NoteRowProps {
  icon: string;
  text: string;
}

const NoteRow: React.FC<NoteRowProps> = ({ icon, text }) => (
  <View style={styles.noteRow}>
    <Ionicons name={icon as any} size={20} color="#3498DB" />
    <Text style={styles.noteText}>{text}</Text>
  </View>
);

/**
 * ActionButtons Component
 */
interface ActionButtonsProps {
  isProcessing: boolean;
  isExpired: boolean;
  onCancel: () => void;
  onPay: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isProcessing,
  isExpired,
  onCancel,
  onPay,
}) => (
  <View style={styles.footer}>
    {/* Cancel Button */}
    <TouchableOpacity
      style={styles.cancelButton}
      onPress={onCancel}
      disabled={isProcessing}
    >
      <Text style={styles.cancelButtonText}>
        {RESERVATION_TEXT.BUTTONS.CANCEL}
      </Text>
    </TouchableOpacity>

    {/* Pay Button */}
    <TouchableOpacity
      style={[
        styles.payButton,
        (isProcessing || isExpired) && styles.payButtonDisabled,
      ]}
      onPress={onPay}
      disabled={isProcessing || isExpired}
    >
      {isProcessing ? (
        <ActivityIndicator color="#FFF" size="small" />
      ) : (
        <>
          <Ionicons name="card" size={24} color="#FFF" />
          <Text style={styles.payButtonText}>
            {RESERVATION_TEXT.BUTTONS.PAY}
          </Text>
        </>
      )}
    </TouchableOpacity>
  </View>
);