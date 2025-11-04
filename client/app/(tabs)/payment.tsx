import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export default function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta'>('efectivo');

  const subtotal = 15000;
  const total = 17000;

  const deliveryLocation = {
    latitude: 4.6097,
    longitude: -74.0817,
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(`${API_URL}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'cop',
        }),
      });

      const data = await response.json();
      return { clientSecret: data.clientSecret };
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      throw error;
    }
  };

  const initializePaymentSheet = async () => {
    const { clientSecret } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Tu Restaurante',
      style: 'automatic',
    });

    if (error) {
      Alert.alert('Error', error.message);
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'efectivo') {
      Alert.alert('Pago en Efectivo', 'Tu pedido será pagado en efectivo al momento de la entrega');
      return;
    }

    setLoading(true);

    try {
      const initialized = await initializePaymentSheet();
      
      if (!initialized) {
        setLoading(false);
        return;
      }

      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('¡Éxito!', 'Tu pago fue procesado correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Ocurrió un error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Paga</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Mapa */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: deliveryLocation.latitude,
              longitude: deliveryLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={deliveryLocation} />
          </MapView>
        </View>

        {/* Info de entrega */}
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryText}>Entrega Estimada</Text>
          <Text style={styles.deliveryTime}>40min ⏱</Text>
        </View>

        {/* Totales */}
        <View style={styles.totalsContainer}>
          <Text style={styles.subtotal}>SUBTOTAL: ${subtotal.toLocaleString('es-CO')}</Text>
          <Text style={styles.total}>TOTAL: ${total.toLocaleString('es-CO')}</Text>
        </View>

        {/* Métodos de pago */}
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              paymentMethod === 'efectivo' && styles.paymentButtonActive,
            ]}
            onPress={() => setPaymentMethod('efectivo')}
          >
            <Text
              style={[
                styles.paymentButtonText,
                paymentMethod === 'efectivo' && styles.paymentButtonTextActive,
              ]}
            >
              EFECTIVO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              styles.paymentButtonDark,
              paymentMethod === 'tarjeta' && styles.paymentButtonActive,
            ]}
            onPress={() => setPaymentMethod('tarjeta')}
          >
            <Text style={styles.paymentButtonTextWhite}>TARJETA</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de proceder */}
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.proceedButtonText}>PROCEDER CON EL PAGO</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  mapContainer: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#333',
  },
  map: {
    flex: 1,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalsContainer: {
    marginBottom: 20,
  },
  subtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#9DC183',
    alignItems: 'center',
  },
  paymentButtonDark: {
    backgroundColor: '#2C2C2C',
  },
  paymentButtonActive: {
    borderWidth: 3,
    borderColor: '#000',
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentButtonTextActive: {
    color: '#000',
  },
  paymentButtonTextWhite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  proceedButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
