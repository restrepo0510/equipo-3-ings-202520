// types/product.types.ts

/**
 * Product data structure
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl?: string;
  category?: string;
  expirationDate?: Date;
  isAvailable: boolean;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
  discount?: number; // Calculated percentage
}

/**
 * Create product data (for POST requests)
 */
export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl?: string;
  category?: string;
  expirationDate?: string;
  isAvailable?: boolean;
  restaurantId: string;
}

/**
 * Update product data (for PATCH requests)
 */
export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  stock?: number;
  imageUrl?: string;
  category?: string;
  expirationDate?: string;
  isAvailable?: boolean;
}

/**
 * Product validation errors
 */
export interface ProductValidationErrors {
  name?: string;
  price?: string;
  stock?: string;
  restaurantId?: string;
}

/**
 * Product filter options
 */
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  restaurantId?: string;
}

/**
 * Product sort options
 */
export enum ProductSortBy {
  NAME = 'name',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  CREATED_AT = 'created_at',
  STOCK = 'stock',
}

/**
 * Type guard to check if product is available
 */
export const isProductAvailable = (product: Product): boolean => {
  return product.isAvailable && product.stock > 0;
};

/**
 * Type guard to check if product has discount
 */
export const hasDiscount = (product: Product): boolean => {
  return !!product.originalPrice && product.originalPrice > product.price;
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};