// hooks/useBusinessProfileImage.ts

import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { CustomAlertHelper } from '@/components/ui/CustomAlert';
import { BUSINESS_PROFILE_TEXT, BUSINESS_PROFILE_CONSTANTS } from '@/constants/businessProfile.constants';

/**
 * Image Picker Result
 */
interface ImagePickerResult {
  success: boolean;
  uri?: string;
  error?: string;
}

/**
 * Custom Hook: useBusinessProfileImage
 * 
 * Handles image selection and permissions for business profile
 * Follows SRP by managing only image-related operations
 */
export const useBusinessProfileImage = () => {
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Requests camera permission
   */
  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      CustomAlertHelper.warning(
        'Permiso Requerido',
        BUSINESS_PROFILE_TEXT.ALERTS.PERMISSION_CAMERA
      );
      return false;
    }
    
    return true;
  }, []);

  /**
   * Requests media library permission
   */
  const requestGalleryPermission = useCallback(async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      CustomAlertHelper.warning(
        'Permiso Requerido',
        BUSINESS_PROFILE_TEXT.ALERTS.PERMISSION_GALLERY
      );
      return false;
    }
    
    return true;
  }, []);

  /**
   * Picks image from gallery
   */
  const pickFromGallery = useCallback(async (): Promise<ImagePickerResult> => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      return { success: false, error: 'Permission denied' };
    }

    try {
      setIsUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: BUSINESS_PROFILE_CONSTANTS.IMAGE.ASPECT_RATIO,
        quality: BUSINESS_PROFILE_CONSTANTS.IMAGE.QUALITY,
      });

      if (!result.canceled && result.assets[0]) {
        return { success: true, uri: result.assets[0].uri };
      }

      return { success: false, error: 'Selection cancelled' };
    } catch (error) {
      console.error('Error picking image:', error);
      CustomAlertHelper.error(
        'Error',
        BUSINESS_PROFILE_TEXT.ALERTS.ERROR_SELECT_IMAGE
      );
      return { success: false, error: 'Failed to pick image' };
    } finally {
      setIsUploading(false);
    }
  }, [requestGalleryPermission]);

  /**
   * Takes photo with camera
   */
  const takePhoto = useCallback(async (): Promise<ImagePickerResult> => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return { success: false, error: 'Permission denied' };
    }

    try {
      setIsUploading(true);

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: BUSINESS_PROFILE_CONSTANTS.IMAGE.ASPECT_RATIO,
        quality: BUSINESS_PROFILE_CONSTANTS.IMAGE.QUALITY,
      });

      if (!result.canceled && result.assets[0]) {
        return { success: true, uri: result.assets[0].uri };
      }

      return { success: false, error: 'Photo cancelled' };
    } catch (error) {
      console.error('Error taking photo:', error);
      CustomAlertHelper.error(
        'Error',
        BUSINESS_PROFILE_TEXT.ALERTS.ERROR_TAKE_PHOTO
      );
      return { success: false, error: 'Failed to take photo' };
    } finally {
      setIsUploading(false);
    }
  }, [requestCameraPermission]);

  /**
   * Shows image picker options dialog
   */
  const showImagePickerDialog = useCallback((
    onImageSelected: (uri: string) => void
  ): void => {
    CustomAlertHelper.alert(
      BUSINESS_PROFILE_TEXT.ALERTS.IMAGE_PICKER_TITLE,
      BUSINESS_PROFILE_TEXT.ALERTS.IMAGE_PICKER_MESSAGE,
      [
        {
          text: BUSINESS_PROFILE_TEXT.ALERTS.IMAGE_PICKER_TAKE_PHOTO,
          onPress: async () => {
            const result = await takePhoto();
            if (result.success && result.uri) {
              onImageSelected(result.uri);
            }
          },
        },
        {
          text: BUSINESS_PROFILE_TEXT.ALERTS.IMAGE_PICKER_CHOOSE_GALLERY,
          onPress: async () => {
            const result = await pickFromGallery();
            if (result.success && result.uri) {
              onImageSelected(result.uri);
            }
          },
        },
        {
          text: BUSINESS_PROFILE_TEXT.ALERTS.IMAGE_PICKER_CANCEL,
          style: 'cancel',
        },
      ],
      'info'
    );
  }, [takePhoto, pickFromGallery]);

  /**
   * Shows remove image confirmation
   */
  const showRemoveImageDialog = useCallback((onConfirm: () => void): void => {
    CustomAlertHelper.confirm(
      BUSINESS_PROFILE_TEXT.ALERTS.REMOVE_IMAGE_TITLE,
      BUSINESS_PROFILE_TEXT.ALERTS.REMOVE_IMAGE_MESSAGE,
      onConfirm
    );
  }, []);

  return {
    isUploading,
    pickFromGallery,
    takePhoto,
    showImagePickerDialog,
    showRemoveImageDialog,
  };
};