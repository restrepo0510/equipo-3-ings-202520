// hooks/useReviewsList.ts

import { useState, useEffect, useCallback } from 'react';
import { ReviewsApiService } from '@/services/reviewService';
import { ReviewsUtils } from '@/utils/reviews.utils';
import { REVIEWS_CONSTANTS } from '@/constants/reviews.constants';
import type { FormattedReview, RestaurantSummary } from '@/types/reviews.types';

/**
 * Hook return type
 */
interface UseReviewsListReturn {
  displayedReviews: FormattedReview[];
  allReviews: FormattedReview[];
  isLoading: boolean;
  error: string | null;
  loadReviewsByRestaurant: (restaurantId: string) => Promise<void>;
  loadAllReviews: (restaurants: RestaurantSummary[]) => Promise<void>;
  showRandomReviews: (count?: number) => void;
}

/**
 * useReviewsList Hook
 * 
 * Manages reviews list state and operations
 * Handles loading and filtering reviews
 * 
 * @param token - JWT authentication token
 * @returns Reviews list state and operations
 */
export const useReviewsList = (token: string | null): UseReviewsListReturn => {
  // ============================================================================
  // State
  // ============================================================================
  
  const [displayedReviews, setDisplayedReviews] = useState<FormattedReview[]>([]);
  const [allReviews, setAllReviews] = useState<FormattedReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Operations
  // ============================================================================

  /**
   * Loads reviews for a specific restaurant
   */
  const loadReviewsByRestaurant = useCallback(async (restaurantId: string): Promise<void> => {
    if (!token) {
      console.log('⚠️ No token available');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reviews = await ReviewsApiService.getRestaurantReviews(restaurantId, token);
      const formatted = ReviewsUtils.formatReviews(reviews);
      
      setDisplayedReviews(formatted);
      console.log('✅ Restaurant reviews loaded:', formatted.length);
    } catch (error) {
      console.error('❌ Error loading restaurant reviews:', error);
      setError('Failed to load reviews');
      setDisplayedReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Loads all reviews from multiple restaurants
   */
  const loadAllReviews = useCallback(async (
    restaurants: RestaurantSummary[]
  ): Promise<void> => {
    if (!token || restaurants.length === 0) {
      console.log('⚠️ No token or restaurants');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reviewsPromises = restaurants.map(restaurant =>
        ReviewsApiService.getRestaurantReviews(restaurant.id, token)
          .catch(() => []) // Continue if one fails
      );

      const results = await Promise.all(reviewsPromises);
      const allReviewsFlat = results.flat();
      const formatted = ReviewsUtils.formatReviews(allReviewsFlat);
      
      setAllReviews(formatted);
      setDisplayedReviews(
        ReviewsUtils.getRandomReviews(
          formatted, 
          REVIEWS_CONSTANTS.UI.MAX_RANDOM_REVIEWS
        )
      );
      
      console.log('✅ All reviews loaded:', formatted.length);
    } catch (error) {
      console.error('❌ Error loading all reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Shows random reviews from all reviews
   */
  const showRandomReviews = useCallback((
    count: number = REVIEWS_CONSTANTS.UI.DEFAULT_VISIBLE_REVIEWS
  ): void => {
    const randomReviews = ReviewsUtils.getRandomReviews(allReviews, count);
    setDisplayedReviews(randomReviews);
  }, [allReviews]);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    displayedReviews,
    allReviews,
    isLoading,
    error,
    loadReviewsByRestaurant,
    loadAllReviews,
    showRandomReviews,
  };
};