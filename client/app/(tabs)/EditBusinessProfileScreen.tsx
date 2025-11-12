// app/(tabs)/EditBusinessProfileScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/ui/bottomNavigation';
import { createBusinessNavItems } from '@/utils/navigationHelpers';
import { useAuth } from '@/context/AuthContext';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { useBusinessProfileImage } from '@/hooks/useBusinessProfileImage';
import { styles } from '@/styles/editBusinessProfileScreen.styles';
import { CustomAlertHelper } from '@/components/ui/customAlert';
import { 
  BUSINESS_PROFILE_TEXT, 
  BUSINESS_PROFILE_ICONS 
} from '@/constants/businessProfile.constants';

/**
 * EditBusinessProfileScreen
 * 
 * Screen for editing business/restaurant profile information
 * Allows updating business details, hours, and profile image
 * 
 * @responsibilities
 * - Display business profile form
 * - Handle form submission
 * - Manage image upload
 */
export default function EditBusinessProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { user } = useAuth();
  const navItems = createBusinessNavItems('profile', router);

  const {
    formData,
    isLoading,
    isSaving,
    updateField,
    saveProfile,
  } = useBusinessProfile();

  const {
    isUploading: isUploadingImage,
    showImagePickerDialog,
    showRemoveImageDialog,
  } = useBusinessProfileImage();

  /**
   * Handles form save action
   */
  const handleSave = async (): Promise<void> => {
    const success = await saveProfile();
    
    if (success) {
      CustomAlertHelper.success(
        BUSINESS_PROFILE_TEXT.ALERTS.SUCCESS_TITLE,
        BUSINESS_PROFILE_TEXT.ALERTS.SUCCESS_MESSAGE,
        () => router.back()
      );
    }
  };

  /**
   * Handles image selection
   */
  const handleImageSelect = (uri: string): void => {
    updateField('imageUrl', uri);
  };

  /**
   * Handles image removal
   */
  const handleRemoveImage = (): void => {
    updateField('imageUrl', '');
  };

  /**
   * Renders loading state
   */
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={BUSINESS_PROFILE_ICONS.COLORS.SUCCESS} 
          />
          <Text style={styles.loadingText}>
            {BUSINESS_PROFILE_TEXT.LOADING.TEXT}
          </Text>
        </View>
      </View>
    );
  }

  /**
   * Renders profile image section
   */
  const renderProfileImageSection = () => (
    <View style={styles.profilePictureSection}>
      <Text style={styles.label}>
        {BUSINESS_PROFILE_TEXT.FORM.TITLE}
      </Text>
      
      <View style={styles.profilePictureContainer}>
        {formData.imageUrl ? (
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: formData.imageUrl }}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.removeProfileImageButton}
              onPress={() => showRemoveImageDialog(handleRemoveImage)}
            >
              <Ionicons 
                name={BUSINESS_PROFILE_ICONS.CLOSE} 
                size={BUSINESS_PROFILE_ICONS.SIZE.MEDIUM} 
                color={BUSINESS_PROFILE_ICONS.COLORS.DANGER} 
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Ionicons 
              name={BUSINESS_PROFILE_ICONS.BUSINESS} 
              size={BUSINESS_PROFILE_ICONS.SIZE.EXTRA_LARGE} 
              color={BUSINESS_PROFILE_ICONS.COLORS.SECONDARY} 
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.changeProfileImageButton}
          onPress={() => showImagePickerDialog(handleImageSelect)}
          disabled={isUploadingImage}
        >
          {isUploadingImage ? (
            <ActivityIndicator 
              color={BUSINESS_PROFILE_ICONS.COLORS.WHITE} 
              size="small" 
            />
          ) : (
            <Ionicons 
              name={BUSINESS_PROFILE_ICONS.FOLDER} 
              size={BUSINESS_PROFILE_ICONS.SIZE.LARGE} 
              color={BUSINESS_PROFILE_ICONS.COLORS.PRIMARY} 
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  /**
   * Renders text input field
   */
  const renderInputField = (
    field: keyof typeof formData,
    label: string,
    placeholder: string,
    options?: {
      multiline?: boolean;
      numberOfLines?: number;
      keyboardType?: 'default' | 'phone-pad' | 'email-address';
    }
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          options?.multiline && styles.textArea,
        ]}
        value={formData[field] as string}
        onChangeText={(value) => updateField(field, value)}
        placeholder={placeholder}
        placeholderTextColor={BUSINESS_PROFILE_ICONS.COLORS.SECONDARY}
        multiline={options?.multiline}
        numberOfLines={options?.numberOfLines}
        keyboardType={options?.keyboardType}
        autoCapitalize={options?.keyboardType === 'email-address' ? 'none' : 'sentences'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons 
              name={BUSINESS_PROFILE_ICONS.BACK} 
              size={BUSINESS_PROFILE_ICONS.SIZE.SMALL} 
              color={BUSINESS_PROFILE_ICONS.COLORS.PRIMARY} 
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {BUSINESS_PROFILE_TEXT.HEADER.TITLE}{' '}
              <Text style={styles.yummi}>
                {BUSINESS_PROFILE_TEXT.HEADER.HIGHLIGHT}
              </Text>
            </Text>
            <Text style={styles.headerSubtitle}>
              {BUSINESS_PROFILE_TEXT.HEADER.SUBTITLE}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Form */}
        <View style={styles.form}>
          {renderProfileImageSection()}

          {renderInputField(
            'name',
            BUSINESS_PROFILE_TEXT.FORM.LABELS.BUSINESS_NAME,
            BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.BUSINESS_NAME
          )}

          {renderInputField(
            'phone',
            BUSINESS_PROFILE_TEXT.FORM.LABELS.PHONE,
            BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.PHONE,
            { keyboardType: 'phone-pad' }
          )}

          {renderInputField(
            'email',
            BUSINESS_PROFILE_TEXT.FORM.LABELS.EMAIL,
            BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.EMAIL,
            { keyboardType: 'email-address' }
          )}

          {renderInputField(
            'address',
            BUSINESS_PROFILE_TEXT.FORM.LABELS.ADDRESS,
            BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.ADDRESS,
            { multiline: true, numberOfLines: 2 }
          )}

          {renderInputField(
            'description',
            BUSINESS_PROFILE_TEXT.FORM.LABELS.DESCRIPTION,
            BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.DESCRIPTION,
            { multiline: true, numberOfLines: 3 }
          )}

          {renderInputField(
            'category',
            BUSINESS_PROFILE_TEXT.FORM.LABELS.CATEGORY,
            BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.CATEGORY
          )}

          {/* Opening Hours */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                {BUSINESS_PROFILE_TEXT.FORM.LABELS.OPENING_TIME}
              </Text>
              <TextInput
                style={styles.input}
                value={formData.openingTime}
                onChangeText={(value) => updateField('openingTime', value)}
                placeholder={BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.OPENING_TIME}
                placeholderTextColor={BUSINESS_PROFILE_ICONS.COLORS.SECONDARY}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                {BUSINESS_PROFILE_TEXT.FORM.LABELS.CLOSING_TIME}
              </Text>
              <TextInput
                style={styles.input}
                value={formData.closingTime}
                onChangeText={(value) => updateField('closingTime', value)}
                placeholder={BUSINESS_PROFILE_TEXT.FORM.PLACEHOLDERS.CLOSING_TIME}
                placeholderTextColor={BUSINESS_PROFILE_ICONS.COLORS.SECONDARY}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator 
                color={BUSINESS_PROFILE_ICONS.COLORS.WHITE} 
                size="small" 
              />
            ) : (
              <>
                <Ionicons 
                  name={BUSINESS_PROFILE_ICONS.CHECKMARK} 
                  size={BUSINESS_PROFILE_ICONS.SIZE.SMALL} 
                  color={BUSINESS_PROFILE_ICONS.COLORS.WHITE} 
                />
                <Text style={styles.saveButtonText}>
                  {BUSINESS_PROFILE_TEXT.BUTTONS.SAVE}
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSaving}
          >
            <Text style={styles.cancelButtonText}>
              {BUSINESS_PROFILE_TEXT.BUTTONS.CANCEL}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation items={navItems} />
    </View>
  );
}