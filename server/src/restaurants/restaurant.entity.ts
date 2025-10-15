// src/restaurants/entities/restaurant.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Restaurant Entity
 * Represents a restaurant in the database
 * 
 * Note: Column names use snake_case to match PostgreSQL naming conventions
 */
@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'boolean',
    default: true,
    name: 'is_active', // ← IMPORTANTE: Nombre de columna en snake_case
  })
  isActive: boolean;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'text',
    nullable: true,
    default: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
    name: 'image_url', // ← IMPORTANTE: Nombre de columna en snake_case
  })
  imageUrl: string;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'opening_time', // ← IMPORTANTE: Nombre de columna en snake_case
  })
  openingTime: string;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'closing_time', // ← IMPORTANTE: Nombre de columna en snake_case
  })
  closingTime: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}