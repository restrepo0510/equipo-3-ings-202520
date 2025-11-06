// types/reviews.types.ts

/**
 * Review entity structure
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
  profileImage?: string;
}

/**
 * Review restaurant information
 */
export interface ReviewRestaurant {
  id: string;
  name: string;
}

/**
 * Review product information
 */
export interface ReviewProduct {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

/**
 * Create review DTO
 */
export interface CreateReviewDto {
  restaurantId: string;
  productId: string;
  rating: number;
  text: string;
}

/**
 * Formatted review for display
 */
export interface FormattedReview {
  id: string;
  namep: string;
  text: string;
  rating: number;
  image: { uri: string } | null;
  productName: string;
  productDescription: string;
  restaurantId: string;
  restaurantName: string;
}

/**
 * Restaurant summary for dropdown
 */
export interface RestaurantSummary {
  id: string;
  name: string;
  imageUrl?: string;
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
  restaurantId: string;
}

/**
 * Reviews state
 */
export interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

/**
 * API Error for reviews
 */
export interface ReviewsApiError {
  message: string;
  statusCode?: number;
}