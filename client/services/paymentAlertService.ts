// services/paymentAlertService.ts

import { CustomAlertHelper } from '@/components/ui/customAlert';
import { PAYMENT_TEXT } from '@/constants/payment.constants';

/**
 * PaymentAlertService
 * Centralized alert management for payment feature using CustomAlert
 */
export class PaymentAlertService {
  /**
   * Shows cash payment confirmation dialog
   */
  static showCashPaymentConfirmation(onConfirm: () => void): void {
    CustomAlertHelper.confirm(
      PAYMENT_TEXT.ALERTS.CASH_TITLE,
      PAYMENT_TEXT.ALERTS.CASH_MESSAGE,
      onConfirm
    );
  }

  /**
   * Shows payment success alert
   */
  static showPaymentSuccess(onDismiss?: () => void): void {
    CustomAlertHelper.success(
      PAYMENT_TEXT.ALERTS.SUCCESS_TITLE,
      PAYMENT_TEXT.ALERTS.SUCCESS_MESSAGE,
      onDismiss
    );
  }

  /**
   * Shows payment error alert
   */
  static showPaymentError(message?: string): void {
    CustomAlertHelper.error(
      PAYMENT_TEXT.ALERTS.ERROR_TITLE,
      message || PAYMENT_TEXT.ALERTS.ERROR_MESSAGE
    );
  }

  /**
   * Shows Stripe redirect notification
   */
  static showStripeRedirect(): void {
    CustomAlertHelper.info(
      PAYMENT_TEXT.ALERTS.STRIPE_REDIRECT_TITLE,
      PAYMENT_TEXT.ALERTS.STRIPE_REDIRECT_MESSAGE
    );
  }

  /**
   * Shows invalid amount error
   */
  static showInvalidAmount(): void {
    CustomAlertHelper.error(
      'Monto inválido',
      'El monto del pedido no es válido.'
    );
  }

  /**
   * Shows generic error with custom message
   */
  static showError(title: string, message: string): void {
    CustomAlertHelper.error(title, message);
  }

  /**
   * Shows payment processing notification
   */
  static showProcessing(): void {
    CustomAlertHelper.info(
      'Procesando pago',
      'Por favor espera mientras procesamos tu pago...'
    );
  }

  /**
   * Shows confirmation dialog with custom actions
   */
  static showConfirmation(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): void {
    CustomAlertHelper.confirm(
      title,
      message,
      onConfirm,
      onCancel
    );
  }
}