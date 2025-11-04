// hooks/useBusinessProfile.ts

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { restaurantService } from '@/services/restaurantService';
import { BusinessProfileValidator, BusinessProfileData } from '@/utils/businessProfile.validators';
import { CustomAlertHelper } from '@/components/ui/CustomAlert';
import { BUSINESS_PROFILE_TEXT } from '@/constants/businessProfile.constants';

/**
 * Business Profile Form State
 */
interface BusinessProfileFormState {
  formData: BusinessProfileData;
  isLoading: boolean;
  isSaving: boolean;
  hasChanges: boolean;
}

/**
 * Custom Hook: useBusinessProfile
 * 
 * Manages business profile form state, validation, and data operations
 * Follows SRP by handling only business profile logic
 */
export const useBusinessProfile = () => {
  const { user, token } = useAuth();

  const [state, setState] = useState<BusinessProfileFormState>({
    formData: {
      name: '',
      phone: '',
      email: '',
      address: '',
      description: '',
      category: '',
      openingTime: '',
      closingTime: '',
      imageUrl: '',
    },
    isLoading: true,
    isSaving: false,
    hasChanges: false,
  });

  /**
   * Loads restaurant data from backend
   */
  const loadRestaurantData = useCallback(async () => {
    if (!user?.id || !token) return;

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const restaurant = await restaurantService.getById(user.id);
      
      setState(prev => ({
        ...prev,
        formData: {
          name: restaurant.name || '',
          phone: restaurant.phone || '',
          email: restaurant.email || '',
          address: restaurant.address || '',
          description: restaurant.description || '',
          category: restaurant.category || '',
          openingTime: restaurant.openingTime || '',
          closingTime: restaurant.closingTime || '',
          imageUrl: restaurant.imageUrl || '',
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading restaurant data:', error);
      CustomAlertHelper.error(
        BUSINESS_PROFILE_TEXT.ALERTS.ERROR_LOAD_DATA,
        error instanceof Error ? error.message : undefined
      );
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [user?.id, token]);

  /**
   * Updates a single form field
   */
  const updateField = useCallback((field: keyof BusinessProfileData, value: string) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
      hasChanges: true,
    }));
  }, []);

  /**
   * Validates form and returns first error if invalid
   */
  const validateForm = useCallback((): boolean => {
    const validation = BusinessProfileValidator.validateBusinessProfile(state.formData);

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      CustomAlertHelper.error('Error', firstError);
      return false;
    }

    return true;
  }, [state.formData]);

  /**
   * Saves business profile to backend
   */
  const saveProfile = useCallback(async (): Promise<boolean> => {
    if (!user?.id || !token) return false;
    if (!validateForm()) return false;

    try {
      setState(prev => ({ ...prev, isSaving: true }));

      await restaurantService.update(
        String(user.id),
        {
          name: state.formData.name.trim(),
          phone: state.formData.phone.trim(),
          email: state.formData.email.trim(),
          address: state.formData.address.trim(),
          description: state.formData.description?.trim() || '',
          category: state.formData.category.trim(),
          openingTime: state.formData.openingTime.trim(),
          closingTime: state.formData.closingTime.trim(),
          imageUrl: state.formData.imageUrl?.trim() || '',
        },
        token
      );

      setState(prev => ({ ...prev, isSaving: false, hasChanges: false }));
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      CustomAlertHelper.error(
        BUSINESS_PROFILE_TEXT.ALERTS.ERROR_UPDATE,
        error instanceof Error ? error.message : undefined
      );
      setState(prev => ({ ...prev, isSaving: false }));
      return false;
    }
  }, [user?.id, token, state.formData, validateForm]);

  // Load data on mount
  useEffect(() => {
    loadRestaurantData();
  }, [loadRestaurantData]);

  return {
    formData: state.formData,
    isLoading: state.isLoading,
    isSaving: state.isSaving,
    hasChanges: state.hasChanges,
    updateField,
    saveProfile,
    reloadData: loadRestaurantData,
  };
};