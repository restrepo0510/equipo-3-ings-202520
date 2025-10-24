// services/reservationService.ts
import { API_URL } from '@/config/api';

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export interface Reservation {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  total: number;
  status: ReservationStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  product?: any;
}

interface CreateReservationDto {
  productId: string;
  quantity: number;
}

class ReservationService {
  /**
   * Create a new reservation
   */
  async create(
    createReservationDto: CreateReservationDto,
    token: string
  ): Promise<Reservation> {
    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createReservationDto),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create reservation');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }

  /**
   * Get user's reservations
   */
  async getMyReservations(token: string): Promise<Reservation[]> {
    try {
      const response = await fetch(`${API_URL}/reservations/my-reservations`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  }

  /**
   * Get reservation by ID
   */
  async getById(reservationId: string, token: string): Promise<Reservation> {
    try {
      const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reservation');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  }

  /**
   * Confirm reservation (after payment)
   */
  async confirm(reservationId: string, token: string): Promise<Reservation> {
    try {
      const response = await fetch(
        `${API_URL}/reservations/${reservationId}/confirm`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to confirm reservation');
      }

      return await response.json();
    } catch (error) {
      console.error('Error confirming reservation:', error);
      throw error;
    }
  }

  /**
   * Cancel reservation
   */
  async cancel(reservationId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      throw error;
    }
  }

  /**
   * Calculate time remaining in seconds
   */
  getTimeRemaining(expiresAt: Date | string): number {
    const expirationTime = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;
    const now = new Date();
    const diff = expirationTime.getTime() - now.getTime();
    return Math.max(0, Math.floor(diff / 1000));
  }
}

export const reservationService = new ReservationService();
export default reservationService;