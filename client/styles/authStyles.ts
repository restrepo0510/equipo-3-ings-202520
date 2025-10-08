import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Design System Constants
export const COLORS = {
  primary: '#556B2F',
  primaryDark: '#004226',
  primaryLight: '#768959',
  background: '#f2f2f2',
  white: '#ffffff',
  black: '#000000',
  text: '#222222',
  placeholder: '#999999',
  placeholderLight: '#bbbbbb',
  error: '#ff6b6b',
  warning: '#FDFFD1',
  warningText: '#6b6b3f',
  border: '#3E400E',
  separator: '#0C1706',
  transparent: 'transparent',
};

export const TYPOGRAPHY = {
  title: {
    fontSize: 35,
    fontWeight: '700' as const,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
  },
  label: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 14,
  },
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
  },
  small: {
    fontSize: 12,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Base styles shared across all auth components
export const BASE_STYLES = StyleSheet.create({
  // Layout
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },

  // Cards & Forms
  cardContainer: {
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
    minWidth: 320,
    alignItems: 'center',
  },
  formCard: {
    width: '100%',
    height: '80%',
    backgroundColor: COLORS.primary,
    borderRadius: 40,
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
    borderRadius: 40,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },

  // Typography
  title: {
    color: COLORS.white,
    ...TYPOGRAPHY.title,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.black,
    ...TYPOGRAPHY.title,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryDark,
    paddingBottom: 15,
  },

  // Form Elements
  inputContainer: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.white,
    ...TYPOGRAPHY.label,
    marginLeft: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 42,
    backgroundColor: COLORS.white,
    borderRadius: 25,
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

  // Visual Elements
  underline: {
    height: 2,
    backgroundColor: COLORS.separator,
    width: 200,
    alignSelf: 'center',
    marginVertical: SPACING.lg,
    borderRadius: 2,
  },
  

  // Buttons
  button: {
    alignSelf: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: 24,
    backgroundColor: COLORS.primaryDark,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
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
    borderRadius: 20,
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

  // Images & Icons
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

// Screen-specific style variations
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
    height: SCREEN_HEIGHT * 0.5,
    opacity: 0.8,
  },
});

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
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
    minWidth: 320,
  },
});

// Decorative element positions
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
};

// Type definitions
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface LoginResponse {
  message: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface RegistrationResponse {
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
}