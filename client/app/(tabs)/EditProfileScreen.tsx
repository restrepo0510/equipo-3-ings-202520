// app/(tabs)/EditProfileScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/ui/bottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';
import { useAuth } from '@/context/AuthContext';
import { editProfileStyles as styles } from '@/styles/editProfileScreen.styles';
import { useProfileForm } from '@/hooks/useProfileForm';
import { useProfileImage } from '@/hooks/useProfileImage';
import { ProfileAlertService } from '@/services/profileAlertService';
import { 
  PROFILE_TEXT, 
  PROFILE_CONSTANTS, 
  PROFILE_ICONS,
  KEYBOARD_TYPES,
  type ProfileFormField 
} from '@/constants/profile.constants';

/**
 * Form field configuration
 */
interface FormFieldConfig {
  label: string;
  field: ProfileFormField;
  keyboardType: 'default' | 'phone-pad' | 'email-address';
  secure?: boolean;
}

/**
 * EditProfileScreen
 * 
 * Screen that allows authenticated user to edit their profile information.
 * Supports updating user data both locally and on the server.
 * 
 * @responsibilities
 * - Manage form state and validation
 * - Handle image selection
 * - Submit profile updates
 * - Show user feedback
 */
export default function EditProfileScreen(): React.ReactElement {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const navItems = createNavItems('profile', router);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    errors,
    updateField,
    validate,
    getUpdateData,
  } = useProfileForm(user);

  const {
    imageUri,
    pickImage,
    getImageSource,
  } = useProfileImage(user);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles profile save with validation
   */
  const handleSaveProfile = async (): Promise<void> => {
    if (!user) {
      ProfileAlertService.showNotAuthenticatedError();
      return;
    }

    // Validate form
    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Get update data
      const updateData = getUpdateData();

      // Add image if changed
      if (imageUri) {
        updateData.profileImage = imageUri;
      }

      // Call update service
      await updateProfile(updateData);

      // Show success and navigate back
      ProfileAlertService.showProfileUpdateSuccess();
      console.log('✅ Profile updated:', updateData);
      router.back();
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      ProfileAlertService.showProfileUpdateError(
        error instanceof Error ? error : undefined
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles text input change
   */
  const handleInputChange = (field: ProfileFormField, value: string): void => {
    updateField(field, value);
  };

  /**
   * Navigates back
   */
  const handleGoBack = (): void => {
    router.back();
  };

  // ============================================================================
  // Configuration
  // ============================================================================

  /**
   * Form fields configuration
   */
  const formFields: FormFieldConfig[] = [
    {
      label: PROFILE_TEXT.EDIT_PROFILE.FIELDS.NAME,
      field: 'name',
      keyboardType: KEYBOARD_TYPES.name,
    },
    {
      label: PROFILE_TEXT.EDIT_PROFILE.FIELDS.PHONE,
      field: 'phone',
      keyboardType: KEYBOARD_TYPES.phone,
    },
    {
      label: PROFILE_TEXT.EDIT_PROFILE.FIELDS.EMAIL,
      field: 'email',
      keyboardType: KEYBOARD_TYPES.email,
    },
    {
      label: PROFILE_TEXT.EDIT_PROFILE.FIELDS.PASSWORD,
      field: 'password',
      keyboardType: KEYBOARD_TYPES.password,
      secure: true,
    },
  ];

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /**
   * Renders form field
   */
  const renderFormField = (config: FormFieldConfig): React.ReactElement => {
    const { label, field, keyboardType, secure } = config;
    const hasError = Boolean(errors[field]);

    return (
      <View key={field} style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, hasError && styles.inputError]}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          placeholder=""
          placeholderTextColor="#95A5A6"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          autoCapitalize="none"
          editable={!isSubmitting}
        />
        {hasError && (
          <Text style={styles.errorText}>{errors[field]}</Text>
        )}
      </View>
    );
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} disabled={isSubmitting}>
            <Ionicons 
              name={PROFILE_ICONS.BACK_ARROW} 
              size={PROFILE_ICONS.SIZE.EXTRA_LARGE} 
              color={PROFILE_ICONS.COLOR.PRIMARY} 
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {PROFILE_TEXT.HEADER.TITLE_PREFIX}{' '}
            <Text style={styles.yummi}>{PROFILE_TEXT.HEADER.TITLE_HIGHLIGHT}</Text>
          </Text>
          <View style={{ width: PROFILE_ICONS.SIZE.EXTRA_LARGE }} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Title */}
        <Text style={styles.editTitle}>{PROFILE_TEXT.EDIT_PROFILE.TITLE}</Text>

        {/* Profile Picture */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {/* Profile Image - Touch to change */}
            <TouchableOpacity onPress={pickImage} disabled={isSubmitting}>
              <Image
                source={getImageSource()}
                style={styles.profileImage}
              />
            </TouchableOpacity>

            {/* Decorative stars */}
            <Ionicons 
              name={PROFILE_ICONS.DECORATIVE_ADD} 
              size={PROFILE_ICONS.SIZE.LARGE} 
              color={PROFILE_ICONS.COLOR.DECORATIVE} 
              style={styles.star1} 
            />
            <Ionicons 
              name={PROFILE_ICONS.DECORATIVE_ADD} 
              size={PROFILE_ICONS.SIZE.MEDIUM} 
              color={PROFILE_ICONS.COLOR.DECORATIVE} 
              style={styles.star2} 
            />

            {/* Folder Button */}
            <TouchableOpacity
              style={styles.folderButton}
              onPress={pickImage}
              disabled={isSubmitting}
            >
              <Ionicons 
                name={PROFILE_ICONS.FOLDER} 
                size={PROFILE_ICONS.SIZE.FOLDER} 
                color={PROFILE_ICONS.COLOR.PRIMARY} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {formFields.map(renderFormField)}

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
            onPress={handleSaveProfile}
            disabled={isSubmitting}
          >
            <Text style={styles.saveButtonText}>
              {isSubmitting 
                ? PROFILE_TEXT.EDIT_PROFILE.SAVE_BUTTON_LOADING 
                : PROFILE_TEXT.EDIT_PROFILE.SAVE_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}