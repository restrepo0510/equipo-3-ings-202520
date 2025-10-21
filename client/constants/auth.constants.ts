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
  EMAIL_REQUIRED: 'El correo electrónico es obligatorio',
  PASSWORD_REQUIRED: 'La contraseña es obligatoria',
  NAME_REQUIRED: 'El nombre es obligatorio',
  PHONE_REQUIRED: 'El número de teléfono es obligatorio',
  ADDRESS_REQUIRED: 'La dirección del negocio es obligatoria',
  
  // Format validation
  INVALID_EMAIL: 'Por favor ingresa un correo electrónico válido',
  INVALID_PHONE: 'Por favor ingresa un número de teléfono válido',
  
  // Length validation
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caracteres`,
  NAME_TOO_SHORT: `El nombre debe tener al menos ${VALIDATION_RULES.MIN_NAME_LENGTH} caracteres`,
  ADDRESS_TOO_SHORT: 'Por favor ingresa una dirección completa',
  
  // Authentication errors - MÁS ESPECÍFICOS
  LOGIN_FAILED: 'No se pudo iniciar sesión',
  INVALID_CREDENTIALS: 'Correo o contraseña incorrectos',
  USER_NOT_FOUND: 'No existe una cuenta con este correo',
  WRONG_PASSWORD: 'La contraseña es incorrecta',
  EMAIL_ALREADY_EXISTS: 'Ya existe una cuenta con este correo',
  REGISTRATION_FAILED: 'No se pudo completar el registro',
  VALIDATION_ERROR: 'Por favor completa todos los campos correctamente',
  INCOMPLETE_FORM: 'Por favor rellena todos los campos antes de enviar',
  UNAUTHORIZED: 'Credenciales inválidas',
  
  // Network errors
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde',
  TIMEOUT_ERROR: 'La solicitud tardó demasiado. Intenta de nuevo',
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