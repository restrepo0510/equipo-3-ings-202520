// utils/validators.ts

import { LoginCredentials, RegistrationData, ValidationErrors, UserRole } from '@/types/auth.types';
import { VALIDATION_RULES, VALIDATION_PATTERNS, ERROR_MESSAGES } from '@/constants/auth.constants';

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_PATTERNS.EMAIL.test(email);
};

/**
 * Validates phone number format - IMPROVED
 * Only accepts exactly 10 digits, no special characters
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove all non-numeric characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Must be exactly 10 digits
  return digitsOnly.length === VALIDATION_RULES.PHONE_EXACT_LENGTH;
};

/**
 * Formats phone number to only digits - NUEVO
 * Removes any non-numeric characters
 */
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * Validates password length
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;
};

/**
 * Validates name length
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= VALIDATION_RULES.MIN_NAME_LENGTH;
};

/**
 * Validates address for business accounts
 */
export const isValidAddress = (address: string | undefined): boolean => {
  if (!address) return false;
  return address.trim().length >= VALIDATION_RULES.MIN_ADDRESS_LENGTH;
};

/**
 * Validates login form data
 */
export const validateLoginForm = (
  credentials: LoginCredentials
): ValidationErrors<LoginCredentials> => {
  const errors: ValidationErrors<LoginCredentials> = {};

  // Email validation
  const trimmedEmail = credentials.email.trim();
  if (!trimmedEmail) {
    errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  // Password validation
  if (!credentials.password) {
    errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
  } else if (!isValidPassword(credentials.password)) {
    errors.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }

  return errors;
};

/**
 * Validates registration form data - IMPROVED
 */
export const validateRegistrationForm = (
  data: RegistrationData
): ValidationErrors<RegistrationData> => {
  const errors: ValidationErrors<RegistrationData> = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = ERROR_MESSAGES.NAME_REQUIRED;
  } else if (!isValidName(data.name)) {
    errors.name = ERROR_MESSAGES.NAME_TOO_SHORT;
  }

  // Phone validation - IMPROVED
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (!data.phone.trim()) {
    errors.phone = ERROR_MESSAGES.PHONE_REQUIRED;
  } else if (phoneDigits.length !== VALIDATION_RULES.PHONE_EXACT_LENGTH) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE_LENGTH;
  } else if (!isValidPhone(data.phone)) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE;
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
  } else if (!isValidEmail(data.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  // Password validation
  if (!data.password) {
    errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
  } else if (!isValidPassword(data.password)) {
    errors.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }

  // Address validation for business accounts
  if (data.role === UserRole.BUSINESS) {
    if (!data.address?.trim()) {
      errors.address = ERROR_MESSAGES.ADDRESS_REQUIRED;
    } else if (!isValidAddress(data.address)) {
      errors.address = ERROR_MESSAGES.ADDRESS_TOO_SHORT;
    }
  }

  return errors;
};

/**
 * Checks if validation errors object is empty
 */
export const isFormValid = <T>(errors: ValidationErrors<T>): boolean => {
  return Object.keys(errors).length === 0;
};