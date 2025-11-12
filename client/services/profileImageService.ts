// services/profileImageService.ts

import * as ImagePicker from 'expo-image-picker';
import { PROFILE_CONSTANTS, ProfileImageError } from '@/constants/profile.constants';
import type { User } from '@/types/auth.types';

/**
 * Image picker result with error handling
 */
export interface ImagePickerResult {
  success: boolean;
  imageUri?: string;
  error?: ProfileImageError;
  errorMessage?: string;
}

/**
 * Profile image source type
 */
export type ProfileImageSource = 
  | { uri: string } 
  | number; // For require() assets

/**
 * ProfileImageService
 * 
 * Handles all profile image operations
 * Single Responsibility: Image management
 */
export class ProfileImageService {
  private static readonly DEFAULT_IMAGE = require('@/assets/img/profile.png');

  /**
   * Requests media library permissions
   */
  private static async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('❌ Error requesting permissions:', error);
      return false;
    }
  }

  /**
   * Opens image picker and returns selected image URI
   */
  static async pickImage(): Promise<ImagePickerResult> {
    try {
      // Request permissions
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return {
          success: false,
          error: ProfileImageError.PERMISSION_DENIED,
          errorMessage: 'Gallery access permission denied.',
        };
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: PROFILE_CONSTANTS.IMAGE.ASPECT_RATIO,
        quality: PROFILE_CONSTANTS.IMAGE.QUALITY,
      });

      // Check if user cancelled
      if (result.canceled) {
        return {
          success: false,
          error: ProfileImageError.PICKER_CANCELLED,
          errorMessage: 'Image selection cancelled.',
        };
      }

      const imageUri = result.assets[0].uri;

      // Validate image (could add size/format checks here)
      console.log('✅ Image selected:', imageUri);

      return {
        success: true,
        imageUri,
      };
    } catch (error) {
      console.error('❌ Error picking image:', error);
      return {
        success: false,
        error: ProfileImageError.UNKNOWN,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred.',
      };
    }
  }

  /**
   * Gets profile image source for Image component
   */
  static getImageSource(imageUri: string | null | undefined): ProfileImageSource {
    if (imageUri && imageUri.trim() !== '') {
      return { uri: imageUri };
    }
    return this.DEFAULT_IMAGE;
  }

  /**
   * Generates user initials for avatar fallback
   */
  static getUserInitials(user: User | null): string {
    if (!user?.name) {
      return 'U';
    }

    const names = user.name.trim().split(' ');
    
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    
    return user.name
      .substring(0, PROFILE_CONSTANTS.DEFAULTS.INITIALS_MAX_LENGTH)
      .toUpperCase();
  }

  /**
   * Validates if image URI is valid
   */
  static isValidImageUri(uri: string | null | undefined): boolean {
    if (!uri || uri.trim().length === 0) {
      return false;
    }

    const trimmedUri = uri.trim();
    return trimmedUri.startsWith('file://') || trimmedUri.startsWith('http');
  }
}