import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    console.log('🔍 User from JWT:', req.user);
    return this.reviewsService.create(createReviewDto, req.user.id);
  }

  @Get('restaurant/:restaurantId')
  @UseGuards(JwtAuthGuard)
  findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.reviewsService.findByRestaurant(restaurantId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findByUser(@Request() req) {
    return this.reviewsService.findByUser(req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @Request() req) {
    return this.reviewsService.delete(id, req.user.id);
  }
}