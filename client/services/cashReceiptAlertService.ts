// services/cashReceiptAlertService.ts

import { CustomAlertHelper } from '@/components/ui/customAlert';
import { CASH_RECEIPT_TEXT } from '@/constants/cashReceipt.constants';

/**
 * CashReceiptAlertService
 * 
 * Centralized alert management for cash receipt feature
 * Uses constants for consistency and easy i18n support
 */
export class CashReceiptAlertService {
  /**
   * Show receipt created success
   */
  static showReceiptCreated(receiptCode: string, onContinue: () => void): void {
    CustomAlertHelper.success(
      CASH_RECEIPT_TEXT.ALERTS.CREATED_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.CREATED_MESSAGE(receiptCode),
      onContinue
    );
  }

  /**
   * Show receipt generation error
   */
  static showReceiptError(customMessage?: string): void {
    CustomAlertHelper.error(
      CASH_RECEIPT_TEXT.ALERTS.ERROR_TITLE,
      customMessage || CASH_RECEIPT_TEXT.ALERTS.ERROR_MESSAGE
    );
  }

  /**
   * Show PDF download success
   */
  static showPDFDownloadSuccess(): void {
    CustomAlertHelper.success(
      CASH_RECEIPT_TEXT.ALERTS.PDF_SUCCESS_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.PDF_SUCCESS_MESSAGE
    );
  }

  /**
   * Show PDF download error
   */
  static showPDFDownloadError(): void {
    CustomAlertHelper.error(
      CASH_RECEIPT_TEXT.ALERTS.PDF_ERROR_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.PDF_ERROR_MESSAGE
    );
  }

  /**
   * Show receipt expired warning
   */
  static showReceiptExpired(onClose: () => void): void {
    CustomAlertHelper.warning(
      CASH_RECEIPT_TEXT.ALERTS.EXPIRED_TITLE,
      CASH_RECEIPT_TEXT.WARNINGS.EXPIRED,
      onClose
    );
  }

  /**
   * Show receipt cancellation confirmation
   */
  static showCancelConfirmation(
    onConfirm: () => void,
    onCancel?: () => void
  ): void {
    CustomAlertHelper.confirm(
      CASH_RECEIPT_TEXT.ALERTS.CANCEL_CONFIRM_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.CANCEL_CONFIRM_MESSAGE,
      onConfirm,
      onCancel
    );
  }

  /**
   * Show receipt cancelled success
   */
  static showReceiptCancelled(): void {
    CustomAlertHelper.success(
      CASH_RECEIPT_TEXT.ALERTS.CANCELLED_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.CANCELLED_MESSAGE
    );
  }

  /**
   * Show receipt validation success
   */
  static showReceiptValidated(receiptCode: string): void {
    CustomAlertHelper.success(
      CASH_RECEIPT_TEXT.ALERTS.VALIDATED_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.VALIDATED_MESSAGE(receiptCode)
    );
  }

  /**
   * Show invalid receipt code
   */
  static showInvalidReceiptCode(): void {
    CustomAlertHelper.error(
      CASH_RECEIPT_TEXT.ALERTS.INVALID_CODE_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.INVALID_CODE_MESSAGE
    );
  }

  /**
   * Show receipt not found
   */
  static showReceiptNotFound(): void {
    CustomAlertHelper.error(
      CASH_RECEIPT_TEXT.ALERTS.NOT_FOUND_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.NOT_FOUND_MESSAGE
    );
  }

  /**
   * Show receipt already validated
   */
  static showReceiptAlreadyValidated(): void {
    CustomAlertHelper.warning(
      CASH_RECEIPT_TEXT.ALERTS.ALREADY_VALIDATED_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.ALREADY_VALIDATED_MESSAGE
    );
  }

  /**
   * Show receipt cannot be validated
   */
  static showReceiptCannotBeValidated(customReason?: string): void {
    CustomAlertHelper.warning(
      CASH_RECEIPT_TEXT.ALERTS.CANNOT_VALIDATE_TITLE,
      customReason || CASH_RECEIPT_TEXT.ALERTS.CANNOT_VALIDATE_MESSAGE
    );
  }

  /**
   * Show expiration warning
   */
  static showExpirationWarning(timeRemaining: string): void {
    CustomAlertHelper.warning(
      '⚠️ Recibo Por Expirar',
      CASH_RECEIPT_TEXT.WARNINGS.EXPIRING_SOON(timeRemaining)
    );
  }

  /**
   * Show QR code information
   */
  static showQRCodeInfo(): void {
    CustomAlertHelper.info(
      'Código QR',
      CASH_RECEIPT_TEXT.QR.INFO_MESSAGE
    );
  }

  /**
   * Show share instructions
   */
  static showShareInstructions(): void {
    CustomAlertHelper.info(
      CASH_RECEIPT_TEXT.SHARE.TITLE,
      CASH_RECEIPT_TEXT.WARNINGS.SHARE_WARNING
    );
  }

  /**
   * Show network error
   */
  static showNetworkError(): void {
    CustomAlertHelper.error(
      CASH_RECEIPT_TEXT.ALERTS.NETWORK_ERROR_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.NETWORK_ERROR_MESSAGE
    );
  }

  /**
   * Show invalid amount
   */
  static showInvalidAmount(): void {
    CustomAlertHelper.error(
      CASH_RECEIPT_TEXT.ALERTS.INVALID_AMOUNT_TITLE,
      CASH_RECEIPT_TEXT.ALERTS.INVALID_AMOUNT_MESSAGE
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