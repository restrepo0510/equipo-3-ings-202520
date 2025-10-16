// src/products/dto/product.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString, Min } from 'class-validator';

/**
 * DTO for creating a new product
 */
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  originalPrice?: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDateString()
  @IsOptional()
  expirationDate?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  restaurantId: string;
}

/**
 * DTO for updating a product
 */
export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  originalPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDateString()
  @IsOptional()
  expirationDate?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

/**
 * Response DTO for product data
 */
export class ProductResponseDto {
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

  // Calculated field
  discount?: number; // Percentage discount

  constructor(product: any) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = Number(product.price);
    this.originalPrice = product.originalPrice ? Number(product.originalPrice) : undefined;
    this.stock = product.stock;
    this.imageUrl = product.imageUrl;
    this.category = product.category;
    this.expirationDate = product.expirationDate;
    this.isAvailable = product.isAvailable;
    this.restaurantId = product.restaurantId;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;

    // Calculate discount if original price exists
    if (this.originalPrice && this.originalPrice > this.price) {
      this.discount = Math.round(
        ((this.originalPrice - this.price) / this.originalPrice) * 100
      );
    }
  }
}