// services/favoritesAlertService.ts

import { CustomAlertHelper } from '@/components/ui/customAlert';
import { FAVORITES_TEXT } from '@/constants/favorites.constants';

/**
 * FavoritesAlertService
 * 
 * Centralized alert management for favorites feature
 * Single Responsibility: User notifications for favorite operations
 */
export class FavoritesAlertService {
  /**
   * Shows generic error alert
   */
  static showError(message: string): void {
    CustomAlertHelper.error(FAVORITES_TEXT.ALERTS.ERROR_TITLE, message);
  }

  /**
   * Shows add favorite error
   */
  static showAddFavoriteError(): void {
    this.showError(FAVORITES_TEXT.ALERTS.ADD_ERROR);
  }

  /**
   * Shows remove favorite error
   */
  static showRemoveFavoriteError(): void {
    this.showError(FAVORITES_TEXT.ALERTS.REMOVE_ERROR);
  }

  /**
   * Shows login required alert
   */
  static showLoginRequired(): void {
    CustomAlertHelper.warning(
      FAVORITES_TEXT.ALERTS.ERROR_TITLE,
      FAVORITES_TEXT.ALERTS.LOGIN_REQUIRED
    );
  }

  /**
   * Shows load error
   */
  static showLoadError(): void {
    this.showError(FAVORITES_TEXT.ALERTS.LOAD_ERROR);
  }

  /**
   * Shows custom error message
   */
  static showCustomError(message: string): void {
    this.showError(message);
  }
}