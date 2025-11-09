// services/reservationApiService.ts

import { API_URL } from '@/config/api';
import { RESERVATION_ENDPOINTS } from '@/constants/reservations.constants';
import type { 
  Reservation, 
  CreateReservationDto,
  ReservationApiError 
} from '@/types/reservation.types';
// services/reservationService.ts
export { ReservationApiService as reservationService } from './reservationService';
export * from './reservationService';
/**
 * HTTP request configuration
 */
const createHeaders = (token: string): HeadersInit => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Handle API response and errors
 */
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json().catch(() => ({
    message: 'Unknown error occurred',
  }));

  if (!response.ok) {
    const error: ReservationApiError = {
      message: data.message || 'Request failed',
      statusCode: response.status,
    };
    throw error;
  }

  return data;
};

/**
 * ReservationApiService
 * Handles all HTTP communication for reservations
 * Single Responsibility: API requests only
 */
export class ReservationApiService {
  /**
   * Create a new reservation
   */
  static async createReservation(
    data: CreateReservationDto,
    token: string
  ): Promise<Reservation> {
    try {
      const response = await fetch(`${API_URL}${RESERVATION_ENDPOINTS.BASE}`, {
        method: 'POST',
        headers: createHeaders(token),
        body: JSON.stringify(data),
      });

      const reservation = await handleApiResponse<Reservation>(response);
      console.log('✅ Reservation created:', reservation.id);
      return reservation;
    } catch (error) {
      console.error('❌ Error creating reservation:', error);
      throw error;
    }
  }

  /**
   * Get user's reservations
   */
  static async getMyReservations(token: string): Promise<Reservation[]> {
    try {
      const response = await fetch(
        `${API_URL}${RESERVATION_ENDPOINTS.MY_RESERVATIONS}`,
        {
          method: 'GET',
          headers: createHeaders(token),
        }
      );

      const reservations = await handleApiResponse<Reservation[]>(response);
      console.log('✅ Reservations loaded:', reservations.length);
      return reservations;
    } catch (error) {
      console.error('❌ Error loading reservations:', error);
      throw error;
    }
  }

  /**
   * Get reservation by ID
   */
  static async getReservationById(
    reservationId: string,
    token: string
  ): Promise<Reservation> {
    try {
      const response = await fetch(
        `${API_URL}${RESERVATION_ENDPOINTS.BY_ID(reservationId)}`,
        {
          method: 'GET',
          headers: createHeaders(token),
        }
      );

      const reservation = await handleApiResponse<Reservation>(response);
      console.log('✅ Reservation loaded:', reservation.id);
      return reservation;
    } catch (error) {
      console.error('❌ Error loading reservation:', error);
      throw error;
    }
  }

  /**
   * Confirm reservation (after payment)
   */
  static async confirmReservation(
    reservationId: string,
    token: string
  ): Promise<Reservation> {
    try {
      const response = await fetch(
        `${API_URL}${RESERVATION_ENDPOINTS.CONFIRM(reservationId)}`,
        {
          method: 'PATCH',
          headers: createHeaders(token),
        }
      );

      const reservation = await handleApiResponse<Reservation>(response);
      console.log('✅ Reservation confirmed:', reservation.id);
      return reservation;
    } catch (error) {
      console.error('❌ Error confirming reservation:', error);
      throw error;
    }
  }

  /**
   * Cancel reservation
   */
  static async cancelReservation(
    reservationId: string,
    token: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `${API_URL}${RESERVATION_ENDPOINTS.CANCEL(reservationId)}`,
        {
          method: 'DELETE',
          headers: createHeaders(token),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      console.log('✅ Reservation cancelled:', reservationId);
    } catch (error) {
      console.error('❌ Error cancelling reservation:', error);
      throw error;
    }
  }
}