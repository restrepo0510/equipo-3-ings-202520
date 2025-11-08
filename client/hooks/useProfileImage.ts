// hooks/useProfileImage.ts

import { useState, useCallback, useEffect } from 'react';
import { ProfileImageService } from '@/services/profileImageService';
import { ProfileAlertService } from '@/services/profileAlertService';
import type { User } from '@/types/auth.types';

/**
 * useProfileImage Hook
 * 
 * Manages profile image state and operations
 * Encapsulates image picking and validation logic
 */
export const useProfileImage = (initialUser: User | null) => {
  // ============================================================================
  // State
  // ============================================================================
  
  const [imageUri, setImageUri] = useState<string | null>(
    initialUser?.profileImage ?? null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Update image when user data changes
   */
  useEffect(() => {
    if (initialUser?.profileImage) {
      setImageUri(initialUser.profileImage);
      setHasError(false);
    }
  }, [initialUser?.profileImage]);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Opens image picker and updates image URI
   */
  const pickImage = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const result = await ProfileImageService.pickImage();

      if (result.success && result.imageUri) {
        setImageUri(result.imageUri);
        setHasError(false);
        console.log('✅ Profile image updated:', result.imageUri);
      } else if (result.error) {
        ProfileAlertService.showImagePickerError(
          result.error,
          result.errorMessage
        );
      }
    } catch (error) {
      console.error('❌ Error in pickImage:', error);
      ProfileAlertService.showError('Failed to select image.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handles image load error
   */
  const handleImageError = useCallback((): void => {
    console.error('❌ Error loading profile image');
    setHasError(true);
    setIsLoading(false);
  }, []);

  /**
   * Handles image load start
   */
  const handleImageLoadStart = useCallback((): void => {
    setIsLoading(true);
  }, []);

  /**
   * Handles image load end
   */
  const handleImageLoadEnd = useCallback((): void => {
    setIsLoading(false);
  }, []);

  /**
   * Gets image source for Image component
   */
  const getImageSource = useCallback(() => {
    return ProfileImageService.getImageSource(hasError ? null : imageUri);
  }, [imageUri, hasError]);

  /**
   * Gets user initials for fallback
   */
  const getUserInitials = useCallback((): string => {
    return ProfileImageService.getUserInitials(initialUser);
  }, [initialUser]);

  /**
   * Resets image to user's original
   */
  const resetImage = useCallback((): void => {
    setImageUri(initialUser?.profileImage ?? null);
    setHasError(false);
  }, [initialUser]);

  // ============================================================================
  // Return
  // ============================================================================

  return {
    imageUri,
    isLoading,
    hasError,
    pickImage,
    handleImageError,
    handleImageLoadStart,
    handleImageLoadEnd,
    getImageSource,
    getUserInitials,
    resetImage,
  };
};