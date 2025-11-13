// components/payment/CashReceiptModal.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CashReceipt } from '@/types/cashReceipt.types';
import { ReceiptPDFGenerator } from '@/utils/receiptPDFGenerator';
import { styles } from '@/styles/cashReceipt.styles';

interface CashReceiptModalProps {
  visible: boolean;
  receipt: CashReceipt | null;
  token: string;
  onClose: () => void;
  onGoHome: () => void;
}

/**
 * CashReceiptModal Component
 * 
 * Modal simplificado - solo botón de descarga PDF
 */
export const CashReceiptModal: React.FC<CashReceiptModalProps> = ({
  visible,
  receipt,
  token,
  onClose,
  onGoHome,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // 🔍 DEBUG: Ver qué datos está recibiendo el componente
  React.useEffect(() => {
    if (receipt) {
      console.log('📋 Receipt data received in modal:', {
        receiptCode: receipt.receiptCode,
        restaurantName: receipt.restaurantName,
        restaurantAddress: receipt.restaurantAddress,
        productName: receipt.productName,
        quantity: receipt.quantity,
        unitPrice: receipt.unitPrice,
        subtotal: receipt.subtotal,
        discount: receipt.discount,
        totalAmount: receipt.totalAmount,
        types: {
          quantity: typeof receipt.quantity,
          unitPrice: typeof receipt.unitPrice,
          subtotal: typeof receipt.subtotal,
          discount: typeof receipt.discount,
          totalAmount: typeof receipt.totalAmount,
        },
        validations: {
          hasUnitPrice: !!receipt.unitPrice && receipt.unitPrice > 0,
          hasSubtotal: !!receipt.subtotal && receipt.subtotal > 0,
          hasAddress: !!receipt.restaurantAddress,
        }
      });
    }
  }, [receipt]);

  if (!receipt) return null;

  /**
   * Format currency
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  /**
   * Format date
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Calculate time remaining
   */
  const getTimeRemaining = (): string => {
    const now = new Date();
    const expires = new Date(receipt.expiresAt);
    const diff = expires.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expirado';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m restantes`;
  };

  /**
   * Share receipt code
   */
  const handleShareCode = async (): Promise<void> => {
    try {
      await Share.share({
        message: `Mi código de recibo: ${receipt.receiptCode}\n\nRestaurante: ${receipt.restaurantName}\nTotal: ${formatCurrency(receipt.totalAmount)}\n\nVálido hasta: ${formatDate(receipt.expiresAt)}`,
        title: 'Compartir Recibo',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  /**
   * Download/Share PDF (usa la lógica que funcionaba)
   */
  const handleDownloadPDF = async (): Promise<void> => {
    try {
      setIsDownloading(true);

      // Generar PDF y abrir diálogo de compartir inmediatamente
      await ReceiptPDFGenerator.generateAndSharePDF(receipt);

    } catch (error) {
      console.error('❌ Error sharing PDF:', error);
      Alert.alert(
        'Error',
        'No se pudo generar el PDF. Por favor intenta de nuevo.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Handle go to home
   */
  const handleGoToHome = (): void => {
    onClose();
    onGoHome();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recibo de Pago</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Success Icon */}
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color="#27AE60" />
          </View>

          <Text style={styles.successTitle}>¡Reserva Confirmada!</Text>
          <Text style={styles.successSubtitle}>
            Presenta este recibo en el restaurante
          </Text>

          {/* Receipt Code Card */}
          <View style={styles.codeCard}>
            <Text style={styles.codeLabel}>Código de Recibo</Text>
            <Text style={styles.codeValue}>{receipt.receiptCode}</Text>
            
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleShareCode}
            >
              <Ionicons name="share-outline" size={20} color="#1B5E20" />
              <Text style={styles.copyButtonText}>Compartir Código</Text>
            </TouchableOpacity>
          </View>

          {/* QR Code */}
          <View style={styles.qrCard}>
            <Text style={styles.qrLabel}>Escanea en el restaurante</Text>
            <Image
              source={{ uri: receipt.qrCodeData }}
              style={styles.qrCode}
              resizeMode="contain"
            />
          </View>

          {/* Timer */}
          <View style={styles.timerCard}>
            <Ionicons name="time-outline" size={24} color="#F39C12" />
            <View style={styles.timerContent}>
              <Text style={styles.timerLabel}>Tiempo restante</Text>
              <Text style={styles.timerValue}>{getTimeRemaining()}</Text>
            </View>
          </View>

          {/* Order Details */}
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Detalles del Pedido</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Restaurante:</Text>
              <Text style={styles.detailValue}>{receipt.restaurantName}</Text>
            </View>

            {receipt.restaurantAddress && (
              <View style={styles.detailRow}>
                <Ionicons name="location" size={16} color="#7F8C8D" />
                <Text style={styles.addressText}>{receipt.restaurantAddress}</Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Producto:</Text>
              <Text style={styles.detailValue}>{receipt.productName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Cantidad:</Text>
              <Text style={styles.detailValue}>{receipt.quantity}</Text>
            </View>

            <View style={styles.divider} />

            {/* Pricing */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Subtotal:</Text>
              <Text style={styles.detailValue}>
                {formatCurrency(receipt.subtotal)}
              </Text>
            </View>

            {receipt.discount > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.discountLabel}>Descuento:</Text>
                <Text style={styles.discountValue}>
                  -{formatCurrency(receipt.discount)}
                </Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(receipt.totalAmount)}
              </Text>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsCard}>
            <Text style={styles.instructionsTitle}>
              📋 Instrucciones:
            </Text>
            <InstructionItem
              number="1"
              text="Dirígete al restaurante con este recibo"
            />
            <InstructionItem
              number="2"
              text="Presenta el código QR o el código de recibo"
            />
            <InstructionItem
              number="3"
              text="Realiza el pago en efectivo por el monto total"
            />
            <InstructionItem
              number="4"
              text="Recibe tu pedido una vez validado el pago"
            />
          </View>

          {/* Important Notice */}
          <View style={styles.warningCard}>
            <Ionicons name="warning" size={24} color="#E74C3C" />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>Importante</Text>
              <Text style={styles.warningText}>
                Este recibo expira el {formatDate(receipt.expiresAt)}
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.downloadButton,
              isDownloading && styles.downloadButtonDisabled,
            ]}
            onPress={handleDownloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="download-outline" size={24} color="#FFF" />
                <Text style={styles.downloadButtonText}>Descargar PDF</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleGoToHome}
          >
            <Ionicons name="home-outline" size={24} color="#1B5E20" />
            <Text style={styles.homeButtonText}>Ir al Inicio</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

/**
 * Instruction Item Component
 */
interface InstructionItemProps {
  number: string;
  text: string;
}

const InstructionItem: React.FC<InstructionItemProps> = ({ number, text }) => (
  <View style={styles.instructionItem}>
    <View style={styles.instructionNumber}>
      <Text style={styles.instructionNumberText}>{number}</Text>
    </View>
    <Text style={styles.instructionText}>{text}</Text>
  </View>
);