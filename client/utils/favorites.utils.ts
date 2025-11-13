// utils/favorites.utils.ts

import type { Product } from '@/types/product.types';

/**
 * FavoritesUtils
 * Utility functions for favorites feature
 */
export class FavoritesUtils {
  /**
   * Format price as currency
   * ✅ ACTUALIZADO: Sin decimales
   */
  static formatPrice(price: number): string {
    return `$${Math.round(price).toLocaleString('es-CO')}`;
  }

  /**
   * Get product image source with fallback
   */
  static getImageSource(imageUrl?: string): string {
    return imageUrl || 'https://via.placeholder.com/100';
  }

  /**
   * Get product description with fallback
   */
  static getProductDescription(
    product: Product,
    fallback: string = 'Sin descripción'
  ): string {
    return product.description || fallback;
  }

  /**
   * Check if product is available
   */
  static isProductAvailable(product: Product): boolean {
    return product.isAvailable && product.stock > 0;
  }

  /**
   * Get product stock status text
   */
  static getStockStatusText(product: Product): string {
    if (!product.isAvailable) {
      return 'No disponible';
    }
    
    if (product.stock === 0) {
      return 'Agotado';
    }
    
    if (product.stock < 5) {
      return `¡Solo quedan ${product.stock}!`;
    }
    
    return `${product.stock} disponibles`;
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
    
    const discount = ((product.originalPrice! - product.price) / product.originalPrice!) * 100;
    return Math.round(discount);
  }
}