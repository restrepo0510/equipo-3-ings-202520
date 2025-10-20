/**
 * useLoginForm Hook
 * 
 * Custom hook for managing login form state and validation
 * Encapsulates form logic following Single Responsibility Principle
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials, ValidationErrors } from '../types/auth.types';
import { validateLoginForm, isFormValid } from '@/utils/validators';
import { ERROR_MESSAGES } from '@/constants/auth.constants';

/**
 * Hook return type
 */
interface UseLoginFormReturn {
  formData: LoginCredentials;
  errors: ValidationErrors<LoginCredentials>;
  isSubmitting: boolean;
  handleFieldChange: (field: keyof LoginCredentials, value: string) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

/**
 * Initial form state
 */
const INITIAL_FORM_DATA: LoginCredentials = {
  email: '',
  password: '',
};

/**
 * Custom hook for login form management
 * 
 * @returns Form state and handlers
 * 
 * @example
 * ```tsx
 * const { formData, errors, handleFieldChange, handleSubmit } = useLoginForm();
 * 
 * <FormField
 *   value={formData.email}
 *   error={errors.email}
 *   onChangeText={(value) => handleFieldChange('email', value)}
 * />
 * ```
 */
export const useLoginForm = (): UseLoginFormReturn => {
  const { login, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState<LoginCredentials>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors<LoginCredentials>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates a single form field and clears its error
   */
  const handleFieldChange = useCallback((
    field: keyof LoginCredentials,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Validates and submits the login form
   */
  const handleSubmit = useCallback(async () => {
    // Validate form data
    const validationErrors = validateLoginForm(formData);
    
    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors);
      Alert.alert('Validation Error', ERROR_MESSAGES.VALIDATION_ERROR);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Call authentication service
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log('✅ Login successful');
      // Navigation is handled by AuthContext
    } catch (error: any) {
      console.error('❌ Login error:', error);
      
      Alert.alert(
        'Login Failed',
        error.message || ERROR_MESSAGES.LOGIN_FAILED
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, login]);

  /**
   * Resets form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting: isSubmitting || authLoading,
    handleFieldChange,
    handleSubmit,
    resetForm,
  };
};