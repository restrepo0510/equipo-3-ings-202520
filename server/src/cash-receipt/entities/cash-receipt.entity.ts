// src/cash-receipts/entities/cash-receipt.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { Restaurant } from '../../restaurants/restaurant.entity';
import { Product } from '../../products/entities/product.entity';

/**
 * Cash Receipt Status Enum
 */
export enum CashReceiptStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

/**
 * Cash Receipt Entity
 * Represents a payment receipt for cash transactions
 * 
 * @description
 * When a user selects "pay with cash", a receipt is generated with:
 * - Unique receipt code (for QR and manual entry)
 * - Order details
 * - Expiration time (configurable, default 24h)
 * - Validation status
 */
@Entity('cash_receipts')
export class CashReceipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Unique receipt code (8-12 alphanumeric characters)
   * Used for QR scanning and manual validation
   * Example: "CR-ABC123XY"
   */
  @Column({ unique: true, length: 20 })
  receiptCode: string;

  /**
   * Order reference ID
   * Links to the reservation/order
   */
  @Column({ nullable: true })
  orderId: string;

  /**
   * User who created the receipt
   */
  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  /**
   * Restaurant where payment will be made
   */
  @ManyToOne(() => Restaurant, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @Column()
  restaurantId: string;

  /**
   * Product purchased
   */
  @ManyToOne(() => Product, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ nullable: true })
  productId: string;

  /**
   * Product details (cached for history)
   */
  @Column()
  productName: string;

  @Column({ type: 'int' })
  quantity: number;

  /**
   * Pricing details
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  /**
   * Receipt status
   */
  @Column({
    type: 'enum',
    enum: CashReceiptStatus,
    default: CashReceiptStatus.PENDING,
  })
  status: CashReceiptStatus;

  /**
   * Expiration timestamp
   * After this time, receipt cannot be used
   */
  @Column({ type: 'timestamp' })
  expiresAt: Date;

  /**
   * Validation details
   */
  @Column({ type: 'timestamp', nullable: true })
  validatedAt: Date;

  @Column({ nullable: true })
  validatedBy: string; // Staff member ID or name

  /**
   * Additional notes
   */
  @Column({ type: 'text', nullable: true })
  notes: string;

  /**
   * QR Code data (base64 or URL)
   */
  @Column({ type: 'text', nullable: true })
  qrCodeData: string;

  /**
   * PDF receipt URL (if stored in cloud)
   */
  @Column({ nullable: true })
  pdfUrl: string;

  /**
   * Timestamps
   */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Check if receipt is expired
   */
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /**
   * Check if receipt can be validated
   */
  canBeValidated(): boolean {
    return (
      this.status === CashReceiptStatus.PENDING &&
      !this.isExpired()
    );
  }
}