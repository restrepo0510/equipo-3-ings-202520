// utils/favorites.utils.ts

import type { Product } from '@/types/product.types';

/**
 * FavoritesUtils
 * 
 * Utility functions for favorites feature
 * Pure functions with no side effects
 */
export class FavoritesUtils {
  /**
   * Formats price to Colombian Pesos format
   * 
   * @param price - Price to format
   * @returns Formatted price string
   */
  static formatPrice(price: number): string {
    return `$ ${price.toLocaleString('es-CO')}`;
  }

  /**
   * Checks if product is available
   * 
   * @param product - Product to check
   * @returns true if product is available and in stock
   */
  static isProductAvailable(product: Product): boolean {
    return product.isAvailable && product.stock > 0;
  }

  /**
   * Gets product description or default
   * 
   * @param product - Product
   * @returns Description or default message
   */
  static getProductDescription(product: Product, defaultText: string): string {
    return product.description?.trim() || defaultText;
  }

  /**
   * Checks if image URL is valid
   * 
   * @param imageUrl - Image URL to validate
   * @returns true if URL is valid
   */
  static isValidImageUrl(imageUrl: string | null | undefined): boolean {
    if (!imageUrl || imageUrl.trim().length === 0) return false;
    
    try {
      const url = new URL(imageUrl);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Gets image source with fallback
   * 
   * @param imageUrl - Image URL
   * @param fallback - Fallback URL
   * @returns Valid image URL
   */
  static getImageSource(
    imageUrl: string | null | undefined,
    fallback: string = 'https://via.placeholder.com/90'
  ): string {
    return this.isValidImageUrl(imageUrl) ? imageUrl! : fallback;
  }

  /**
   * Converts Set to Array for easier manipulation
   * 
   * @param favoritesSet - Set of favorite IDs
   * @returns Array of favorite IDs
   */
  static setToArray(favoritesSet: Set<string>): string[] {
    return Array.from(favoritesSet);
  }

  /**
   * Converts Array to Set
   * 
   * @param favoritesArray - Array of favorite IDs
   * @returns Set of favorite IDs
   */
  static arrayToSet(favoritesArray: string[]): Set<string> {
    return new Set(favoritesArray);
  }
}