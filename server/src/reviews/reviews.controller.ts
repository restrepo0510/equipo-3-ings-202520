// reviews/reviews.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reviews')
@UseGuards(JwtAuthGuard) // ✅ Guard a nivel de controlador
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  /**
   * Create a new review
   * POST /reviews
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    console.log('📝 Creating review for user:', req.user.id);
    return this.reviewsService.create(createReviewDto, req.user.id);
  }

  /**
   * Get reviews by restaurant
   * GET /reviews/restaurant/:restaurantId
   */
  @Get('restaurant/:restaurantId')
  async findByRestaurant(@Param('restaurantId') restaurantId: string) {
    console.log('📋 Fetching reviews for restaurant:', restaurantId);
    const reviews = await this.reviewsService.findByRestaurant(restaurantId);
    console.log('✅ Found reviews:', reviews.length);
    return reviews;
  }

  /**
   * Get reviews by current user
   * GET /reviews/user
   */
  @Get('user')
  async findByUser(@Request() req) {
    console.log('📋 Fetching reviews for user:', req.user.id);
    return this.reviewsService.findByUser(req.user.id);
  }

  /**
   * Delete a review
   * DELETE /reviews/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @Request() req) {
    console.log('🗑️ Deleting review:', id, 'by user:', req.user.id);
    await this.reviewsService.delete(id, req.user.id);
  }
}