// components/ui/FormField.tsx
/**
 * FormField Component
 * 
 * Reusable text input field with label and error message
 * Uses theme colors for consistent styling across auth screens
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '@/styles/authTheme';

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
  /** Accessibility hint - OPCIONAL */
  accessibilityHint?: string;
}

/**
 * FormField Component
 * 
 * Renders a labeled text input with optional error message
 * Automatically adapts styling for auth screens (light text on dark background)
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
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Text Input */}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={!disabled}
        placeholderTextColor={COLORS.placeholder}
        accessibilityHint={accessibilityHint}
        accessibilityRole="text"
        {...textInputProps}
      />

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
  
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.small.fontSize,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
    fontWeight: '500',
  },
});