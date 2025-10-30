// services/reviewService.ts
import { API_URL } from '@/config/api';

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    profileImage?: string;
  };
  restaurant: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  rating: number;
  text: string;
  createdAt: string;
}

export interface CreateReviewDto {
  restaurantId: string;
  productId: string;
  rating: number;
  text: string;
}

class ReviewService {
  async create(data: CreateReviewDto, token: string): Promise<Review> {
    console.log('📤 Creating review with token:', token ? 'exists' : 'missing');
    console.log('📤 API URL:', `${API_URL}/reviews`);
    
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log('📥 Response status:', response.status);
    console.log('📥 Response data:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || 'Error creating review');
    }

    return responseData;
  }

  async getByRestaurant(restaurantId: string, token: string): Promise<Review[]> {
    const response = await fetch(`${API_URL}/reviews/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error loading reviews');
    return response.json();
  }

  async getByUser(token: string): Promise<Review[]> {
    const response = await fetch(`${API_URL}/reviews/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error loading user reviews');
    return response.json();
  }

  async delete(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error deleting review');
  }
}

export const reviewService = new ReviewService();