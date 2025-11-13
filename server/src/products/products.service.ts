// src/products/products.service.ts
import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './dto/product.dto';

/**
 * Products Service
 * Handles all business logic related to products
 */
@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /**
   * Create a new product
   */
  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    try {
      this.logger.log(`📦 Creating product: ${createProductDto.name}`);

      // Validate data
      this.validateProductData(createProductDto);

      // Create product entity
      const product = this.productRepository.create(createProductDto);

      // Save to database
      const savedProduct = await this.productRepository.save(product);

      this.logger.log(`✅ Product created: ${savedProduct.id}`);

      return new ProductResponseDto(savedProduct);
    } catch (error) {
      this.logger.error(`❌ Error creating product: ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all products by restaurant ID
   */
  async findByRestaurant(restaurantId: string): Promise<ProductResponseDto[]> {
    try {
      this.logger.log(`🔍 Finding products for restaurant: ${restaurantId}`);

      const products = await this.productRepository.find({
        where: { restaurantId },
        order: { createdAt: 'DESC' },
      });

      this.logger.log(`✅ Found ${products.length} products`);

      return products.map(product => new ProductResponseDto(product));
    } catch (error) {
      this.logger.error(`❌ Error finding products: ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all available products (across all restaurants)
   */
  async findAvailable(): Promise<ProductResponseDto[]> {
    try {
      this.logger.log(`🔍 Finding all available products`);

      const products = await this.productRepository.find({
        where: { isAvailable: true },
        order: { createdAt: 'DESC' },
      });

      // Filter products with stock > 0
      const availableProducts = products.filter(p => p.stock > 0);

      this.logger.log(`✅ Found ${availableProducts.length} available products`);

      return availableProducts.map(product => new ProductResponseDto(product));
    } catch (error) {
      this.logger.error(`❌ Error finding available products: ${error.message}`);
      throw error;
    }
  }

  /**
   * Find one product by ID
   */
  async findOne(id: string): Promise<ProductResponseDto> {
    try {
      this.logger.log(`🔍 Finding product: ${id}`);

      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      this.logger.log(`✅ Product found: ${product.name}`);

      return new ProductResponseDto(product);
    } catch (error) {
      this.logger.error(`❌ Error finding product: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a product
   */
  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    try {
      this.logger.log(`📝 Updating product: ${id}`);

      // Check if product exists
      const product = await this.productRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Validate update data
      if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
        throw new BadRequestException('Price cannot be negative');
      }

      if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
        throw new BadRequestException('Stock cannot be negative');
      }

      // Update product
      await this.productRepository.update(id, updateProductDto);

      // Fetch updated product
      const updatedProduct = await this.productRepository.findOne({ where: { id } });

      // Validate that updated product exists
      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found after update`);
      }

      this.logger.log(`✅ Product updated: ${updatedProduct.name}`);

      return new ProductResponseDto(updatedProduct);
    } catch (error) {
      this.logger.error(`❌ Error updating product: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete a product
   */
  async remove(id: string): Promise<void> {
    try {
      this.logger.log(`🗑️ Deleting product: ${id}`);

      const result = await this.productRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      this.logger.log(`✅ Product deleted successfully`);
    } catch (error) {
      this.logger.error(`❌ Error deleting product: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validate product data
   */
  private validateProductData(data: CreateProductDto): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new BadRequestException('Product name is required');
    }

    if (data.price < 0) {
      throw new BadRequestException('Price cannot be negative');
    }

    if (data.stock < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }

    if (data.originalPrice !== undefined && data.originalPrice < data.price) {
      throw new BadRequestException('Original price must be greater than or equal to current price');
    }

    if (!data.restaurantId) {
      throw new BadRequestException('Restaurant ID is required');
    }
  }

  /**
   * Decrease stock when product is purchased
   */
  async decreaseStock(productId: string, quantity: number): Promise<ProductResponseDto> {
    try {
      this.logger.log(`📉 Decreasing stock for product: ${productId} by ${quantity}`);

      const product = await this.productRepository.findOne({ where: { id: productId } });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      if (product.stock < quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      product.stock -= quantity;

      // Automatically mark as unavailable if stock reaches 0
      if (product.stock === 0) {
        product.isAvailable = false;
      }

      const updatedProduct = await this.productRepository.save(product);

      this.logger.log(`✅ Stock updated. New stock: ${updatedProduct.stock}`);

      return new ProductResponseDto(updatedProduct);
    } catch (error) {
      this.logger.error(`❌ Error decreasing stock: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get products expiring soon (within X days)
   */
  async findExpiringSoon(days: number = 3): Promise<ProductResponseDto[]> {
    try {
      this.logger.log(`⏰ Finding products expiring within ${days} days`);

      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);

      const products = await this.productRepository
        .createQueryBuilder('product')
        .where('product.expiration_date IS NOT NULL')
        .andWhere('product.expiration_date BETWEEN :today AND :futureDate', {
          today,
          futureDate,
        })
        .andWhere('product.is_available = :isAvailable', { isAvailable: true })
        .orderBy('product.expiration_date', 'ASC')
        .getMany();

      this.logger.log(`✅ Found ${products.length} products expiring soon`);

      return products.map(product => new ProductResponseDto(product));
    } catch (error) {
      this.logger.error(`❌ Error finding expiring products: ${error.message}`);
      throw error;
    }
  }
}