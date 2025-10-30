import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/review.dto';
import { User } from '../auth/user.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string): Promise<Review> {
    console.log('🔍 Creating review for user ID:', userId); // ← LOG
    
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: createReviewDto.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    const product = await this.productsRepository.findOne({
      where: { id: createReviewDto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const review = this.reviewsRepository.create({
      user: { id: userId } as User,
      restaurant,
      product,
      rating: createReviewDto.rating,
      text: createReviewDto.text,
    });

    console.log('💾 Saving review:', review); // ← LOG
    const saved = await this.reviewsRepository.save(review);
    console.log('✅ Review saved:', saved); // ← LOG
    
    return saved;
  }

  async findByRestaurant(restaurantId: string): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { restaurant: { id: restaurantId } },
    relations: ['user', 'product', 'restaurant'], // ← ASEGURAR ESTO      
    order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['restaurant', 'product'],
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!review) throw new NotFoundException('Review not found');
    if (review.user.id !== userId) throw new NotFoundException('Unauthorized');

    await this.reviewsRepository.remove(review);
  }
}