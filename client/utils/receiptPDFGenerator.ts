// utils/receiptPDFGenerator.ts
// Versión simplificada que usa solo expo-print y expo-sharing

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import type { CashReceipt } from '@/types/cashReceipt.types';

/**
 * Receipt PDF Generator usando solo expo-print
 * Versión simplificada sin FileSystem
 */
export class ReceiptPDFGenerator {
  /**
   * Format currency for display
   * Maneja valores NaN, undefined, null
   */
  private static formatCurrency(amount: number | string | undefined | null): string {
    // Convertir a número si es string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // Si es NaN, undefined o null, retornar $0
    if (!numAmount || isNaN(numAmount)) {
      console.warn('⚠️ Invalid amount for currency formatting:', amount);
      return '$0';
    }
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(numAmount);
  }

  /**
   * Format date for display
   */
  private static formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Validate and sanitize receipt data
   * Calcula valores faltantes si es necesario
   */
  private static validateReceipt(receipt: CashReceipt): CashReceipt {
    console.log('🔍 Validating receipt data:', receipt);
    
    // Convertir totalAmount a número si es string
    const totalAmount = typeof receipt.totalAmount === 'string' 
      ? parseFloat(receipt.totalAmount) 
      : (receipt.totalAmount || 0);

    // Convertir discount a número si existe
    const discount = receipt.discount 
      ? (typeof receipt.discount === 'string' ? parseFloat(receipt.discount) : receipt.discount)
      : 0;

    // Calcular subtotal si no existe
    let subtotal = receipt.subtotal 
      ? (typeof receipt.subtotal === 'string' ? parseFloat(receipt.subtotal) : receipt.subtotal)
      : 0;
    
    // Si subtotal es 0 o NaN, calcularlo desde totalAmount
    if (!subtotal || isNaN(subtotal)) {
      subtotal = totalAmount + discount;
    }

    // Calcular unitPrice si no existe
    const quantity = receipt.quantity || 1;
    let unitPrice = receipt.unitPrice
      ? (typeof receipt.unitPrice === 'string' ? parseFloat(receipt.unitPrice) : receipt.unitPrice)
      : 0;
    
    // Si unitPrice es 0 o NaN, calcularlo desde subtotal
    if (!unitPrice || isNaN(unitPrice)) {
      unitPrice = subtotal / quantity;
    }

    const sanitizedReceipt: CashReceipt = {
      ...receipt,
      totalAmount,
      discount,
      subtotal,
      unitPrice,
      quantity,
      restaurantAddress: receipt.restaurantAddress || 'Dirección no especificada',
    };

    console.log('✅ Sanitized receipt:', {
      totalAmount: sanitizedReceipt.totalAmount,
      discount: sanitizedReceipt.discount,
      subtotal: sanitizedReceipt.subtotal,
      unitPrice: sanitizedReceipt.unitPrice,
      quantity: sanitizedReceipt.quantity,
      restaurantAddress: sanitizedReceipt.restaurantAddress,
    });

    return sanitizedReceipt;
  }

  /**
   * Generate HTML content for PDF
   */
  private static generateHTML(receiptInput: CashReceipt): string {
    // Validar y sanitizar datos primero
    const receipt = this.validateReceipt(receiptInput);
    
    // Log para debug
    console.log('📄 Generating PDF HTML with data:', {
      receiptCode: receipt.receiptCode,
      restaurantName: receipt.restaurantName,
      restaurantAddress: receipt.restaurantAddress,
      productName: receipt.productName,
      quantity: receipt.quantity,
      unitPrice: receipt.unitPrice,
      subtotal: receipt.subtotal,
      discount: receipt.discount,
      totalAmount: receipt.totalAmount,
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
      padding: 20px;
      background: white;
      font-size: 14px;
    }
    
    .container {
      max-width: 100%;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 3px solid #1B5E20;
    }
    
    .header h1 {
      color: #1B5E20;
      font-size: 24px;
      margin-bottom: 10px;
    }
    
    .receipt-code {
      background: #E8F5E9;
      padding: 15px;
      text-align: center;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .receipt-code h2 {
      color: #1B5E20;
      font-size: 28px;
      letter-spacing: 2px;
      font-weight: bold;
    }
    
    .qr-code {
      text-align: center;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    
    .qr-code img {
      width: 180px;
      height: 180px;
      margin: 10px auto;
    }
    
    .section {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #2C3E50;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 2px solid #E0E0E0;
    }
    
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #F5F5F5;
    }
    
    .info-label {
      color: #7F8C8D;
      font-size: 13px;
    }
    
    .info-value {
      color: #2C3E50;
      font-size: 13px;
      font-weight: 600;
      text-align: right;
      max-width: 60%;
      word-wrap: break-word;
    }
    
    .total-row {
      background: #F5F5F5;
      padding: 12px;
      margin-top: 10px;
      border-radius: 5px;
    }
    
    .total-row .info-label {
      font-size: 15px;
      font-weight: bold;
      color: #2C3E50;
    }
    
    .total-row .info-value {
      font-size: 18px;
      font-weight: bold;
      color: #1B5E20;
    }
    
    .discount {
      color: #27AE60 !important;
    }
    
    .instructions {
      background: #E3F2FD;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    
    .instructions h3 {
      color: #1976D2;
      margin-bottom: 12px;
      font-size: 15px;
    }
    
    .instructions ol {
      margin-left: 20px;
    }
    
    .instructions li {
      margin-bottom: 8px;
      color: #2C3E50;
      line-height: 1.5;
      font-size: 13px;
    }
    
    .warning {
      background: #FFEBEE;
      padding: 12px;
      border-radius: 8px;
      border-left: 4px solid #E74C3C;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    
    .warning p {
      color: #C62828;
      font-weight: bold;
      font-size: 13px;
    }
    
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 2px solid #E0E0E0;
      color: #7F8C8D;
      font-size: 11px;
    }
    
    @media print {
      body {
        padding: 10px;
      }
      .page-break {
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>RECIBO DE PAGO EN EFECTIVO</h1>
    </div>
    
    <!-- Receipt Code -->
    <div class="receipt-code">
      <p style="color: #7F8C8D; margin-bottom: 8px; font-size: 12px;">Código de Recibo</p>
      <h2>${receipt.receiptCode}</h2>
    </div>
    
    <!-- QR Code -->
    <div class="qr-code">
      <p style="color: #2C3E50; margin-bottom: 8px; font-weight: bold; font-size: 13px;">
        Escanea este código en el restaurante
      </p>
      <img src="${receipt.qrCodeData}" alt="QR Code" />
    </div>
    
    <!-- Restaurant Info -->
    <div class="section">
      <div class="section-title">Información del Restaurante</div>
      <div class="info-row">
        <span class="info-label">Restaurante:</span>
        <span class="info-value">${receipt.restaurantName || 'N/A'}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Dirección:</span>
        <span class="info-value">${receipt.restaurantAddress || 'No especificada'}</span>
      </div>
    </div>
    
    <!-- Order Details -->
    <div class="section">
      <div class="section-title">Detalles del Pedido</div>
      <div class="info-row">
        <span class="info-label">Producto:</span>
        <span class="info-value">${receipt.productName || 'N/A'}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Cantidad:</span>
        <span class="info-value">${receipt.quantity || 0}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Precio Unitario:</span>
        <span class="info-value">${this.formatCurrency(receipt.unitPrice)}</span>
      </div>
    </div>
    
    <!-- Pricing -->
    <div class="section">
      <div class="section-title">Resumen de Pago</div>
      <div class="info-row">
        <span class="info-label">Subtotal:</span>
        <span class="info-value">${this.formatCurrency(receipt.subtotal)}</span>
      </div>
      ${receipt.discount > 0 ? `
      <div class="info-row">
        <span class="info-label discount">Descuento:</span>
        <span class="info-value discount">-${this.formatCurrency(receipt.discount)}</span>
      </div>
      ` : ''}
      <div class="total-row">
        <div class="info-row" style="border: none;">
          <span class="info-label">TOTAL A PAGAR:</span>
          <span class="info-value">${this.formatCurrency(receipt.totalAmount)}</span>
        </div>
      </div>
    </div>
    
    <!-- Instructions -->
    <div class="instructions">
      <h3>📋 Instrucciones de Pago</h3>
      <ol>
        <li>Dirígete al restaurante con este recibo</li>
        <li>Presenta el código QR o menciona el código de recibo</li>
        <li>Realiza el pago en efectivo por el monto total indicado</li>
        <li>El personal validará tu recibo y te entregará tu pedido</li>
      </ol>
    </div>
    
    <!-- Warning -->
    <div class="warning">
      <p>⚠️ IMPORTANTE: Este recibo expira el ${this.formatDate(receipt.expiresAt)}</p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p>Este es un comprobante de reserva de pedido</p>
      <p>El pago debe realizarse en el local</p>
      <p>Fecha de emisión: ${this.formatDate(receipt.createdAt)}</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate PDF file (retorna URI temporal)
   * El archivo se guarda en cache temporal del sistema
   */
  static async generatePDF(receipt: CashReceipt): Promise<string> {
    try {
      console.log('📄 Generating PDF for receipt:', receipt.receiptCode);
      
      const html = this.generateHTML(receipt);
      
      // Generate PDF en ubicación temporal
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      console.log('✅ PDF generated at:', uri);
      
      return uri;
    } catch (error) {
      console.error('❌ Error generating PDF:', error);
      throw new Error('No se pudo generar el PDF');
    }
  }

  /**
   * Generate and share PDF
   * Opens share dialog
   */
  static async generateAndSharePDF(receipt: CashReceipt): Promise<void> {
    try {
      const uri = await this.generatePDF(receipt);
      
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Recibo ${receipt.receiptCode}`,
          UTI: 'com.adobe.pdf',
        });
      } else {
        throw new Error('Sharing no disponible en este dispositivo');
      }
    } catch (error) {
      console.error('❌ Error sharing PDF:', error);
      throw error;
    }
  }

  /**
   * Generate and print PDF
   * Opens print dialog
   */
  static async printPDF(receipt: CashReceipt): Promise<void> {
    try {
      const html = this.generateHTML(receipt);
      
      await Print.printAsync({
        html,
      });
    } catch (error) {
      console.error('❌ Error printing PDF:', error);
      throw error;
    }
  }
}

/**
 * Installation Instructions:
 * 
 * npx expo install expo-print expo-sharing
 * 
 * No additional configuration required for Expo
 */