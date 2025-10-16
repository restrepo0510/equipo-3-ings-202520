// services/productService.ts

import { API_URL } from '@/config/api';

/**
 * Product interface matching backend entity
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
  discount?: number;
}

/**
 * Create Product DTO
 */
export interface CreateProductDto {
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
 * Update Product DTO
 */
export interface UpdateProductDto {
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
 * Product Service
 * Handles all product-related API calls
 */
class ProductService {
  private baseUrl = `${API_URL}/products`;

  /**
   * Get products by restaurant ID
   */
  async getByRestaurant(restaurantId: string, token: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/restaurant/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get available products
   */
  async getAvailable(token: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/available`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch available products: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching available products:', error);
      throw error;
    }
  }

  /**
   * Get single product by ID
   */
  async getById(id: string, token: string): Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Create new product
   */
  async create(productData: CreateProductDto, token: string): Promise<Product> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update product
   */
  async update(id: string, productData: UpdateProductDto, token: string): Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Delete product
   */
  async delete(id: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();