/**
 * Authentication Service
 * 
 * Handles all API communication for authentication
 * Following Single Responsibility Principle - only deals with HTTP requests
 */

import { API_URL } from '@/config/api';
import { 
  LoginCredentials, 
  RegisterData,
  RegistrationData, 
  AuthResponse, 
  ApiError,
  UserRole 
} from '@/types/auth.types';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants/auth.constants';

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
 * Handles API response and errors
 */
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    throw createApiError(
      data.message || ERROR_MESSAGES.SERVER_ERROR,
      response.status
    );
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
   * @throws ApiError if authentication fails
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
      if (error instanceof Error) {
        throw createApiError(error.message || ERROR_MESSAGES.LOGIN_FAILED);
      }
      throw createApiError(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  /**
   * Registers a new user account
   * Accepts both RegisterData and RegistrationData types
   * 
   * @param data - User registration data
   * @returns Promise resolving to authentication response
   * @throws ApiError if registration fails
   */
  async register(data: RegisterData | RegistrationData): Promise<AuthResponse> {
    try {
      // Normalize data to ensure role is always set
      const registrationData: RegistrationData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: 'role' in data && data.role ? data.role : UserRole.CUSTOMER,
        address: data.address,
      };

      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        ...REQUEST_CONFIG,
        body: JSON.stringify(registrationData),
      });

      return await handleApiResponse<AuthResponse>(response);
    } catch (error) {
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