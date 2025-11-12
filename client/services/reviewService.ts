// services/reviewsApiService.ts

import { API_URL } from '@/config/api';
import { REVIEWS_ENDPOINTS } from '@/constants/reviews.constants';
import type { 
  Review, 
  CreateReviewDto, 
  ReviewsApiError 
} from '@/types/reviews.types';

/**
 * HTTP request configuration
 */
const createHeaders = (token: string) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Handles API response and errors
 */
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json().catch(() => ({
    message: 'Unknown error occurred',
  }));

  if (!response.ok) {
    const error: ReviewsApiError = {
      message: data.message || 'Request failed',
      statusCode: response.status,
    };
    throw error;
  }

  return data;
};

/**
 * ReviewsApiService
 * 
 * Handles all API communication for reviews feature
 * Single Responsibility: HTTP requests only
 */
export class ReviewsApiService {
  /**
   * Creates a new review
   * 
   * @param data - Review data
   * @param token - JWT authentication token
   * @returns Created review
   * @throws ReviewsApiError if request fails
   */
  static async createReview(
    data: CreateReviewDto, 
    token: string
  ): Promise<Review> {
    try {
      const response = await fetch(`${API_URL}${REVIEWS_ENDPOINTS.BASE}`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      const review = await handleApiResponse<Review>(response);
      console.log('✅ Review created:', review.id);
      return review;
    } catch (error) {
      console.error('❌ Error creating review:', error);
      throw error;
    }
  }

  /**
   * Gets all reviews for a restaurant
   * 
   * @param restaurantId - Restaurant ID
   * @param token - JWT authentication token
   * @returns Array of reviews
   * @throws ReviewsApiError if request fails
   */
  static async getRestaurantReviews(
    restaurantId: string, 
    token: string
  ): Promise<Review[]> {
    try {
      const response = await fetch(
        `${API_URL}${REVIEWS_ENDPOINTS.BY_RESTAURANT(restaurantId)}`,
        {
          method: 'GET',
          headers: createHeaders(token),
        }
      );

      const reviews = await handleApiResponse<Review[]>(response);
      console.log('✅ Reviews loaded for restaurant:', restaurantId, reviews.length);
      return reviews;
    } catch (error) {
      console.error('❌ Error loading reviews:', error);
      throw error;
    }
  }

  /**
   * Gets all reviews by current user
   * 
   * @param token - JWT authentication token
   * @returns Array of user reviews
   * @throws ReviewsApiError if request fails
   */
  static async getUserReviews(token: string): Promise<Review[]> {
    try {
      const response = await fetch(
        `${API_URL}${REVIEWS_ENDPOINTS.BY_USER}`,
        {
          method: 'GET',
          headers: createHeaders(token),
        }
      );

      const reviews = await handleApiResponse<Review[]>(response);
      console.log('✅ User reviews loaded:', reviews.length);
      return reviews;
    } catch (error) {
      console.error('❌ Error loading user reviews:', error);
      throw error;
    }
  }

  /**
   * Deletes a review
   * 
   * @param reviewId - Review ID to delete
   * @param token - JWT authentication token
   * @throws ReviewsApiError if request fails
   */
  static async deleteReview(reviewId: string, token: string): Promise<void> {
    try {
      const response = await fetch(
        `${API_URL}${REVIEWS_ENDPOINTS.DELETE(reviewId)}`,
        {
          method: 'DELETE',
          headers: createHeaders(token),
        }
      );

      if (!response.ok) {
        throw new Error('Error deleting review');
      }

      console.log('✅ Review deleted:', reviewId);
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      throw error;
    }
  }
}