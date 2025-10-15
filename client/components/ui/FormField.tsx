// components/ui/FormField.tsx

import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

/**
 * Props for FormField component
 */
export interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  /** Field label */
  label: string;
  /** Current value */
  value: string;
  /** Error message to display */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Change handler */
  onChangeText: (value: string) => void;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Accessibility hint - OPCIONAL */
  accessibilityHint?: string;
}

/**
 * FormField Component
 * 
 * Reusable form input field with label and error message
 * 
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   value={email}
 *   error={errors.email}
 *   placeholder="you@example.com"
 *   onChangeText={setEmail}
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
  ...otherProps
}) => {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input */}
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
        accessibilityHint={accessibilityHint}
        {...otherProps}
      />

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  inputError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFEBEE',
  },
  inputDisabled: {
    backgroundColor: '#ECEFF1',
    color: '#95A5A6',
  },
  errorText: {
    fontSize: 12,
    color: '#E74C3C',
    marginTop: 4,
  },
});