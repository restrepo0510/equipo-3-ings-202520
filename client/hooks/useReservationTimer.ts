// hooks/useReservationTimer.ts

import { useState, useEffect, useRef, useCallback } from 'react';
import { RESERVATION_TIME } from '@/constants/reservations.constants';
import { ReservationUtils } from '@/utils/reservation.utils';
import type { TimerState } from '@/types/reservation.types';

/**
 * Hook return type
 */
interface UseReservationTimerReturn {
  timerState: TimerState;
  stopTimer: () => void;
  resetTimer: () => void;
}

/**
 * useReservationTimer Hook
 * 
 * Manages countdown timer for reservation expiration
 * Handles timer lifecycle and state
 * 
 * @param initialTime - Initial time in seconds
 * @param onExpire - Callback when timer expires
 * @returns Timer state and controls
 */
export const useReservationTimer = (
  initialTime: number = RESERVATION_TIME.DURATION_SECONDS,
  onExpire?: () => void
): UseReservationTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Stop timer
   */
  const stopTimer = useCallback((): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Reset timer
   */
  const resetTimer = useCallback((): void => {
    stopTimer();
    setTimeLeft(initialTime);
  }, [initialTime, stopTimer]);

  /**
   * Start countdown
   */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      stopTimer();
    };
  }, [onExpire, stopTimer]);

  /**
   * Create timer state
   */
  const timerState = ReservationUtils.createTimerState(timeLeft);

  return {
    timerState,
    stopTimer,
    resetTimer,
  };
};