// types/review.types.ts

/**
 * Review entity structure (matches backend)
 */
export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  productId: string;
  rating: number;
  text: string;
  createdAt: Date;
  user: ReviewUser;
  restaurant: ReviewRestaurant;
  product: ReviewProduct;
}

/**
 * Review user information
 */
export interface ReviewUser {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
}

/**
 * Review restaurant information
 */
export interface ReviewRestaurant {
  id: string;
  name: string;
  address?: string;
  imageUrl?: string;
}

/**
 * Review product information
 */
export interface ReviewProduct {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price?: number;
}

/**
 * Create review DTO (for POST requests)
 */
export interface CreateReviewDto {
  restaurantId: string;
  productId: string;
  rating: number;
  text: string;
}

/**
 * Update review DTO (for PATCH requests)
 */
export interface UpdateReviewDto {
  rating?: number;
  text?: string;
}

/**
 * Formatted review for display in UI
 */
export interface FormattedReview {
  id: string;
  namep: string; // User name
  text: string;
  rating: number;
  image: { uri: string } | null;
  productName: string;
  productDescription: string;
  restaurantId: string;
  restaurantName: string;
  createdAt?: Date;
}

/**
 * Restaurant summary for dropdowns/selection
 */
export interface RestaurantSummary {
  id: string;
  name: string;
  imageUrl?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Product summary for selection
 */
export interface ProductSummary {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  restaurantId: string;
  isAvailable?: boolean;
}

/**
 * Reviews state management
 */
export interface ReviewsState {
  reviews: Review[];
  displayedReviews: FormattedReview[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Review validation errors
 */
export interface ReviewValidationErrors {
  restaurant?: string;
  product?: string;
  rating?: string;
  text?: string;
}

/**
 * Review filter options
 */
export interface ReviewFilters {
  restaurantId?: string;
  productId?: string;
  userId?: string;
  minRating?: number;
  maxRating?: number;
}

/**
 * Review sort options
 */
export enum ReviewSortBy {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  HIGHEST_RATING = 'highest_rating',
  LOWEST_RATING = 'lowest_rating',
}

/**
 * API Error for reviews
 */
export interface ReviewsApiError {
  message: string;
  statusCode?: number;
  errors?: string[];
}

/**
 * Review statistics
 */
export interface ReviewStatistics {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    [key: number]: number; // rating -> count
  };
}

/**
 * Type guard to check if review has valid rating
 */
export const hasValidRating = (review: Review | FormattedReview): boolean => {
  return review.rating >= 1 && review.rating <= 5;
};

/**
 * Type guard to check if review has text content
 */
export const hasTextContent = (review: Review | FormattedReview): boolean => {
  return review.text.trim().length > 0;
};

/**
 * Type guard to check if review is recent (within 7 days)
 */
export const isRecentReview = (review: Review): boolean => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return new Date(review.createdAt) >= sevenDaysAgo;
};

/**
 * Calculate average rating from reviews
 */
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

/**
 * Get rating distribution
 */
export const getRatingDistribution = (reviews: Review[]): Record<number, number> => {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    }
  });
  return distribution;
};