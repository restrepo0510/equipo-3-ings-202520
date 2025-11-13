// src/products/entities/product.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/restaurant.entity';

/**
 * Product Entity
 * Represents a product/dish offered by a restaurant
 * 
 * Note: Column names use snake_case to match PostgreSQL naming conventions
 */
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'original_price',
  })
  originalPrice: number;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @Column({
    type: 'text',
    nullable: true,
    default: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
    name: 'image_url',
  })
  imageUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'expiration_date',
  })
  expirationDate: Date;

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_available',
  })
  isAvailable: boolean;

  // Relationship with Restaurant
  @Column({ type: 'uuid', name: 'restaurant_id' })
  restaurantId: string;

  @ManyToOne(() => Restaurant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}