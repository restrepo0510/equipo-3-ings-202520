// app/(tabs)/OrderSummaryScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { reservationService } from '@/services/reservationService';
import { styles } from '@/styles/OrderSummaryScreen.styles';

const RESERVATION_TIME = 300; // 5 minutos en segundos

/**
 * OrderSummaryScreen
 * 
 * Shows order summary with 5-minute countdown timer
 * Allows user to proceed to payment
 */
export default function OrderSummaryScreen() {
  const router = useRouter();
  const { token, user } = useAuth();
  const {
    productId,
    productName,
    productImage,
    restaurantId,
    restaurantName,
    restaurantAddress,
    quantity,
    price,
    originalPrice,
  } = useLocalSearchParams();

  const [timeLeft, setTimeLeft] = useState(RESERVATION_TIME);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse values
  const quantityNum = parseInt(quantity as string);
  const priceNum = parseFloat(price as string);
  const originalPriceNum = originalPrice ? parseFloat(originalPrice as string) : null;

  // Calculate totals
  const subtotal = priceNum * quantityNum;
  const discount = originalPriceNum ? (originalPriceNum - priceNum) * quantityNum : 0;
  const total = subtotal;

  /**
   * Start countdown timer
   */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  /**
   * Handle time expired
   */
  const handleTimeExpired = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    Alert.alert(
      'Tiempo expirado',
      'Tu reserva ha expirado. Por favor, vuelve a intentarlo.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  /**
   * Format time as MM:SS
   */
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Get timer color based on remaining time
   */
  const getTimerColor = (): string => {
    if (timeLeft > 180) return '#27AE60'; // Verde
    if (timeLeft > 60) return '#F39C12'; // Naranja
    return '#E74C3C'; // Rojo
  };

  /**
   * Handle cancel reservation
   */
  const handleCancel = () => {
    Alert.alert(
      'Cancelar reserva',
      '¿Estás seguro de que deseas cancelar esta reserva?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            router.back();
          },
        },
      ]
    );
  };

  /**
   * Handle proceed to payment
   */
  const handleProceedToPayment = async () => {
    if (timeLeft <= 0) {
      Alert.alert('Error', 'Tu reserva ha expirado');
      return;
    }

    try {
      setIsProcessing(true);

      // TODO: Crear reserva en el backend
      // const reservation = await reservationService.create({
      //   productId: productId as string,
      //   quantity: quantityNum,
      //   userId: user?.id,
      // }, token);

      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mostrar alerta de confirmación
      Alert.alert(
        '¡Reserva confirmada!',
        `Tienes ${formatTime(timeLeft)} para completar el pago.\n\nAhora serás redirigido a la pasarela de pagos.`,
        [
          {
            text: 'Continuar al pago',
            onPress: () => {
              // TODO: Navegar a pasarela de pagos
              // router.push({
              //   pathname: '/(tabs)/PaymentScreen',
              //   params: {
              //     reservationId: reservation.id,
              //     amount: total.toString(),
              //   },
              // });
              
              // Por ahora, solo mostrar mensaje
              Alert.alert(
                'Próximamente',
                'La integración con la pasarela de pagos estará disponible pronto.',
                [
                  {
                    text: 'OK',
                    onPress: () => router.push('/(tabs)/HomeScreen'),
                  },
                ]
              );
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error processing reservation:', error);
      Alert.alert('Error', 'No se pudo procesar la reserva. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resumen de Pedido</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Timer Section */}
      <View style={[styles.timerContainer, { backgroundColor: getTimerColor() }]}>
        <Ionicons name="timer" size={32} color="#FFF" />
        <View style={styles.timerContent}>
          <Text style={styles.timerText}>Tiempo restante de reserva</Text>
          <Text style={styles.timerCountdown}>{formatTime(timeLeft)}</Text>
        </View>
        <Ionicons 
          name={timeLeft > 60 ? "time" : "alert-circle"} 
          size={32} 
          color="#FFF" 
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Card */}
        <View style={styles.productCard}>
          <Image
            source={{ uri: (productImage as string) || 'https://via.placeholder.com/100' }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {productName}
            </Text>
            <Text style={styles.productQuantity}>
              Cantidad: {quantity}
            </Text>
            <View style={styles.priceRow}>
              {originalPriceNum && originalPriceNum > priceNum && (
                <Text style={styles.originalPriceText}>
                  ${originalPriceNum.toLocaleString('es-CO')}
                </Text>
              )}
              <Text style={styles.currentPriceText}>
                ${priceNum.toLocaleString('es-CO')} c/u
              </Text>
            </View>
          </View>
        </View>

        {/* Restaurant Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurante</Text>
          <View style={styles.restaurantCard}>
            <Ionicons name="restaurant" size={24} color="#27AE60" />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
              <View style={styles.addressRow}>
                <Ionicons name="location" size={16} color="#7F8C8D" />
                <Text style={styles.addressText}>{restaurantAddress}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalle del Pedido</Text>
          <View style={styles.priceBreakdown}>
            <View style={styles.priceDetailRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>
                ${subtotal.toLocaleString('es-CO')}
              </Text>
            </View>

            {discount > 0 && (
              <View style={styles.priceDetailRow}>
                <Text style={styles.priceLabelDiscount}>Descuento</Text>
                <Text style={styles.priceValueDiscount}>
                  -${discount.toLocaleString('es-CO')}
                </Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.priceDetailRow}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValue}>
                ${total.toLocaleString('es-CO')}
              </Text>
            </View>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.notesContainer}>
          <View style={styles.noteRow}>
            <Ionicons name="information-circle" size={20} color="#3498DB" />
            <Text style={styles.noteText}>
              Esta reserva es válida por 5 minutos
            </Text>
          </View>
          <View style={styles.noteRow}>
            <Ionicons name="card" size={20} color="#3498DB" />
            <Text style={styles.noteText}>
              Debes completar el pago para confirmar tu pedido
            </Text>
          </View>
          <View style={styles.noteRow}>
            <Ionicons name="bag-check" size={20} color="#3498DB" />
            <Text style={styles.noteText}>
              Recoge tu pedido en {restaurantName}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          disabled={isProcessing}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.payButton,
            (isProcessing || timeLeft <= 0) && styles.payButtonDisabled
          ]}
          onPress={handleProceedToPayment}
          disabled={isProcessing || timeLeft <= 0}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <Ionicons name="card" size={24} color="#FFF" />
              <Text style={styles.payButtonText}>Proceder al pago</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}