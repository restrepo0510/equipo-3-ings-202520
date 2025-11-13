// app/(tabs)/ProfileScreen.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/ui/bottomNavigation';
import { useAuth } from '@/context/AuthContext';
import { createNavItems } from '@/utils/navigationHelpers';
import { profileStyles as styles } from '@/styles/profileScreens.styles';
import { useProfileImage } from '@/hooks/useProfileImage';
import { ProfileAlertService } from '@/services/profileAlertService';
import { PROFILE_TEXT, PROFILE_ICONS } from '@/constants/profile.constants';

/**
 * ProfileScreen
 * 
 * Displays authenticated user's profile information with dynamic profile picture.
 * Allows navigation to Edit Profile screen or logout.
 * 
 * @responsibilities
 * - Display user information
 * - Navigate to edit profile
 * - Handle logout flow
 * - Show profile image with fallback
 */
export default function ProfileScreen(): React.ReactElement {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  const router = useRouter();
  const { user, logout } = useAuth();
  const navItems = createNavItems('profile', router);

  const {
    isLoading: imageLoading,
    hasError: imageError,
    getImageSource,
    getUserInitials,
    handleImageError,
    handleImageLoadStart,
    handleImageLoadEnd,
  } = useProfileImage(user);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles logout with confirmation
   */
  const handleLogout = (): void => {
    ProfileAlertService.showLogoutConfirmation(async () => {
      try {
        await logout();
        // Navigation is handled by AuthContext
      } catch (error) {
        console.error('❌ Logout error:', error);
        ProfileAlertService.showLogoutError();
      }
    });
  };

  /**
   * Navigates to Edit Profile screen
   */
  const handleEditProfile = (): void => {
    router.push('/(tabs)/EditProfileScreen');
  };

  /**
   * Navigates back
   */
  const handleGoBack = (): void => {
    router.back();
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /**
   * Renders profile image or initials fallback
   */
  const renderProfileImage = (): React.ReactElement => {
    if (imageError) {
      // Fallback: Show initials if image fails to load
      return (
        <View style={[styles.profileImage, styles.initialsContainer]}>
          <Text style={styles.initialsText}>{getUserInitials()}</Text>
        </View>
      );
    }

    return (
      <>
        <Image
          source={getImageSource()}
          style={styles.profileImage}
          onLoadStart={handleImageLoadStart}
          onLoadEnd={handleImageLoadEnd}
          onError={handleImageError}
        />
        {imageLoading && user?.profileImage && (
          <View style={styles.imageLoadingOverlay}>
            <ActivityIndicator color={PROFILE_ICONS.COLOR.SUCCESS} size="small" />
          </View>
        )}
      </>
    );
  };

  /**
   * Renders user info section
   */
  const renderUserInfo = (): React.ReactElement => (
    <>
      <Text style={styles.name}>
        {user?.name ?? PROFILE_TEXT.PROFILE.DEFAULT_USER_NAME}
      </Text>
      {user?.email && <Text style={styles.email}>{user.email}</Text>}
      {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
    </>
  );

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
          <TouchableOpacity onPress={handleGoBack}>
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

        {/* Profile Picture */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {renderProfileImage()}

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
            <Ionicons 
              name={PROFILE_ICONS.DECORATIVE_ADD} 
              size={PROFILE_ICONS.SIZE.SMALL} 
              color={PROFILE_ICONS.COLOR.DECORATIVE} 
              style={styles.star3} 
            />

            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons 
                name={PROFILE_ICONS.EDIT_PENCIL} 
                size={PROFILE_ICONS.SIZE.BUTTON} 
                color={PROFILE_ICONS.COLOR.PRIMARY} 
              />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          {renderUserInfo()}
        </View>

        {/* Last Purchase Card */}
        <View style={styles.purchaseCard}>
          <View style={styles.foodImageContainer}>
            <Image
              source={require('@/assets/img/food.png')}
              style={styles.foodImage}
            />
            <Text style={styles.lastPurchaseLabel}>
              {PROFILE_TEXT.PROFILE.LAST_PURCHASE}
            </Text>
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>
              {PROFILE_TEXT.PROFILE.COMMENT_TITLE}
            </Text>
            <Text style={styles.commentText}>
              {PROFILE_TEXT.PROFILE.COMMENT_PLACEHOLDER}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons 
            name={PROFILE_ICONS.LOGOUT} 
            size={PROFILE_ICONS.SIZE.LARGE} 
            color={PROFILE_ICONS.COLOR.SECONDARY} 
          />
          <Text style={styles.logoutButtonText}>
            {PROFILE_TEXT.PROFILE.LOGOUT_BUTTON}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}