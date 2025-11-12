// services/reviewsAlertService.ts

import { CustomAlertHelper } from '@/components/ui/customAlert';
import { REVIEWS_TEXT } from '@/constants/reviews.constants';

/**
 * ReviewsAlertService
 * 
 * Centralized alert management for reviews feature
 * Single Responsibility: User notifications for review operations
 */
export class ReviewsAlertService {
  /**
   * Shows generic error alert
   */
  static showError(message: string): void {
    CustomAlertHelper.error(REVIEWS_TEXT.ALERTS.ERROR_TITLE, message);
  }

  /**
   * Shows generic warning alert
   */
  static showWarning(message: string): void {
    CustomAlertHelper.warning(REVIEWS_TEXT.ALERTS.WARNING_TITLE, message);
  }

  /**
   * Shows review submission success
   */
  static showReviewSuccess(onPress?: () => void): void {
    CustomAlertHelper.success(
      REVIEWS_TEXT.ALERTS.SUCCESS_TITLE,
      REVIEWS_TEXT.ALERTS.SUCCESS_MESSAGE,
      onPress
    );
  }

  /**
   * Shows review submission error
   */
  static showSubmitError(error?: Error | string): void {
    const message = typeof error === 'string'
      ? error
      : error?.message || REVIEWS_TEXT.ALERTS.ERROR_SUBMIT;
    
    this.showError(message);
  }

  /**
   * Shows restaurant loading error
   */
  static showRestaurantsLoadError(): void {
    this.showError(REVIEWS_TEXT.ALERTS.ERROR_LOAD_RESTAURANTS);
  }

  /**
   * Shows products loading error
   */
  static showProductsLoadError(): void {
    this.showError(REVIEWS_TEXT.ALERTS.ERROR_LOAD_PRODUCTS);
  }

  /**
   * Shows select restaurant warning
   */
  static showSelectRestaurantWarning(): void {
    this.showWarning(REVIEWS_TEXT.ALERTS.SELECT_RESTAURANT);
  }

  /**
   * Shows select product warning
   */
  static showSelectProductWarning(): void {
    this.showWarning(REVIEWS_TEXT.ALERTS.SELECT_PRODUCT);
  }

  /**
   * Shows select rating warning
   */
  static showSelectRatingWarning(): void {
    this.showWarning(REVIEWS_TEXT.ALERTS.SELECT_RATING);
  }

  /**
   * Shows write opinion warning
   */
  static showWriteOpinionWarning(): void {
    this.showWarning(REVIEWS_TEXT.ALERTS.WRITE_OPINION);
  }

  /**
   * Shows login required alert
   */
  static showLoginRequired(): void {
    this.showError(REVIEWS_TEXT.ALERTS.LOGIN_REQUIRED);
  }

  /**
   * Shows custom error message
   */
  static showCustomError(message: string): void {
    this.showError(message);
  }
}