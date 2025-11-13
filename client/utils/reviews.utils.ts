// utils/reviews.utils.ts

import type { Review, FormattedReview } from '@/types/reviews.types';
import { REVIEWS_TEXT } from '@/constants/reviews.constants';

/**
 * ReviewsUtils
 * 
 * Utility functions for reviews feature
 * Pure functions with no side effects
 */
export class ReviewsUtils {
  /**
   * Validates if image URL is valid (RELAXED VERSION)
   * 
   * @param imageUrl - Image URL to validate
   * @returns true if URL exists
   */
  static isValidImageUrl(imageUrl: string | null | undefined): boolean {
    // Validación relajada - solo verifica que exista
    return !!(imageUrl && imageUrl.trim().length > 0);
  }

  /**
   * Formats a review for display
   * 
   * @param review - Review to format
   * @returns Formatted review object
   */
  static formatReview(review: Review): FormattedReview {
    const imageUri = ReviewsUtils.isValidImageUrl(review.product?.imageUrl)
      ? review.product.imageUrl
      : null;

    return {
      id: review.id,
      namep: review.user?.name || REVIEWS_TEXT.READ_REVIEW.ANONYMOUS_USER,
      text: review.text,
      rating: review.rating,
      image: imageUri ? { uri: imageUri } : null,
      productName: review.product?.name || REVIEWS_TEXT.ADD_REVIEW.SELECT_PRODUCT,
      productDescription: review.product?.description || REVIEWS_TEXT.READ_REVIEW.PRODUCT_DETAILS,
      restaurantId: review.restaurant?.id || '',
      restaurantName: review.restaurant?.name || '',
    };
  }

  /**
   * Formats multiple reviews
   * 
   * @param reviews - Array of reviews to format
   * @returns Array of formatted reviews
   */
  static formatReviews(reviews: Review[]): FormattedReview[] {
    return reviews.map(review => ReviewsUtils.formatReview(review));
  }

  /**
   * Gets random reviews from array
   * 
   * @param reviews - Array of reviews
   * @param count - Number of random reviews to get
   * @returns Random subset of reviews
   */
  static getRandomReviews<T>(reviews: T[], count: number): T[] {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Validates rating value
   * 
   * @param rating - Rating value to validate
   * @returns true if rating is valid
   */
  static isValidRating(rating: number): boolean {
    return rating >= 1 && rating <= 5;
  }

  /**
   * Validates review text
   * 
   * @param text - Review text to validate
   * @returns true if text is valid
   */
  static isValidReviewText(text: string): boolean {
    const trimmed = text.trim();
    return trimmed.length > 0 && trimmed.length <= 500;
  }

  /**
   * Creates array of star indices for rendering
   * 
   * @param rating - Rating value
   * @returns Array of star indices [1, 2, 3, 4, 5]
   */
  static getStarIndices(): number[] {
    return [1, 2, 3, 4, 5];
  }

  /**
   * Checks if star should be filled
   * 
   * @param starIndex - Star index (1-5)
   * @param rating - Current rating
   * @returns true if star should be filled
   */
  static isStarFilled(starIndex: number, rating: number): boolean {
    return starIndex <= rating;
  }

  /**
   * Gets product image source with fallback
   * 
   * @param imageUrl - Image URL
   * @param fallback - Fallback URL
   * @returns Valid image URL
   */
  static getProductImageSource(
    imageUrl: string | null | undefined,
    fallback: string = 'https://via.placeholder.com/100'
  ): string {
    return ReviewsUtils.isValidImageUrl(imageUrl) ? imageUrl! : fallback;
  }

  /**
   * Filters reviews by restaurant
   * 
   * @param reviews - Array of reviews
   * @param restaurantId - Restaurant ID to filter by
   * @returns Filtered reviews
   */
  static filterReviewsByRestaurant(
    reviews: FormattedReview[], 
    restaurantId: string
  ): FormattedReview[] {
    return reviews.filter(review => review.restaurantId === restaurantId);
  }

  /**
   * Sorts reviews by date (newest first)
   * 
   * @param reviews - Array of reviews
   * @returns Sorted reviews
   */
  static sortReviewsByDate(reviews: Review[]): Review[] {
    return [...reviews].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}