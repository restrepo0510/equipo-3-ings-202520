// services/authAlertService.ts

import { CustomAlertHelper } from '@/components/ui/CustomAlert';
import { ERROR_MESSAGES } from '@/constants/auth.constants';

/**
 * Authentication Alert Texts
 * Centralized text content for auth alerts
 */
const AUTH_ALERT_TEXT = {
  // Titles
  ERROR_TITLE: 'Error',
  SUCCESS_TITLE: 'Éxito',
  WARNING_TITLE: 'Atención',
  VALIDATION_TITLE: 'Campos incompletos',
  
  // Login
  LOGIN_SUCCESS_TITLE: '¡Bienvenido!',
  LOGIN_SUCCESS_MESSAGE: 'Has iniciado sesión correctamente',
  LOGIN_ERROR_TITLE: 'Error al iniciar sesión',
  
  // Registration
  REGISTRATION_SUCCESS_TITLE: '¡Registro exitoso!',
  REGISTRATION_SUCCESS_MESSAGE: 'Tu cuenta ha sido creada correctamente',
  REGISTRATION_ERROR_TITLE: 'Error en el registro',
  
  // Validation
  VALIDATION_MESSAGE: 'Por favor rellena todos los campos correctamente antes de enviar',
} as const;

/**
 * AuthAlertService
 * 
 * Centralized alert management for authentication screens
 * Single Responsibility: User notifications for login/signup
 */
export class AuthAlertService {
  // ============================================================================
  // Generic Alerts
  // ============================================================================

  /**
   * Shows generic error alert
   */
  static showError(message: string, title?: string): void {
    CustomAlertHelper.error(
      title || AUTH_ALERT_TEXT.ERROR_TITLE, 
      message
    );
  }

  /**
   * Shows generic success alert
   */
  static showSuccess(message: string, title?: string): void {
    CustomAlertHelper.success(
      title || AUTH_ALERT_TEXT.SUCCESS_TITLE, 
      message
    );
  }

  /**
   * Shows generic warning alert
   */
  static showWarning(message: string, title?: string): void {
    CustomAlertHelper.warning(
      title || AUTH_ALERT_TEXT.WARNING_TITLE, 
      message
    );
  }

  // ============================================================================
  // Login Alerts
  // ============================================================================

  /**
   * Shows login success alert
   */
  static showLoginSuccess(): void {
    CustomAlertHelper.success(
      AUTH_ALERT_TEXT.LOGIN_SUCCESS_TITLE,
      AUTH_ALERT_TEXT.LOGIN_SUCCESS_MESSAGE
    );
  }

  /**
   * Shows login error with specific message
   */
  static showLoginError(error?: Error | string): void {
    const message = typeof error === 'string' 
      ? error 
      : error?.message || ERROR_MESSAGES.LOGIN_FAILED;
    
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.LOGIN_ERROR_TITLE,
      message
    );
  }

  /**
   * Shows invalid credentials error
   */
  static showInvalidCredentials(): void {
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.LOGIN_ERROR_TITLE,
      ERROR_MESSAGES.INVALID_CREDENTIALS
    );
  }

  /**
   * Shows user not found error
   */
  static showUserNotFound(): void {
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.LOGIN_ERROR_TITLE,
      ERROR_MESSAGES.USER_NOT_FOUND
    );
  }

  // ============================================================================
  // Registration Alerts
  // ============================================================================

  /**
   * Shows registration success alert
   */
  static showRegistrationSuccess(): void {
    CustomAlertHelper.success(
      AUTH_ALERT_TEXT.REGISTRATION_SUCCESS_TITLE,
      AUTH_ALERT_TEXT.REGISTRATION_SUCCESS_MESSAGE
    );
  }

  /**
   * Shows registration error with specific message
   */
  static showRegistrationError(error?: Error | string): void {
    const message = typeof error === 'string'
      ? error
      : error?.message || ERROR_MESSAGES.REGISTRATION_FAILED;
    
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.REGISTRATION_ERROR_TITLE,
      message
    );
  }

  /**
   * Shows email already exists error
   */
  static showEmailAlreadyExists(): void {
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.REGISTRATION_ERROR_TITLE,
      ERROR_MESSAGES.EMAIL_ALREADY_EXISTS
    );
  }

  // ============================================================================
  // Validation Alerts
  // ============================================================================

  /**
   * Shows validation error with specific message
   */
  static showValidationError(message: string): void {
    CustomAlertHelper.warning(
      AUTH_ALERT_TEXT.VALIDATION_TITLE,
      message
    );
  }

  /**
   * Shows generic incomplete form error
   */
  static showIncompleteForm(): void {
    CustomAlertHelper.warning(
      AUTH_ALERT_TEXT.VALIDATION_TITLE,
      AUTH_ALERT_TEXT.VALIDATION_MESSAGE
    );
  }

  /**
   * Shows field-specific validation error
   */
  static showFieldError(fieldName: string, errorMessage: string): void {
    CustomAlertHelper.warning(
      `Error en ${fieldName}`,
      errorMessage
    );
  }

  // ============================================================================
  // Network Alerts
  // ============================================================================

  /**
   * Shows network connection error
   */
  static showNetworkError(): void {
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.ERROR_TITLE,
      ERROR_MESSAGES.NETWORK_ERROR
    );
  }

  /**
   * Shows server error
   */
  static showServerError(): void {
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.ERROR_TITLE,
      ERROR_MESSAGES.SERVER_ERROR
    );
  }

  /**
   * Shows timeout error
   */
  static showTimeoutError(): void {
    CustomAlertHelper.error(
      AUTH_ALERT_TEXT.ERROR_TITLE,
      ERROR_MESSAGES.TIMEOUT_ERROR
    );
  }
}