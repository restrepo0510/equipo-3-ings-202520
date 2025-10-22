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

  @Column({ type: 'decimal', precision: 10, scale: 8, default: 0 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, default: 0 })
  longitude: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  // ✅ NUEVO: Email del restaurante
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  // ✅ NUEVO: Relación con el usuario propietario
  @Column({
    type: 'uuid',
    nullable: true,
    name: 'user_id',
  })
  userId: string;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'boolean',
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'text',
    nullable: true,
    default: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
    name: 'image_url',
  })
  imageUrl: string;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'opening_time',
  })
  openingTime: string;

  // Explicitly specify column name in snake_case
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'closing_time',
  })
  closingTime: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}