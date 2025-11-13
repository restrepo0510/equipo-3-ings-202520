// utils/products.utils.ts

import type { Product } from '@/types/product.types';

/**
 * ProductsUtils
 * Utility functions for products feature
 */
export class ProductsUtils {
  /**
   * Format price as currency
   * ✅ ACTUALIZADO: Sin decimales, consistente con FavoritesUtils
   */
  static formatPrice(price: number): string {
    return `$${Math.round(price).toLocaleString('es-CO')}`;
  }

  /**
   * Get product image with fallback
   */
  static getProductImage(imageUrl?: string): string {
    return imageUrl || 'https://via.placeholder.com/100';
  }

  /**
   * Get product description with fallback
   */
  static getProductDescription(
    description?: string,
    fallback: string = 'Sin descripción'
  ): string {
    return description || fallback;
  }

  /**
   * Check if product is available
   */
  static isProductAvailable(product: Product): boolean {
    return product.isAvailable && product.stock > 0;
  }

  /**
   * Get product stock status
   */
  static getStockStatus(product: Product): {
    text: string;
    color: string;
    isEmpty: boolean;
  } {
    if (!product.isAvailable) {
      return {
        text: 'No disponible',
        color: '#E74C3C',
        isEmpty: true,
      };
    }

    if (product.stock === 0) {
      return {
        text: 'Agotado',
        color: '#E74C3C',
        isEmpty: true,
      };
    }

    if (product.stock < 5) {
      return {
        text: `¡Solo quedan ${product.stock}!`,
        color: '#F39C12',
        isEmpty: false,
      };
    }

    return {
      text: `${product.stock} disponibles`,
      color: '#27AE60',
      isEmpty: false,
    };
  }

  /**
   * Check if product has discount
   */
  static hasDiscount(product: Product): boolean {
    return !!(product.originalPrice && product.originalPrice > product.price);
  }

  /**
   * Calculate discount percentage
   */
  static getDiscountPercentage(product: Product): number {
    if (!this.hasDiscount(product)) {
      return 0;
    }

    const discount =
      ((product.originalPrice! - product.price) / product.originalPrice!) * 100;
    return Math.round(discount);
  }

  /**
   * Format discount percentage for display
   */
  static formatDiscountBadge(product: Product): string {
    const percentage = this.getDiscountPercentage(product);
    return `-${percentage}%`;
  }

  /**
   * Get product category display name
   */
  static getCategoryDisplayName(category?: string): string {
    if (!category) return 'Sin categoría';
    
    // Capitalize first letter
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  /**
   * Check if product is expiring soon (within 24 hours)
   */
  static isExpiringSoon(expirationDate?: Date | string): boolean {
    if (!expirationDate) return false;

    const expDate = typeof expirationDate === 'string' 
      ? new Date(expirationDate) 
      : expirationDate;
    
    const now = new Date();
    const hoursDiff = (expDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return hoursDiff > 0 && hoursDiff <= 24;
  }

  /**
   * Format expiration date for display
   */
  static formatExpirationDate(expirationDate?: Date | string): string {
    if (!expirationDate) return '';

    const expDate = typeof expirationDate === 'string' 
      ? new Date(expirationDate) 
      : expirationDate;

    return expDate.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}