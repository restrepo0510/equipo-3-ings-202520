// utils/payment.utils.ts

import type { PaymentScreenParams, DeliveryLocation } from '@/types/payment.types';

/**
 * Payment Utilities
 * Helper functions for payment processing
 */
export class PaymentUtils {
  /**
   * Parses payment parameters from navigation
   */
  static parsePaymentParams(params: PaymentScreenParams) {
    const latitude = this.getLocationValue(params, [
      'deliveryLatitude',
      'restaurantLatitude'
    ]);
    
    const longitude = this.getLocationValue(params, [
      'deliveryLongitude', 
      'restaurantLongitude'
    ]);

    return {
      productName: params.productName,
      quantity: parseInt(params.quantity) || 1,
      subtotal: parseFloat(params.subtotal) || 0,
      discount: parseFloat(params.discount) || 0,
      total: parseFloat(params.total) || 0,
      restaurantName: params.restaurantName,
      deliveryLocation: {
        latitude: latitude,
        longitude: longitude,
      },
    };
  }

  /**
   * Helper para obtener valores de ubicación de diferentes propiedades
   */
private static getLocationValue(params: PaymentScreenParams, possibleKeys: string[]): number {
  console.log('🔍 Buscando coordenadas en:', possibleKeys);
  
  for (const key of possibleKeys) {
    const value = params[key as keyof PaymentScreenParams];
    console.log(`🔍 ${key}:`, value);
    
    if (value !== undefined && value !== null && value !== '') {
      const numericValue = parseFloat(value as string);
      console.log(`✅ ${key} convertido a:`, numericValue);
      if (!isNaN(numericValue)) return numericValue;
    }
  }
  
  // Fallback a coordenadas por defecto
  const fallback = possibleKeys.includes('latitude') ? 4.6097 : -74.0817;
  console.log('⚠️ Usando fallback:', fallback);
  return fallback;
}

  // ... resto de los métodos (formatCurrency, isValidAmount, etc.)

  /**
   * Formats currency for display
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Validates payment amount
   */
  static isValidAmount(amount: number): boolean {
    return amount > 0 && amount <= 100000000; // 100 million COP max
  }

  /**
   * Converts COP to cents for Stripe
   */
  static convertToCents(amount: number): number {
    return Math.round(amount * 100); // Stripe expects amount in cents
  }

  /**
   * Validates delivery location
   */
  static isValidLocation(latitude: number, longitude: number): boolean {
    return (
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
  }

  /**
   * Validates payment parameters
   */
  static isValidPaymentParams(params: PaymentScreenParams): boolean {
    const parsed = this.parsePaymentParams(params);
    return (
      parsed.productName.length > 0 &&
      parsed.quantity > 0 &&
      parsed.total > 0 &&
      parsed.restaurantName.length > 0 &&
      this.isValidLocation(
        parsed.deliveryLocation.latitude,
        parsed.deliveryLocation.longitude
      )
    );
  }

  /**
   * Gets delivery location from params
   */
  static getDeliveryLocation(params: PaymentScreenParams): DeliveryLocation {
    const latitude = this.getLocationValue(params, [
      'deliveryLatitude',
      'restaurantLatitude'
    ]);
    
    const longitude = this.getLocationValue(params, [
      'deliveryLongitude', 
      'restaurantLongitude'
    ]);

    return {
      latitude,
      longitude,
      address: params.restaurantAddress
    };
  }
  // En payment.utils.ts - agregar este método:

/**
 * Validates and converts UnknownOutputParams to PaymentScreenParams
 */
static validateAndConvertParams(params: any): PaymentScreenParams {
  // Validar que los parámetros requeridos estén presentes
  const requiredParams = [
    'orderId', 'productId', 'productName', 'restaurantId', 
    'restaurantName', 'quantity', 'unitPrice', 'subtotal', 
    'discount', 'total'
  ];

  for (const param of requiredParams) {
    if (!params[param]) {
      console.warn(`⚠️ Missing required parameter: ${param}`);
    }
  }

  // Convertir y retornar como PaymentScreenParams
  return {
    orderId: params.orderId as string || '',
    productId: params.productId as string || '',
    productName: params.productName as string || '',
    productImage: params.productImage as string,
    restaurantId: params.restaurantId as string || '',
    restaurantName: params.restaurantName as string || '',
    restaurantAddress: params.restaurantAddress as string,
    restaurantLatitude: params.restaurantLatitude as string,
    restaurantLongitude: params.restaurantLongitude as string,
    quantity: params.quantity as string || '1',
    unitPrice: params.unitPrice as string || '0',
    subtotal: params.subtotal as string || '0',
    discount: params.discount as string || '0',
    total: params.total as string || '0',
    deliveryLatitude: params.deliveryLatitude as string,
    deliveryLongitude: params.deliveryLongitude as string,
    estimatedDeliveryTime: params.estimatedDeliveryTime as string,
  };
}
}
