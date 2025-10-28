// utils/profile.validators.ts

import { PROFILE_CONSTANTS, PROFILE_TEXT } from '@/constants/profile.constants';
import type { UpdateProfileData } from '@/types/auth.types';

/**
 * Validation result structure
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Form validation result with field-specific errors
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof UpdateProfileData, string>>;
}

/**
 * ProfileValidator
 * 
 * Handles all validation logic for profile data
 * Single Responsibility: Validation only
 */
export class ProfileValidator {
  /**
   * Validates email format
   */
  static validateEmail(email: string): ValidationResult {
    const trimmedEmail = email.trim();
    
    if (trimmedEmail.length === 0) {
      return { isValid: false, error: 'Email is required.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { 
        isValid: false, 
        error: PROFILE_TEXT.ALERTS.ERROR_INVALID_EMAIL 
      };
    }

    return { isValid: true };
  }

  /**
   * Validates name format and length
   */
  static validateName(name: string): ValidationResult {
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
      return { isValid: false, error: 'Name is required.' };
    }

    if (trimmedName.length < PROFILE_CONSTANTS.VALIDATION.MIN_NAME_LENGTH) {
      return { 
        isValid: false, 
        error: `Name must be at least ${PROFILE_CONSTANTS.VALIDATION.MIN_NAME_LENGTH} characters.` 
      };
    }

    if (trimmedName.length > PROFILE_CONSTANTS.VALIDATION.MAX_NAME_LENGTH) {
      return { 
        isValid: false, 
        error: `Name must be less than ${PROFILE_CONSTANTS.VALIDATION.MAX_NAME_LENGTH} characters.` 
      };
    }

    return { isValid: true };
  }

  /**
   * Validates phone number format
   */
  static validatePhone(phone: string): ValidationResult {
    const trimmedPhone = phone.trim();
    
    // Phone is optional
    if (trimmedPhone.length === 0) {
      return { isValid: true };
    }

    if (!PROFILE_CONSTANTS.VALIDATION.PHONE_REGEX.test(trimmedPhone)) {
      return { 
        isValid: false, 
        error: PROFILE_TEXT.ALERTS.ERROR_INVALID_PHONE 
      };
    }

    return { isValid: true };
  }

  /**
   * Validates password strength
   */
  static validatePassword(password: string): ValidationResult {
    // Password is optional for updates
    if (password.length === 0) {
      return { isValid: true };
    }

    if (password.length < PROFILE_CONSTANTS.VALIDATION.MIN_PASSWORD_LENGTH) {
      return { 
        isValid: false, 
        error: PROFILE_TEXT.ALERTS.ERROR_PASSWORD_TOO_SHORT 
      };
    }

    return { isValid: true };
  }

  /**
   * Validates entire profile form
   */
  static validateProfileForm(data: UpdateProfileData): FormValidationResult {
    const errors: Partial<Record<keyof UpdateProfileData, string>> = {};

    // Validate name
    if (data.name !== undefined) {
      const nameResult = this.validateName(data.name);
      if (!nameResult.isValid) {
        errors.name = nameResult.error;
      }
    }

    // Validate email
    if (data.email !== undefined) {
      const emailResult = this.validateEmail(data.email);
      if (!emailResult.isValid) {
        errors.email = emailResult.error;
      }
    }

    // Validate phone
    if (data.phone !== undefined) {
      const phoneResult = this.validatePhone(data.phone);
      if (!phoneResult.isValid) {
        errors.phone = phoneResult.error;
      }
    }

    // Validate password
    if (data.password !== undefined) {
      const passwordResult = this.validatePassword(data.password);
      if (!passwordResult.isValid) {
        errors.password = passwordResult.error;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validates image URI format
   */
  static validateImageUri(uri: string | null | undefined): ValidationResult {
    if (!uri || uri.trim().length === 0) {
      return { isValid: true }; // Image is optional
    }

    // Basic URI validation
    const trimmedUri = uri.trim();
    if (!trimmedUri.startsWith('file://') && !trimmedUri.startsWith('http')) {
      return { isValid: false, error: 'Invalid image URI format.' };
    }

    return { isValid: true };
  }
}