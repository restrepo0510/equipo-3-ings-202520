// constants/auth.constants.ts

/**
 * Validation rules for authentication forms
 */
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2,
  MIN_ADDRESS_LENGTH: 10,
  MIN_PHONE_LENGTH: 10,
  PHONE_EXACT_LENGTH: 10, // NUEVO: Exactamente 10 dígitos
} as const;

/**
 * Regular expressions for input validation
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[0-9\s\-\(\)]{10,}$/,
  PHONE_DIGITS_ONLY: /^\d{10}$/, // NUEVO: Solo 10 dígitos
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
  INVALID_PHONE: 'El teléfono debe contener solo números',
  INVALID_PHONE_LENGTH: 'El teléfono debe tener exactamente 10 dígitos', // NUEVO
  
  // Length validation
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caracteres`,
  NAME_TOO_SHORT: `El nombre debe tener al menos ${VALIDATION_RULES.MIN_NAME_LENGTH} caracteres`,
  ADDRESS_TOO_SHORT: 'Por favor ingresa una dirección completa',
  
  // Authentication errors
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

/**
 * Auth UI Constants
 * Visual elements and icons for authentication screens
 */

export const AUTH_ICONS = {
  BACK_ARROW: 'arrow-back' as const,
  EYE_OPEN: 'eye-outline' as const,
  EYE_CLOSED: 'eye-off-outline' as const,
  
  SIZE: {
    SMALL: 16,
    MEDIUM: 20,
    LARGE: 24,
    EXTRA_LARGE: 28,
  },
  
  COLOR: {
    PRIMARY: '#000',
    SECONDARY: '#FFF',
    GRAY: '#7F8C8D',
    SUCCESS: '#27AE60',
    ERROR: '#E74C3C',
  },
} as const;

/**
 * Auth screen text content
 */
export const AUTH_UI_TEXT = {
  LOGIN: {
    TITLE: 'Iniciar Sesión',
    BUTTON: 'Entrar',
    SIGNUP_LINK: '¿No estás registrado?',
  },
  SIGNUP: {
    TITLE: 'Registro',
    BUTTON: 'Registrarse',
    ROLE_LABEL: 'Tipo de cuenta:',
  },
} as const;