import React from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { BASE_STYLES, COLORS } from '../../styles/authStyles';

interface FormFieldProps {
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  secureTextEntry?: boolean;
  accessibilityLabel: string;
  accessibilityHint: string;
}

export const FormField: React.FC<FormFieldProps> = React.memo(({
  label,
  value,
  error,
  placeholder,
  onChangeText,
  disabled = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete,
  textContentType,
  secureTextEntry = false,
  accessibilityLabel,
  accessibilityHint,
}) => (
  <View style={BASE_STYLES.inputContainer}>
    <Text style={BASE_STYLES.label}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeholder}
      style={[
        BASE_STYLES.input,
        error && BASE_STYLES.inputError,
      ]}
      value={value}
      onChangeText={onChangeText}
      editable={!disabled}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      textContentType={textContentType}
      secureTextEntry={secureTextEntry}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    />
    {error && <Text style={BASE_STYLES.errorText}>{error}</Text>}
  </View>
));

FormField.displayName = 'FormField';