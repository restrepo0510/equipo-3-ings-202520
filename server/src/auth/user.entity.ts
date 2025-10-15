// src/auth/user.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

/**
 * User roles in the system
 */
export enum UserRole {
  CUSTOMER = 'customer',  // Regular user (can browse and buy)
  BUSINESS = 'business',  // Restaurant/business owner
  ADMIN = 'admin'         // System administrator
}

/**
 * User entity representing registered users in the system
 * Supports both customers and business accounts
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Full name of the user'
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
    comment: 'Unique email address for authentication'
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: 'Contact phone number'
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false, // Don't include password in queries by default
    comment: 'Hashed password for authentication'
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: UserRole.CUSTOMER,
    comment: 'User role: customer, business, or admin'
  })
  role: UserRole;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Account creation timestamp'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Last update timestamp'
  })
  updatedAt: Date;
}