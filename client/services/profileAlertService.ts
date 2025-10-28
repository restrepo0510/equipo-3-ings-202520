// services/profileAlertService.ts

import { Alert } from 'react-native';
import { PROFILE_TEXT, ProfileImageError } from '@/constants/profile.constants';

/**
 * ProfileAlertService
 * 
 * Centralized alert management for profile screens
 * Single Responsibility: User notifications
 */
export class ProfileAlertService {
  /**
   * Shows generic error alert
   */
  static showError(message: string): void {
    Alert.alert(PROFILE_TEXT.ALERTS.ERROR_TITLE, message);
  }

  /**
   * Shows generic success alert
   */
  static showSuccess(message: string): void {
    Alert.alert(PROFILE_TEXT.ALERTS.SUCCESS_TITLE, message);
  }

  /**
   * Shows logout confirmation dialog
   */
  static showLogoutConfirmation(onConfirm: () => void): void {
    Alert.alert(
      PROFILE_TEXT.ALERTS.LOGOUT_TITLE,
      PROFILE_TEXT.ALERTS.LOGOUT_MESSAGE,
      [
        {
          text: PROFILE_TEXT.ALERTS.LOGOUT_CANCEL,
          style: 'cancel',
        },
        {
          text: PROFILE_TEXT.ALERTS.LOGOUT_CONFIRM,
          style: 'destructive',
          onPress: onConfirm,
        },
      ]
    );
  }

  /**
   * Shows permission request alert
   */
  static showPermissionRequired(): void {
    Alert.alert(
      PROFILE_TEXT.ALERTS.PERMISSION_TITLE,
      PROFILE_TEXT.ALERTS.PERMISSION_MESSAGE
    );
  }

  /**
   * Shows image picker error alert
   */
  static showImagePickerError(error: ProfileImageError, customMessage?: string): void {
    let message: string;

    switch (error) {
      case ProfileImageError.PERMISSION_DENIED:
        this.showPermissionRequired();
        return;
      case ProfileImageError.FILE_TOO_LARGE:
        message = 'The selected image is too large. Please choose a smaller image.';
        break;
      case ProfileImageError.INVALID_FORMAT:
        message = 'Invalid image format. Please select a valid image file.';
        break;
      case ProfileImageError.PICKER_CANCELLED:
        // Don't show alert for user cancellation
        return;
      default:
        message = customMessage || PROFILE_TEXT.ALERTS.ERROR_IMAGE_SELECT;
    }

    this.showError(message);
  }

  /**
   * Shows profile update success
   */
  static showProfileUpdateSuccess(): void {
    this.showSuccess(PROFILE_TEXT.ALERTS.SUCCESS_MESSAGE);
  }

  /**
   * Shows profile update error
   */
  static showProfileUpdateError(error?: Error): void {
    const message = error?.message || PROFILE_TEXT.ALERTS.ERROR_UPDATE;
    this.showError(message);
  }

  /**
   * Shows logout error
   */
  static showLogoutError(): void {
    this.showError(PROFILE_TEXT.ALERTS.ERROR_LOGOUT);
  }

  /**
   * Shows validation errors
   */
  static showValidationError(errorMessage: string): void {
    Alert.alert(
      PROFILE_TEXT.ALERTS.VALIDATION_ERROR_TITLE,
      errorMessage
    );
  }

  /**
   * Shows missing fields error
   */
  static showMissingFieldsError(): void {
    Alert.alert(
      PROFILE_TEXT.ALERTS.VALIDATION_ERROR_TITLE,
      PROFILE_TEXT.ALERTS.ERROR_MISSING_FIELDS
    );
  }

  /**
   * Shows not authenticated error
   */
  static showNotAuthenticatedError(): void {
    this.showError(PROFILE_TEXT.ALERTS.ERROR_NOT_AUTHENTICATED);
  }
}