import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Restaurant } from '../../restaurants/restaurant.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' }) // ← AGREGAR ESTO
  user: User;

  @ManyToOne(() => Restaurant, { eager: true })
  @JoinColumn({ name: 'restaurant_id' }) // ← AGREGAR ESTO
  restaurant: Restaurant;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' }) // ← AGREGAR ESTO
  product: Product;

  @Column('int')
  rating: number;

  @Column('text')
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}