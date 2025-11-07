// utils/businessProfile.validators.ts

import { BUSINESS_PROFILE_CONSTANTS, BUSINESS_PROFILE_TEXT } from '@/constants/businessProfile.constants';
import { ProfileValidator, FormValidationResult } from '@/utils/profile.validators';

/**
 * Business Profile Data Interface
 */
export interface BusinessProfileData {
  name: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  openingTime: string;
  closingTime: string;
  description?: string;
  imageUrl?: string;
}

/**
 * Business Profile Validator
 * Extends common profile validation with business-specific rules
 */
export class BusinessProfileValidator {
  /**
   * Validates address field
   */
  static validateAddress(address: string): { isValid: boolean; error?: string } {
    const trimmed = address.trim();
    
    if (trimmed.length === 0) {
      return { 
        isValid: false, 
        error: BUSINESS_PROFILE_TEXT.VALIDATION_ERRORS.ADDRESS_REQUIRED 
      };
    }

    if (trimmed.length < BUSINESS_PROFILE_CONSTANTS.VALIDATION.MIN_ADDRESS_LENGTH) {
      return {
        isValid: false,
        error: `La dirección debe tener al menos ${BUSINESS_PROFILE_CONSTANTS.VALIDATION.MIN_ADDRESS_LENGTH} caracteres`,
      };
    }

    return { isValid: true };
  }

  /**
   * Validates category field
   */
  static validateCategory(category: string): { isValid: boolean; error?: string } {
    const trimmed = category.trim();
    
    if (trimmed.length === 0) {
      return { 
        isValid: false, 
        error: BUSINESS_PROFILE_TEXT.VALIDATION_ERRORS.CATEGORY_REQUIRED 
      };
    }

    return { isValid: true };
  }

  /**
   * Validates time format (HH:MM)
   */
  static validateTime(time: string): { isValid: boolean; error?: string } {
    const trimmed = time.trim();

    if (!BUSINESS_PROFILE_CONSTANTS.VALIDATION.TIME_REGEX.test(trimmed)) {
      return {
        isValid: false,
        error: BUSINESS_PROFILE_TEXT.VALIDATION_ERRORS.INVALID_TIME_FORMAT,
      };
    }

    return { isValid: true };
  }

  /**
   * Validates complete business profile form
   */
  static validateBusinessProfile(data: BusinessProfileData): FormValidationResult {
    const errors: Record<string, string> = {};

    // Validate common fields using ProfileValidator
    const commonValidation = ProfileValidator.validateProfileForm({
      name: data.name,
      phone: data.phone,
      email: data.email,
    });

    if (!commonValidation.isValid) {
      Object.assign(errors, commonValidation.errors);
    }

    // Validate business-specific fields
    const addressValidation = this.validateAddress(data.address);
    if (!addressValidation.isValid) {
      errors.address = addressValidation.error!;
    }

    const categoryValidation = this.validateCategory(data.category);
    if (!categoryValidation.isValid) {
      errors.category = categoryValidation.error!;
    }

    if (!data.openingTime.trim()) {
      errors.openingTime = BUSINESS_PROFILE_TEXT.VALIDATION_ERRORS.OPENING_TIME_REQUIRED;
    } else {
      const openingTimeValidation = this.validateTime(data.openingTime);
      if (!openingTimeValidation.isValid) {
        errors.openingTime = openingTimeValidation.error!;
      }
    }

    if (!data.closingTime.trim()) {
      errors.closingTime = BUSINESS_PROFILE_TEXT.VALIDATION_ERRORS.CLOSING_TIME_REQUIRED;
    } else {
      const closingTimeValidation = this.validateTime(data.closingTime);
      if (!closingTimeValidation.isValid) {
        errors.closingTime = closingTimeValidation.error!;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}