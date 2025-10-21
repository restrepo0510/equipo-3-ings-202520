// styles/authStyles.ts
/**
 * Authentication Styles
 * 
 * StyleSheet definitions for authentication screens
 * Organized by component and screen type
 */

import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, DIMENSIONS } from './authTheme';

/**
 * Base Styles
 * Shared across all authentication components
 */
export const BASE_STYLES = StyleSheet.create({
  // ============================================================================
  // Layout
  // ============================================================================
  
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  
  keyboardAvoidingView: {
    flex: 1,
  },

  // ============================================================================
  // Header
  // ============================================================================
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },

  // ============================================================================
  // Cards & Containers
  // ============================================================================
  
  cardContainer: {
    width: DIMENSIONS.cardWidth,
    maxWidth: DIMENSIONS.maxCardWidth,
    minWidth: DIMENSIONS.minCardWidth,
    alignItems: 'center',
  },
  
  formCard: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xxl,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'stretch',
    position: 'relative',
    overflow: 'visible',
    zIndex: 2,
  },
  
  formContainer: {
    width: '100%',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.xxl,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },

  // ============================================================================
  // Typography
  // ============================================================================
  
  title: {
    color: COLORS.white,
    ...TYPOGRAPHY.title,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  
  subtitle: {
    color: COLORS.white,
    ...TYPOGRAPHY.title,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryDark,
    paddingBottom: 15,
  },

  // ============================================================================
  // Form Elements
  // ============================================================================
  
  inputContainer: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  
  label: {
    color: COLORS.textLight, // ✅ Cambiado a color claro
    ...TYPOGRAPHY.label,
    marginLeft: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  
  input: {
    height: 42,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
    color: COLORS.text,
    ...TYPOGRAPHY.body,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    width: '100%',
  },
  
  inputError: {
    borderColor: COLORS.error,
  },
  
  errorText: {
    color: COLORS.error,
    ...TYPOGRAPHY.small,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },

  // ============================================================================
  // Visual Elements
  // ============================================================================
  
  underline: {
    height: 2,
    backgroundColor: COLORS.separator,
    width: 200,
    alignSelf: 'center',
    marginVertical: SPACING.lg,
    borderRadius: 2,
  },

  // ============================================================================
  // Buttons
  // ============================================================================
  
  button: {
    alignSelf: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primaryDark,
    ...SHADOWS.medium,
    minWidth: 120,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonDisabled: {
    opacity: 0.8,
  },
  
  buttonText: {
    color: COLORS.white,
    ...TYPOGRAPHY.button,
  },
  
  secondaryButton: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.warning,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  secondaryButtonText: {
    color: COLORS.warningText,
    fontWeight: '600',
    fontSize: 13,
    fontStyle: 'italic',
  },

  // ============================================================================
  // Images & Icons
  // ============================================================================
  
  logo: {
    width: 250,
    height: 250,
    marginBottom: SPACING.xs,
  },
  
  logoSmall: {
    width: 180,
    height: 180,
    marginTop: SPACING.md,
  },
  
  leaf: {
    width: 150,
    height: 150,
    position: 'absolute',
    opacity: 0.9,
    zIndex: 1,
  },
});

/**
 * Login Screen Styles
 */
export const LOGIN_STYLES = StyleSheet.create({
  safeArea: {
    ...BASE_STYLES.safeArea,
    backgroundColor: COLORS.white,
  },
  
  scrollViewContent: {
    ...BASE_STYLES.scrollViewContent,
    paddingHorizontal: SPACING.lg,
  },
  
  formCard: {
    ...BASE_STYLES.formCard,
    height: DIMENSIONS.screenHeight * 0.5,
    opacity: 0.8,
  },
});

/**
 * Sign Up Screen Styles
 */
export const SIGNUP_STYLES = StyleSheet.create({
  safeArea: {
    ...BASE_STYLES.safeArea,
    backgroundColor: COLORS.white,
  },
  
  container: {
    ...BASE_STYLES.container,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  formContainer: {
    ...BASE_STYLES.formContainer,
    width: DIMENSIONS.cardWidth,
    maxWidth: DIMENSIONS.maxCardWidth,
    minWidth: DIMENSIONS.minCardWidth,
  },
});

/**
 * Decorative Element Positions
 */
export const DECORATIVE_STYLES = {
  leafTop: {
    top: -60,
    left: -40,
    transform: [{ rotate: '120deg' }],
  },
  leafBottom: {
    bottom: -50,
    right: -50,
    transform: [{ rotate: '80deg' }],
  },
} as const;

// Re-export COLORS for backward compatibility
export { COLORS };