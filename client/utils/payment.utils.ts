// utils/payment.utils.ts

import type { PaymentScreenParams, DeliveryLocation } from '@/types/payment.types';
import { PAYMENT_CONFIG } from '@/constants/payment.constants';

/**
 * Payment Utilities
 * Helper functions for payment processing with improved coordinate parsing
 */
export class PaymentUtils {
  /**
   * Safely parses a coordinate value from various input types
   * Handles strings, numbers, arrays, undefined, and null
   * 
   * @param value - The value to parse
   * @param fallback - Fallback value if parsing fails
   * @returns Parsed number or fallback
   */
  private static parseCoordinate(
    value: string | number | string[] | undefined | null,
    fallback: number
  ): number {
    // Handle null or undefined
    if (value === null || value === undefined || value === '') {
      console.warn('⚠️ Coordinate value is null/undefined/empty, using fallback:', fallback);
      return fallback;
    }

    // Handle array (from Expo Router params)
    if (Array.isArray(value)) {
      if (value.length === 0) {
        console.warn('⚠️ Coordinate array is empty, using fallback:', fallback);
        return fallback;
      }
      value = value[0];
    }

    // Handle number
    if (typeof value === 'number') {
      if (isNaN(value)) {
        console.warn('⚠️ Coordinate is NaN, using fallback:', fallback);
        return fallback;
      }
      return value;
    }

    // Handle string
    if (typeof value === 'string') {
      // Remove any whitespace
      const trimmed = value.trim();
      
      if (trimmed === '') {
        console.warn('⚠️ Coordinate string is empty after trim, using fallback:', fallback);
        return fallback;
      }

      const parsed = parseFloat(trimmed);
      
      if (isNaN(parsed)) {
        console.warn('⚠️ Failed to parse coordinate string:', trimmed, 'using fallback:', fallback);
        return fallback;
      }

      return parsed;
    }

    console.warn('⚠️ Unexpected coordinate type:', typeof value, 'using fallback:', fallback);
    return fallback;
  }

  /**
   * Extracts location coordinates from params with multiple fallback strategies
   * 
   * @param params - Payment screen params
   * @returns Validated delivery location
   */
  private static extractDeliveryLocation(params: PaymentScreenParams): DeliveryLocation {
    console.log('📍 Extracting delivery location from params');
    console.log('📦 All params received:', Object.keys(params));
    
    // Log all coordinate-related params
    console.log('🗺️ Coordinate params:', {
      deliveryLatitude: params.deliveryLatitude,
      deliveryLongitude: params.deliveryLongitude,
      restaurantLatitude: params.restaurantLatitude,
      restaurantLongitude: params.restaurantLongitude,
      latitude: (params as any).latitude, // Check alternate param names
      longitude: (params as any).longitude,
    });
    
    // Strategy 1: Try deliveryLatitude/deliveryLongitude
    let latitude = this.parseCoordinate(
      params.deliveryLatitude,
      NaN
    );
    let longitude = this.parseCoordinate(
      params.deliveryLongitude,
      NaN
    );

    // Strategy 2: If delivery coords invalid, try restaurant coords
    if (!this.isValidLocation(latitude, longitude)) {
      console.log('⚠️ Delivery coordinates invalid, trying restaurant coordinates');
      
      latitude = this.parseCoordinate(
        params.restaurantLatitude,
        NaN
      );
      longitude = this.parseCoordinate(
        params.restaurantLongitude,
        NaN
      );
    }

    // Strategy 3: Try alternate param names (latitude/longitude without prefix)
    if (!this.isValidLocation(latitude, longitude)) {
      console.log('⚠️ Restaurant coordinates invalid, trying alternate param names');
      
      latitude = this.parseCoordinate(
        (params as any).latitude,
        NaN
      );
      longitude = this.parseCoordinate(
        (params as any).longitude,
        NaN
      );
    }

    // Strategy 4: If still invalid, use default coordinates
    if (!this.isValidLocation(latitude, longitude)) {
      console.warn('❌ All coordinate strategies failed, using default location (Medellín)');
      console.warn('💡 TIP: Make sure to pass restaurantLatitude and restaurantLongitude params');
      latitude = PAYMENT_CONFIG.DEFAULT_COORDINATES.latitude;
      longitude = PAYMENT_CONFIG.DEFAULT_COORDINATES.longitude;
    }

    const location = {
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
      address: params.restaurantAddress
    };

    console.log('✅ Final delivery location:', location);

    return location;
  }

  /**
   * Parses payment parameters from navigation
   * Now with improved coordinate extraction
   */
  static parsePaymentParams(params: PaymentScreenParams) {
    console.log('🔍 Parsing payment params:', {
      deliveryLat: params.deliveryLatitude,
      deliveryLon: params.deliveryLongitude,
      restaurantLat: params.restaurantLatitude,
      restaurantLon: params.restaurantLongitude,
    });

    const deliveryLocation = this.extractDeliveryLocation(params);

    const parsed = {
      productName: params.productName || 'Producto sin nombre',
      quantity: parseInt(params.quantity) || 1,
      subtotal: parseFloat(params.subtotal) || 0,
      discount: parseFloat(params.discount) || 0,
      total: parseFloat(params.total) || 0,
      restaurantName: params.restaurantName || 'Restaurante',
      deliveryLocation,
    };

    console.log('✅ Parsed payment params:', parsed);

    return parsed;
  }

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
    return !isNaN(amount) && amount > 0 && amount <= 100000000;
  }

  /**
   * Converts COP to cents for Stripe
   */
  static convertToCents(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Validates delivery location with proper range checks
   * 
   * @param latitude - Latitude coordinate
   * @param longitude - Longitude coordinate
   * @returns true if coordinates are valid
   */
  static isValidLocation(latitude: number, longitude: number): boolean {
    return (
      !isNaN(latitude) &&
      !isNaN(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180 &&
      // Additional check: not at origin (0, 0) unless intentional
      !(latitude === 0 && longitude === 0)
    );
  }

  /**
   * Validates payment parameters
   */
  static isValidPaymentParams(params: PaymentScreenParams): boolean {
    try {
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
    } catch (error) {
      console.error('❌ Error validating payment params:', error);
      return false;
    }
  }

  /**
   * Gets delivery location from params (legacy support)
   */
  static getDeliveryLocation(params: PaymentScreenParams): DeliveryLocation {
    return this.extractDeliveryLocation(params);
  }
  // En payment.utils.ts - agregar esta función
static createFocusedRegion(latitude: number, longitude: number): DeliveryLocation {
  return {
    latitude,
    longitude,
    latitudeDelta: 0.5,  // Más zoom que el default
    longitudeDelta: 0.5, // Más zoom que el default
  };
}

  /**
   * Validates and converts UnknownOutputParams to PaymentScreenParams
   */
  static validateAndConvertParams(params: any): PaymentScreenParams {
    console.log('🔄 Converting params to PaymentScreenParams');
    
    const requiredParams = [
      'orderId', 'productId', 'productName', 'restaurantId', 
      'restaurantName', 'quantity', 'unitPrice', 'subtotal', 
      'discount', 'total'
    ];

    // Warn about missing required params
    for (const param of requiredParams) {
      if (!params[param]) {
        console.warn(`⚠️ Missing required parameter: ${param}`);
      }
    }

    // Log coordinate params specifically
    console.log('📍 Coordinate params received:', {
      deliveryLatitude: params.deliveryLatitude,
      deliveryLongitude: params.deliveryLongitude,
      restaurantLatitude: params.restaurantLatitude,
      restaurantLongitude: params.restaurantLongitude,
    });

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