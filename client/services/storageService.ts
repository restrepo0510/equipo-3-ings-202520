/**
 * Storage Service
 * 
 * Handles persistent storage of authentication data
 * Abstracts AsyncStorage implementation for testability
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/auth.types';
import { STORAGE_KEYS } from '@/constants/auth.constants';

/**
 * Stored authentication data structure
 */
interface StoredAuthData {
  token: string;
  user: User;
}

/**
 * Storage Service Class
 * 
 * Provides type-safe, promise-based storage operations
 */
class StorageService {
  /**
   * Saves authentication data to storage
   * 
   * @param token - JWT authentication token
   * @param user - User data
   * @throws Error if storage operation fails
   */
  async saveAuthData(token: string, user: User): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user)),
      ]);
    } catch (error) {
      console.error('Failed to save auth data:', error);
      throw new Error('Storage operation failed');
    }
  }

  /**
   * Retrieves authentication data from storage
   * 
   * @returns Promise resolving to stored auth data or null
   */
  async getAuthData(): Promise<StoredAuthData | null> {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
      ]);

      if (!token || !userData) {
        return null;
      }

      const user: User = JSON.parse(userData);
      return { token, user };
    } catch (error) {
      console.error('Failed to retrieve auth data:', error);
      return null;
    }
  }

  /**
   * Removes authentication data from storage
   * 
   * @throws Error if storage operation fails
   */
  async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
      ]);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
      throw new Error('Storage operation failed');
    }
  }

  /**
   * Updates user data in storage
   * 
   * @param user - Updated user data
   * @throws Error if storage operation fails
   */
  async updateUserData(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to update user data:', error);
      throw new Error('Storage operation failed');
    }
  }

  /**
   * Clears all app storage (for testing/debugging)
   * 
   * @throws Error if storage operation fails
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw new Error('Storage operation failed');
    }
  }
}

/**
 * Singleton instance of StorageService
 */
export const storageService = new StorageService();