// utils/profile.validators.ts

import { PROFILE_CONSTANTS, PROFILE_TEXT } from '@/constants/profile.constants';
import type { UpdateProfileData } from '@/types/auth.types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof UpdateProfileData, string>>;
}

export class ProfileValidator {
  static validateEmail(email: string): ValidationResult {
    const trimmedEmail = email.trim();
    
    if (trimmedEmail.length === 0) {
      return { isValid: false, error: 'Email es requerido' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { isValid: false, error: PROFILE_TEXT.ALERTS.ERROR_INVALID_EMAIL };
    }

    return { isValid: true };
  }

  static validateName(name: string): ValidationResult {
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
      return { isValid: false, error: 'Nombre es requerido' };
    }

    if (trimmedName.length < 2) {
      return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
    }

    // Solo letras, espacios y tildes
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(trimmedName)) {
      return { isValid: false, error: 'El nombre solo puede contener letras' };
    }

    if (trimmedName.length > 10) {
      return { isValid: false, error: 'El nombre no puede superar 30 caracteres' };
    }

    return { isValid: true };
  }

  static validatePhone(phone: string): ValidationResult {
    const trimmedPhone = phone.trim();
    
    if (trimmedPhone.length === 0) {
      return { isValid: false, error: 'Teléfono es requerido' };
    }

    // Solo números
    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    
    if (digitsOnly.length !== 10 ) {
      return { isValid: false, error: 'El teléfono debe tener 10 dígitos' };
    }

   

    return { isValid: true };
  }

  static validatePassword(password: string): ValidationResult {
    if (password.length === 0) {
      return { isValid: true }; // Opcional
    }

    if (password.length < 6) {
      return { isValid: false, error: PROFILE_TEXT.ALERTS.ERROR_PASSWORD_TOO_SHORT };
    }

    return { isValid: true };
  }

  static validateProfileForm(data: UpdateProfileData): FormValidationResult {
    const errors: Partial<Record<keyof UpdateProfileData, string>> = {};

    if (data.name !== undefined) {
      const nameResult = this.validateName(data.name);
      if (!nameResult.isValid) errors.name = nameResult.error;
    }

    if (data.email !== undefined) {
      const emailResult = this.validateEmail(data.email);
      if (!emailResult.isValid) errors.email = emailResult.error;
    }

    if (data.phone !== undefined) {
      const phoneResult = this.validatePhone(data.phone);
      if (!phoneResult.isValid) errors.phone = phoneResult.error;
    }

    if (data.password !== undefined) {
      const passwordResult = this.validatePassword(data.password);
      if (!passwordResult.isValid) errors.password = passwordResult.error;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}