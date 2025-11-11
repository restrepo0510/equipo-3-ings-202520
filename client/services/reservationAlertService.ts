// services/reservationAlertService.ts

import { CustomAlertHelper } from '@/components/ui/CustomAlert';
import { RESERVATION_TEXT } from '@/constants/reservations.constants';

/**
 * ReservationAlertService
 * Centralized alert management for reservations using CustomAlert
 * Single Responsibility: User notifications
 */
export class ReservationAlertService {
  /**
   * Show time expired alert
   */
  static showTimeExpired(onPress: () => void): void {
    CustomAlertHelper.error(
      RESERVATION_TEXT.ALERTS.TIME_EXPIRED_TITLE,
      RESERVATION_TEXT.ALERTS.TIME_EXPIRED_MESSAGE,
      onPress
    );
  }

  /**
   * Show cancel confirmation
   */
  static showCancelConfirmation(
    onCancel: () => void,
    onDismiss?: () => void
  ): void {
    CustomAlertHelper.confirm(
      RESERVATION_TEXT.ALERTS.CANCEL_TITLE,
      RESERVATION_TEXT.ALERTS.CANCEL_MESSAGE,
      onCancel,
      onDismiss
    );
  }

  /**
   * Show reservation confirmed
   */
  static showReservationConfirmed(
    timeLeft: string,
    onContinue: () => void
  ): void {
    CustomAlertHelper.success(
      RESERVATION_TEXT.ALERTS.CONFIRM_TITLE,
      RESERVATION_TEXT.ALERTS.CONFIRM_MESSAGE(timeLeft),
      onContinue
    );
  }

  /**
   * Show coming soon (payment gateway)
   */
  static showComingSoon(onPress: () => void): void {
    CustomAlertHelper.info(
      RESERVATION_TEXT.ALERTS.COMING_SOON_TITLE,
      RESERVATION_TEXT.ALERTS.COMING_SOON_MESSAGE,
      onPress
    );
  }

  /**
   * Show processing error
   */
  static showProcessingError(): void {
    CustomAlertHelper.error(
      RESERVATION_TEXT.ALERTS.ERROR_TITLE,
      RESERVATION_TEXT.ALERTS.ERROR_MESSAGE
    );
  }

  /**
   * Show expired error
   */
  static showExpiredError(): void {
    CustomAlertHelper.error(
      RESERVATION_TEXT.ALERTS.ERROR_TITLE,
      RESERVATION_TEXT.ALERTS.ERROR_EXPIRED
    );
  }
}