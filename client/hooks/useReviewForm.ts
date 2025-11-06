// hooks/useReviewForm.ts

import { useState, useCallback } from 'react';
import { ReviewsApiService } from '@/services/reviewService';
import { ReviewsAlertService } from '@/services/reviewsAlertService';
import { ReviewsUtils } from '@/utils/reviews.utils';
import { REVIEWS_CONSTANTS } from '@/constants/reviews.constants';
import type { 
  RestaurantSummary, 
  ProductSummary, 
  CreateReviewDto 
} from '@/types/reviews.types';

/**
 * Hook return type
 */
interface UseReviewFormReturn {
  selectedRestaurant: RestaurantSummary | null;
  selectedProduct: ProductSummary | null;
  rating: number;
  reviewText: string;
  isSubmitting: boolean;
  setSelectedRestaurant: (restaurant: RestaurantSummary | null) => void;
  setSelectedProduct: (product: ProductSummary | null) => void;
  setRating: (rating: number) => void;
  setReviewText: (text: string) => void;
  validateAndSubmit: (token: string, onSuccess: () => void) => Promise<void>;
  resetForm: () => void;
}

/**
 * useReviewForm Hook
 * 
 * Manages review form state and submission
 * Encapsulates validation and API call logic
 * 
 * @returns Review form state and operations
 */
export const useReviewForm = (): UseReviewFormReturn => {
  // ============================================================================
  // State
  // ============================================================================
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantSummary | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductSummary | null>(null);
  const [rating, setRating] = useState(REVIEWS_CONSTANTS.RATING.DEFAULT);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================================
  // Validation
  // ============================================================================

  /**
   * Validates form before submission
   */
  const validateForm = useCallback((): boolean => {
    if (!selectedRestaurant) {
      ReviewsAlertService.showSelectRestaurantWarning();
      return false;
    }

    if (!selectedProduct) {
      ReviewsAlertService.showSelectProductWarning();
      return false;
    }

    if (!ReviewsUtils.isValidRating(rating)) {
      ReviewsAlertService.showSelectRatingWarning();
      return false;
    }

    if (!ReviewsUtils.isValidReviewText(reviewText)) {
      ReviewsAlertService.showWriteOpinionWarning();
      return false;
    }

    return true;
  }, [selectedRestaurant, selectedProduct, rating, reviewText]);

  // ============================================================================
  // Submission
  // ============================================================================

  /**
   * Validates and submits review
   */
  const validateAndSubmit = useCallback(async (
    token: string,
    onSuccess: () => void
  ): Promise<void> => {
    if (!token) {
      ReviewsAlertService.showLoginRequired();
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const reviewData: CreateReviewDto = {
        restaurantId: selectedRestaurant!.id,
        productId: selectedProduct!.id,
        rating,
        text: reviewText.trim(),
      };

      await ReviewsApiService.createReview(reviewData, token);

      ReviewsAlertService.showReviewSuccess(onSuccess);
      console.log('✅ Review submitted successfully');
    } catch (error) {
      console.error('❌ Error submitting review:', error);
      ReviewsAlertService.showSubmitError(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, selectedRestaurant, selectedProduct, rating, reviewText]);

  // ============================================================================
  // Reset
  // ============================================================================

  /**
   * Resets form to initial state
   */
  const resetForm = useCallback((): void => {
    setSelectedRestaurant(null);
    setSelectedProduct(null);
    setRating(REVIEWS_CONSTANTS.RATING.DEFAULT);
    setReviewText('');
    setIsSubmitting(false);
  }, []);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    selectedRestaurant,
    selectedProduct,
    rating,
    reviewText,
    isSubmitting,
    setSelectedRestaurant,
    setSelectedProduct,
    setRating,
    setReviewText,
    validateAndSubmit,
    resetForm,
  };
};