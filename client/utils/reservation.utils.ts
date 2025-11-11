// utils/reservation.utils.ts

import { RESERVATION_TIME, TIMER_COLORS, CURRENCY_CONFIG } from '@/constants/reservations.constants';
import type { OrderSummaryParams, OrderTotals, TimerState } from '@/types/reservation.types';

/**
 * ReservationUtils
 * Pure utility functions for reservation feature
 */
export class ReservationUtils {
  /**
   * Parse order params from navigation
   * ✅ CORREGIDO: Ahora calcula correctamente el total con descuento
   */
  static parseOrderParams(params: OrderSummaryParams): OrderTotals {
    const quantity = parseInt(params.quantity);
    const unitPrice = parseFloat(params.price);
    const originalPrice = params.originalPrice ? parseFloat(params.originalPrice) : null;

    // Calcular subtotal (precio original * cantidad)
    const subtotal = originalPrice 
      ? originalPrice * quantity  // Si hay precio original, usarlo para el subtotal
      : unitPrice * quantity;     // Si no, usar el precio actual

    // Calcular descuento (diferencia entre precio original y precio actual)
    const discount = originalPrice 
      ? (originalPrice - unitPrice) * quantity 
      : 0;

    // Calcular total (subtotal - descuento) o simplemente (precio actual * cantidad)
    const total = unitPrice * quantity;

    return {
      quantity,
      unitPrice,
      originalPrice,
      subtotal,
      discount,
      total,
    };
  }

  /**
   * Format time as MM:SS
   */
  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Get timer color based on remaining time
   */
  static getTimerColor(timeLeft: number): string {
    if (timeLeft > RESERVATION_TIME.WARNING_THRESHOLD) {
      return TIMER_COLORS.SAFE;
    }
    if (timeLeft > RESERVATION_TIME.DANGER_THRESHOLD) {
      return TIMER_COLORS.WARNING;
    }
    return TIMER_COLORS.DANGER;
  }

  /**
   * Get timer icon based on remaining time
   */
  static getTimerIcon(timeLeft: number): 'time' | 'alert-circle' {
    return timeLeft > RESERVATION_TIME.DANGER_THRESHOLD ? 'time' : 'alert-circle';
  }

  /**
   * Check if time is expired
   */
  static isTimeExpired(timeLeft: number): boolean {
    return timeLeft <= 0;
  }

  /**
   * Format currency
   */
  static formatCurrency(amount: number): string {
    return `${CURRENCY_CONFIG.SYMBOL}${amount.toLocaleString(CURRENCY_CONFIG.LOCALE)}`;
  }

  /**
   * Calculate time remaining in seconds
   */
  static calculateTimeRemaining(expiresAt: Date | string): number {
    const expirationTime = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;
    const now = new Date();
    const diff = expirationTime.getTime() - now.getTime();
    return Math.max(0, Math.floor(diff / 1000));
  }

  /**
   * Create timer state object
   */
  static createTimerState(timeLeft: number): TimerState {
    return {
      timeLeft,
      isExpired: this.isTimeExpired(timeLeft),
      timerColor: this.getTimerColor(timeLeft),
    };
  }
}