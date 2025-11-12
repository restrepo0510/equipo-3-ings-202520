// hooks/useProfileForm.ts

import { useState, useCallback, useEffect } from 'react';
import type { UpdateProfileData, User } from '@/types/auth.types';
import { ProfileValidator } from '@/utils/profile.validators';
import { ProfileAlertService } from '@/services/profileAlertService';

/**
 * Profile form state
 */
interface ProfileFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

/**
 * Profile form field errors
 */
interface ProfileFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
}

/**
 * useProfileForm Hook
 * 
 * Manages profile form state and validation
 * Encapsulates form logic following React best practices
 */
export const useProfileForm = (initialUser: User | null) => {
  // ============================================================================
  // State
  // ============================================================================
  
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialUser?.name ?? '',
    phone: initialUser?.phone ?? '',
    email: initialUser?.email ?? '',
    password: '',
  });

  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Update form when user data changes
   */
  useEffect(() => {
    if (initialUser) {
      setFormData({
        name: initialUser.name ?? '',
        phone: initialUser.phone ?? '',
        email: initialUser.email ?? '',
        password: '',
      });
    }
  }, [initialUser]);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Updates a single form field
   */
  const updateField = useCallback((
    field: keyof ProfileFormData,
    value: string
  ): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Validates form and returns validation result
   */
  const validate = useCallback((): boolean => {
    const updateData: UpdateProfileData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      ...(formData.password ? { password: formData.password } : {}),
    };

    const validationResult = ProfileValidator.validateProfileForm(updateData);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      
      // Show first error
      const firstError = Object.values(validationResult.errors)[0];
      if (firstError) {
        ProfileAlertService.showValidationError(firstError);
      }
      
      return false;
    }

    setErrors({});
    return true;
  }, [formData]);

  /**
   * Gets update data with only changed fields
   */
  const getUpdateData = useCallback((): UpdateProfileData => {
    const updateData: UpdateProfileData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
    };

    // Only include password if it was changed
    if (formData.password.trim()) {
      updateData.password = formData.password;
    }

    return updateData;
  }, [formData]);

  /**
   * Resets form to initial state
   */
  const reset = useCallback((): void => {
    if (initialUser) {
      setFormData({
        name: initialUser.name ?? '',
        phone: initialUser.phone ?? '',
        email: initialUser.email ?? '',
        password: '',
      });
    }
    setErrors({});
    setIsDirty(false);
  }, [initialUser]);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    formData,
    errors,
    isDirty,
    updateField,
    validate,
    getUpdateData,
    reset,
  };
};