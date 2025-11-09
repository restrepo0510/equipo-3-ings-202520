// services/reservationAlertService.ts

import { Alert } from 'react-native';
import { RESERVATION_TEXT } from '@/constants/reservations.constants';

/**
 * ReservationAlertService
 * Centralized alert management for reservations
 * Single Responsibility: User notifications
 */
export class ReservationAlertService {
  /**
   * Show time expired alert
   */
  static showTimeExpired(onPress: () => void): void {
    Alert.alert(
      RESERVATION_TEXT.ALERTS.TIME_EXPIRED_TITLE,
      RESERVATION_TEXT.ALERTS.TIME_EXPIRED_MESSAGE,
      [
        {
          text: 'OK',
          onPress,
        },
      ]
    );
  }

  /**
   * Show cancel confirmation
   */
  static showCancelConfirmation(
    onCancel: () => void,
    onDismiss?: () => void
  ): void {
    Alert.alert(
      RESERVATION_TEXT.ALERTS.CANCEL_TITLE,
      RESERVATION_TEXT.ALERTS.CANCEL_MESSAGE,
      [
        { 
          text: RESERVATION_TEXT.ALERTS.CANCEL_NO, 
          style: 'cancel',
          onPress: onDismiss,
        },
        {
          text: RESERVATION_TEXT.ALERTS.CANCEL_YES,
          style: 'destructive',
          onPress: onCancel,
        },
      ]
    );
  }

  /**
   * Show reservation confirmed
   */
  static showReservationConfirmed(
    timeLeft: string,
    onContinue: () => void
  ): void {
    Alert.alert(
      RESERVATION_TEXT.ALERTS.CONFIRM_TITLE,
      RESERVATION_TEXT.ALERTS.CONFIRM_MESSAGE(timeLeft),
      [
        {
          text: RESERVATION_TEXT.ALERTS.CONFIRM_BUTTON,
          onPress: onContinue,
        },
      ]
    );
  }

  /**
   * Show coming soon (payment gateway)
   */
  static showComingSoon(onPress: () => void): void {
    Alert.alert(
      RESERVATION_TEXT.ALERTS.COMING_SOON_TITLE,
      RESERVATION_TEXT.ALERTS.COMING_SOON_MESSAGE,
      [
        {
          text: 'OK',
          onPress,
        },
      ]
    );
  }

  /**
   * Show processing error
   */
  static showProcessingError(): void {
    Alert.alert(
      RESERVATION_TEXT.ALERTS.ERROR_TITLE,
      RESERVATION_TEXT.ALERTS.ERROR_MESSAGE
    );
  }

  /**
   * Show expired error
   */
  static showExpiredError(): void {
    Alert.alert(
      RESERVATION_TEXT.ALERTS.ERROR_TITLE,
      RESERVATION_TEXT.ALERTS.ERROR_EXPIRED
    );
  }
}