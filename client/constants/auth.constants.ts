/**
 client/constants/auth.constants.ts
 * Authentication Constants
 * 
 * Centralized configuration values for authentication feature
 * Prevents magic numbers and strings throughout the codebase
 */

/**
 * Validation rules for authentication forms
 */
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2,
  MIN_ADDRESS_LENGTH: 10,
  MIN_PHONE_LENGTH: 10,
} as const;

/**
 * Regular expressions for input validation
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[0-9\s\-\(\)]{10,}$/,
} as const;

/**
 * AsyncStorage keys for persistence
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@auth_user',
} as const;

/**
 * API endpoint paths
 */
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  USERS: '/auth/users',
} as const;

/**
 * User-facing error messages
 */
export const ERROR_MESSAGES = {
  // Required fields
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  NAME_REQUIRED: 'Name is required',
  PHONE_REQUIRED: 'Phone number is required',
  ADDRESS_REQUIRED: 'Business address is required',
  
  // Format validation
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  
  // Length validation
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION_RULES.MIN_NAME_LENGTH} characters`,
  ADDRESS_TOO_SHORT: 'Please enter a complete address',
  
  // Authentication errors
  LOGIN_FAILED: 'Unable to connect to server',
  REGISTRATION_FAILED: 'Unable to complete registration',
  VALIDATION_ERROR: 'Please fix the errors before submitting',
  UNAUTHORIZED: 'Invalid credentials',
  
  // Network errors
  NETWORK_ERROR: 'Network connection failed',
  SERVER_ERROR: 'Server error occurred',
} as const;

/**
 * Success messages for user feedback
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTRATION_SUCCESS: 'Registration successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
} as const;

/**
 * Role display names
 */
export const ROLE_LABELS = {
  customer: '👤 Usuario',
  business: '🏢 Empresa',
} as const;