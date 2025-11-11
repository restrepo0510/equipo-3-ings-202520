// services/productsAlertService.ts

import { CustomAlertHelper } from '@/components/ui/CustomAlert';
import { PRODUCTS_TEXT } from '@/constants/products.constants';

/**
 * ProductsAlertService
 * Centralized alert management for products feature
 */
export class ProductsAlertService {
  /**
   * Shows generic error alert
   */
  static showError(message: string): void {
    CustomAlertHelper.error('Error', message);
  }

  /**
   * Shows product unavailable warning
   */
  static showProductUnavailable(): void {
    CustomAlertHelper.warning(
      PRODUCTS_TEXT.ERRORS.PRODUCT_UNAVAILABLE,
      PRODUCTS_TEXT.ERRORS.PRODUCT_UNAVAILABLE_MESSAGE
    );
  }

  /**
   * Shows restaurant load error
   */
  static showRestaurantLoadError(): void {
    CustomAlertHelper.error(
      'Error',
      PRODUCTS_TEXT.ERRORS.RESTAURANT_LOAD_FAILED
    );
  }

  /**
   * Shows products load error
   */
  static showProductsLoadError(error?: Error): void {
    const message = error?.message || PRODUCTS_TEXT.ERRORS.LOAD_FAILED;
    CustomAlertHelper.error('Error', message);
  }

  /**
   * Shows success message
   */
  static showSuccess(message: string): void {
    CustomAlertHelper.success('Éxito', message);
  }

  /**
   * Shows info message
   */
  static showInfo(title: string, message: string): void {
    CustomAlertHelper.info(title, message);
  }
}