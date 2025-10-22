/**
 * Authentication Service
 * 
 * Handles all API communication for authentication
 * Following Single Responsibility Principle - only deals with HTTP requests
 */

import { API_URL } from '@/config/api';
import { LoginCredentials, RegistrationData, AuthResponse, ApiError } from '../types/auth.types';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants/auth.constants';

/**
 * HTTP request configuration
 */
const REQUEST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

/**
 * Creates a custom error from API response
 */
const createApiError = (message: string, statusCode?: number): ApiError => ({
  message,
  statusCode,
});

/**
 * Maps backend error messages to user-friendly messages
 */
const mapBackendError = (backendMessage: string, statusCode: number): string => {
  const lowerMessage = backendMessage.toLowerCase();
  
  // Login errors
  if (lowerMessage.includes('user not found') || lowerMessage.includes('no user')) {
    return ERROR_MESSAGES.USER_NOT_FOUND;
  }
  if (lowerMessage.includes('invalid credentials') || lowerMessage.includes('incorrect password')) {
    return ERROR_MESSAGES.INVALID_CREDENTIALS;
  }
  if (lowerMessage.includes('wrong password')) {
    return ERROR_MESSAGES.WRONG_PASSWORD;
  }
  
  // Registration errors
  if (lowerMessage.includes('email already') || lowerMessage.includes('already registered')) {
    return ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
  }
  if (lowerMessage.includes('validation') || lowerMessage.includes('required')) {
    return ERROR_MESSAGES.VALIDATION_ERROR;
  }
  
  // HTTP status codes
  if (statusCode === 401) {
    return ERROR_MESSAGES.INVALID_CREDENTIALS;
  }
  if (statusCode === 404) {
    return ERROR_MESSAGES.USER_NOT_FOUND;
  }
  if (statusCode === 409) {
    return ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
  }
  if (statusCode >= 500) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }
  
  // Default: return original message if we can't map it
  return backendMessage;
};

/**
 * Handles API response and errors
 */
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    const userFriendlyMessage = mapBackendError(
      data.message || ERROR_MESSAGES.SERVER_ERROR,
      response.status
    );
    
    throw createApiError(userFriendlyMessage, response.status);
  }

  return data;
};

/**
 * Authentication Service Class
 * 
 * Encapsulates all authentication-related API calls
 */
class AuthService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Authenticates user with email and password
   * 
   * @param credentials - User login credentials
   * @returns Promise resolving to authentication response
   * @throws ApiError with user-friendly message if authentication fails
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        ...REQUEST_CONFIG,
        body: JSON.stringify(credentials),
      });

      return await handleApiResponse<AuthResponse>(response);
    } catch (error) {
      // If it's already an ApiError, re-throw it
      if ('statusCode' in (error as any)) {
        throw error;
      }
      
      // Network or other errors
      if (error instanceof TypeError) {
        throw createApiError(ERROR_MESSAGES.NETWORK_ERROR);
      }
      
      if (error instanceof Error) {
        throw createApiError(error.message || ERROR_MESSAGES.LOGIN_FAILED);
      }
      
      throw createApiError(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  /**
   * Registers a new user account
   * 
   * @param data - User registration data
   * @returns Promise resolving to authentication response
   * @throws ApiError with user-friendly message if registration fails
   */
  async register(data: RegistrationData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        ...REQUEST_CONFIG,
        body: JSON.stringify(data),
      });

      return await handleApiResponse<AuthResponse>(response);
    } catch (error) {
      // If it's already an ApiError, re-throw it
      if ('statusCode' in (error as any)) {
        throw error;
      }
      
      // Network or other errors
      if (error instanceof TypeError) {
        throw createApiError(ERROR_MESSAGES.NETWORK_ERROR);
      }
      
      if (error instanceof Error) {
        throw createApiError(error.message || ERROR_MESSAGES.REGISTRATION_FAILED);
      }
      
      throw createApiError(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  /**
   * Validates authentication token
   * 
   * @param token - JWT authentication token
   * @returns Promise resolving to boolean indicating validity
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/validate`, {
        method: 'GET',
        headers: {
          ...REQUEST_CONFIG.headers,
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }
}

/**
 * Singleton instance of AuthService
 */
export const authService = new AuthService(API_URL);