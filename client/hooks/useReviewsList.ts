// hooks/useReviewsList.ts

import { useState, useCallback } from 'react';
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
 * ✅ CORREGIDO: Eliminado useEffect problemático
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
   * ✅ Maneja 404 sin crashear
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
    } catch (error: any) {
      console.error('❌ Error loading restaurant reviews:', error);
      
      // ✅ Manejar 404 específicamente
      if (error?.statusCode === 404) {
        console.log('ℹ️ No reviews found for this restaurant (404)');
        setDisplayedReviews([]);
        setError(null);
      } else {
        setError('Failed to load reviews');
        setDisplayedReviews([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Loads all reviews from multiple restaurants
   * ✅ Continúa aunque algunos restaurantes fallen
   * ✅ SIN dependencia de token en useCallback - se pasa como parámetro
   */
  const loadAllReviews = useCallback(async (
    restaurants: RestaurantSummary[]
  ): Promise<void> => {
    if (!token || restaurants.length === 0) {
      console.log('⚠️ No token or restaurants available');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`🔄 Loading reviews from ${restaurants.length} restaurants...`);

      const reviewsPromises = restaurants.map(restaurant =>
        ReviewsApiService.getRestaurantReviews(restaurant.id, token)
          .catch((error) => {
            if (error?.statusCode === 404) {
              console.log(`ℹ️ No reviews for restaurant ${restaurant.name}`);
            } else {
              console.error(`❌ Error loading reviews for ${restaurant.name}:`, error);
            }
            return [];
          })
      );

      const results = await Promise.all(reviewsPromises);
      const allReviewsFlat = results.flat();
      const formatted = ReviewsUtils.formatReviews(allReviewsFlat);
      
      setAllReviews(formatted);
      
      if (formatted.length > 0) {
        setDisplayedReviews(
          ReviewsUtils.getRandomReviews(
            formatted, 
            REVIEWS_CONSTANTS.UI.MAX_RANDOM_REVIEWS
          )
        );
      } else {
        setDisplayedReviews([]);
        console.log('ℹ️ No reviews available from any restaurant');
      }
      
      console.log('✅ All reviews loaded:', formatted.length);
    } catch (error) {
      console.error('❌ Error loading all reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [token]); // ✅ Solo depende de token

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