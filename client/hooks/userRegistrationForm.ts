/**
 * useRegistrationForm Hook
 * 
 * Custom hook for managing registration form state and validation
 * Handles both customer and business account registration
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { RegistrationData, ValidationErrors, UserRole } from '@/types/auth.types';
import { validateRegistrationForm, isFormValid } from '@/utils/validators';
import { ERROR_MESSAGES } from '@/constants/auth.constants';

/**
 * Hook return type
 */
interface UseRegistrationFormReturn {
  formData: RegistrationData;
  errors: ValidationErrors<RegistrationData>;
  isSubmitting: boolean;
  handleFieldChange: (field: keyof RegistrationData, value: string) => void;
  handleRoleChange: (role: UserRole) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

/**
 * Initial form state
 */
const INITIAL_FORM_DATA: RegistrationData = {
  name: '',
  phone: '',
  email: '',
  password: '',
  role: UserRole.CUSTOMER,
  address: '',
};

/**
 * Custom hook for registration form management
 * 
 * @returns Form state and handlers
 * 
 * @example
 * ```tsx
 * const { 
 *   formData, 
 *   errors, 
 *   handleFieldChange, 
 *   handleRoleChange,
 *   handleSubmit 
 * } = useRegistrationForm();
 * ```
 */
export const useRegistrationForm = (): UseRegistrationFormReturn => {
  const { register, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState<RegistrationData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors<RegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates a single form field and clears its error
   */
  const handleFieldChange = useCallback((
    field: keyof RegistrationData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Updates user role and clears related errors
   */
  const handleRoleChange = useCallback((role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    
    // Clear address error when switching roles
    if (errors.address) {
      setErrors(prev => ({ ...prev, address: undefined }));
    }
  }, [errors.address]);

  /**
   * Validates and submits the registration form
   */
  const handleSubmit = useCallback(async () => {
    // Validate form data
    const validationErrors = validateRegistrationForm(formData);
    
    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors);
      Alert.alert('Validation Error', ERROR_MESSAGES.VALIDATION_ERROR);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Prepare registration data
      const registrationData: RegistrationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
        // Only include address for business accounts
        address: formData.role === UserRole.BUSINESS 
          ? formData.address?.trim() 
          : undefined,
      };

      // Call authentication service
      await register(registrationData);

      console.log('✅ Registration successful');
      // Navigation is handled by AuthContext
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      
      Alert.alert(
        'Registration Failed',
        error.message || ERROR_MESSAGES.REGISTRATION_FAILED
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, register]);

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
    handleRoleChange,
    handleSubmit,
    resetForm,
  };
};