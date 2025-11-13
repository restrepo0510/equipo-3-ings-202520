// services/paymentAlertService.ts

import { CustomAlertHelper } from '@/components/ui/customAlert';
import { PAYMENT_TEXT } from '@/constants/payment.constants';

/**
 * PaymentAlertService
 * 
 * Centralized alert management for payment feature
 * Uses constants for consistency and easy i18n support
 */
export class PaymentAlertService {
  /**
   * Show cash payment confirmation
   */
  static showCashPaymentConfirmation(
    restaurantName: string,
    amount: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): void {
    CustomAlertHelper.confirm(
      PAYMENT_TEXT.ALERTS.CASH_CONFIRM_TITLE,
      PAYMENT_TEXT.ALERTS.CASH_CONFIRM_MESSAGE(restaurantName, amount),
      onConfirm,
      onCancel
    );
  }

  /**
   * Show card payment confirmation
   */
  static showCardPaymentConfirmation(
    amount: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): void {
    CustomAlertHelper.confirm(
      PAYMENT_TEXT.ALERTS.CARD_CONFIRM_TITLE,
      PAYMENT_TEXT.ALERTS.CARD_CONFIRM_MESSAGE(amount),
      onConfirm,
      onCancel
    );
  }

  /**
   * Show payment success
   */
  static showPaymentSuccess(onContinue: () => void): void {
    CustomAlertHelper.success(
      PAYMENT_TEXT.ALERTS.SUCCESS_TITLE,
      PAYMENT_TEXT.ALERTS.SUCCESS_MESSAGE,
      onContinue
    );
  }

  /**
   * Show payment error
   */
  static showPaymentError(customMessage?: string): void {
    CustomAlertHelper.error(
      PAYMENT_TEXT.ALERTS.ERROR_TITLE,
      customMessage || PAYMENT_TEXT.ALERTS.ERROR_MESSAGE
    );
  }

  /**
   * Show invalid amount error
   */
  static showInvalidAmount(): void {
    CustomAlertHelper.error(
      PAYMENT_TEXT.ALERTS.INVALID_AMOUNT_TITLE,
      PAYMENT_TEXT.ALERTS.INVALID_AMOUNT_MESSAGE
    );
  }

  /**
   * Show network error
   */
  static showNetworkError(): void {
    CustomAlertHelper.error(
      PAYMENT_TEXT.ALERTS.NETWORK_ERROR_TITLE,
      PAYMENT_TEXT.ALERTS.NETWORK_ERROR_MESSAGE
    );
  }

  /**
   * Show Stripe initialization error
   */
  static showStripeInitError(): void {
    CustomAlertHelper.error(
      PAYMENT_TEXT.ALERTS.STRIPE_INIT_ERROR_TITLE,
      PAYMENT_TEXT.ALERTS.STRIPE_INIT_ERROR_MESSAGE
    );
  }

  /**
   * Show Stripe redirect confirmation
   */
  static showStripeRedirect(): void {
    CustomAlertHelper.info(
      PAYMENT_TEXT.ALERTS.STRIPE_REDIRECT_TITLE,
      PAYMENT_TEXT.ALERTS.STRIPE_REDIRECT_MESSAGE
    );
  }

  /**
   * Show payment cancelled
   */
  static showPaymentCancelled(): void {
    CustomAlertHelper.warning(
      PAYMENT_TEXT.ALERTS.CANCELLED_TITLE,
      PAYMENT_TEXT.ALERTS.CANCELLED_MESSAGE
    );
  }

  /**
   * Show insufficient data error
   */
  static showInsufficientData(): void {
    CustomAlertHelper.error(
      PAYMENT_TEXT.ALERTS.INSUFFICIENT_DATA_TITLE,
      PAYMENT_TEXT.ALERTS.INSUFFICIENT_DATA_MESSAGE
    );
  }

  /**
   * Show location error
   */
  static showLocationError(): void {
    CustomAlertHelper.warning(
      PAYMENT_TEXT.ALERTS.LOCATION_ERROR_TITLE,
      PAYMENT_TEXT.ALERTS.LOCATION_ERROR_MESSAGE
    );
  }

  /**
   * Show generic error
   */
  static showError(title: string, message: string): void {
    CustomAlertHelper.error(title, message);
  }

  /**
   * Show generic success
   */
  static showSuccess(title: string, message: string, onPress?: () => void): void {
    CustomAlertHelper.success(title, message, onPress);
  }
}