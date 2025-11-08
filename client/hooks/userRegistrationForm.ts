// hooks/userRegistrationForm.ts

import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { RegistrationData, ValidationErrors, UserRole } from '@/types/auth.types';
import { validateRegistrationForm, isFormValid, formatPhoneNumber } from '@/utils/validators';
import { AuthAlertService } from '@/services/authAlertService';

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
 * IMPROVED: Uses CustomAlert and formats phone number
 */
export const useRegistrationForm = (): UseRegistrationFormReturn => {
  const { register, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState<RegistrationData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors<RegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates a single form field and clears its error
   * IMPROVED: Formats phone number to only digits
   */
  const handleFieldChange = useCallback((
    field: keyof RegistrationData,
    value: string
  ) => {
    // Format phone to only digits
    if (field === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      
      // Limit to 10 digits
      if (formattedPhone.length <= 10) {
        setFormData(prev => ({ ...prev, [field]: formattedPhone }));
      }
      // Don't update if trying to add more than 10 digits
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
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
   * IMPROVED: Uses AuthAlertService for all alerts
   */
  const handleSubmit = useCallback(async () => {
    // Validate form data
    const validationErrors = validateRegistrationForm(formData);
    
    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors);
      AuthAlertService.showIncompleteForm(); // IMPROVED: Custom alert
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Prepare registration data with formatted phone
      const registrationData: RegistrationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formatPhoneNumber(formData.phone), // Ensure only digits
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
      // No success alert shown - user sees immediate navigation
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      
      // Show user-friendly error message with CustomAlert
      AuthAlertService.showRegistrationError(error); // IMPROVED: Custom alert
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