// components/ui/FormField.tsx
/**
 * FormField Component
 * 
 * Reusable text input field with label and error message
 * Uses theme colors for consistent styling across auth screens
 * IMPROVED: Password visibility toggle, better keyboard navigation
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '@/styles/authTheme';
import { AUTH_ICONS } from '@/constants/auth.constants';

/**
 * FormField Props
 */
export interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  /** Field label displayed above input */
  label: string;
  /** Current input value */
  value: string;
  /** Error message to display below input */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Callback when text changes */
  onChangeText: (text: string) => void;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Accessibility hint - OPTIONAL */
  accessibilityHint?: string;
  /** Return key type for better navigation - NEW */
  returnKeyType?: 'done' | 'next' | 'search' | 'send' | 'go' | 'default';
  /** Callback when return key is pressed - NEW */
  onSubmitEditing?: () => void;
}

/**
 * FormField Component
 * 
 * Renders a labeled text input with optional error message
 * Automatically adapts styling for auth screens (light text on dark background)
 * NEW: Shows password visibility toggle for secure inputs
 * 
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   value={email}
 *   error={errors.email}
 *   placeholder="you@example.com"
 *   onChangeText={setEmail}
 *   keyboardType="email-address"
 *   returnKeyType="next"
 * />
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  error,
  placeholder,
  onChangeText,
  disabled = false,
  accessibilityHint,
  returnKeyType = 'default',
  onSubmitEditing,
  secureTextEntry,
  ...textInputProps
}) => {
  // NEW: Password visibility state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Determine if this is a password field
  const isPasswordField = secureTextEntry === true;
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input Container with Eye Icon */}
      <View style={styles.inputContainer}>
        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            isPasswordField && styles.inputWithIcon, // NEW: Add padding for icon
          ]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholderTextColor={COLORS.placeholder}
          accessibilityHint={accessibilityHint}
          accessibilityRole="text"
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={returnKeyType === 'done'}
          secureTextEntry={isPasswordField && !isPasswordVisible} // NEW: Toggle
          {...textInputProps}
        />

        {/* Password Visibility Toggle - NEW */}
        {isPasswordField && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
            disabled={disabled}
            accessibilityLabel={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            accessibilityRole="button"
          >
            <Ionicons
              name={isPasswordVisible ? AUTH_ICONS.EYE_OPEN : AUTH_ICONS.EYE_CLOSED}
              size={AUTH_ICONS.SIZE.LARGE}
              color={disabled ? COLORS.placeholder : AUTH_ICONS.COLOR.GRAY}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
};

/**
 * Component Styles
 * Uses theme tokens for consistency
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  
  label: {
    color: COLORS.textLight, 
    fontSize: TYPOGRAPHY.label.fontSize,
    fontWeight: TYPOGRAPHY.label.fontWeight,
    marginLeft: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  
  // NEW: Input container for positioning eye icon
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  
  input: {
    height: 42,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body.fontSize,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    width: '100%',
  },
  
  // NEW: Add padding for eye icon
  inputWithIcon: {
    paddingRight: 45,
  },
  
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  
  // NEW: Eye icon positioning
  eyeIcon: {
    position: 'absolute',
    right: SPACING.sm,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.small.fontSize,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
    fontWeight: '500',
  },
});