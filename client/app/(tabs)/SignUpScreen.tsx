/**
 * Sign Up Screen
 * 
 * User registration screen supporting customer and business accounts
 * Handles account creation with role selection
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegistrationForm } from '@/hooks/userRegistrationForm';
import { UserRole } from '@/types/auth.types';
import { FormField } from '@/components/ui/FormField';
import { ROLE_LABELS } from '@/constants/auth.constants';
import {
  COLORS,
  BASE_STYLES,
  SIGNUP_STYLES,
} from '@/styles/authStyles';

/**
 * SignUpScreen Component
 * 
 * Renders registration form with role selection
 * Supports both customer and business account types
 * Uses custom hook for form state management
 */
const SignUpScreen: React.FC = () => {
  // Custom hook handles all form logic
  const {
    formData,
    errors,
    isSubmitting,
    handleFieldChange,
    handleRoleChange,
    handleSubmit,
  } = useRegistrationForm();

  /**
   * Checks if a role is currently selected
   */
  const isRoleSelected = (role: UserRole): boolean => {
    return formData.role === role;
  };

  return (
    <SafeAreaView style={SIGNUP_STYLES.safeArea}>
      <ScrollView
        contentContainerStyle={BASE_STYLES.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={SIGNUP_STYLES.container}>
          {/* Header */}
          <View style={BASE_STYLES.header}>
            <Image
              source={require('@/assets/img/logo.png')}
              style={BASE_STYLES.logoSmall}
              resizeMode="contain"
              accessibilityLabel="Yummi App Logo"
            />
            <Text style={BASE_STYLES.subtitle}>Registro</Text>
          </View>

          {/* Registration Form */}
          <View style={SIGNUP_STYLES.formContainer}>
            {/* Role Selection */}
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Tipo de cuenta:</Text>
              <View style={styles.roleButtons}>
                {/* Customer Role Button */}
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    isRoleSelected(UserRole.CUSTOMER) && styles.roleButtonActive,
                  ]}
                  onPress={() => handleRoleChange(UserRole.CUSTOMER)}
                  disabled={isSubmitting}
                  accessibilityLabel="Select customer account"
                  accessibilityRole="button"
                  accessibilityState={{ selected: isRoleSelected(UserRole.CUSTOMER) }}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      isRoleSelected(UserRole.CUSTOMER) && styles.roleButtonTextActive,
                    ]}
                  >
                    {ROLE_LABELS.customer}
                  </Text>
                </TouchableOpacity>

                {/* Business Role Button */}
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    isRoleSelected(UserRole.BUSINESS) && styles.roleButtonActive,
                  ]}
                  onPress={() => handleRoleChange(UserRole.BUSINESS)}
                  disabled={isSubmitting}
                  accessibilityLabel="Select business account"
                  accessibilityRole="button"
                  accessibilityState={{ selected: isRoleSelected(UserRole.BUSINESS) }}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      isRoleSelected(UserRole.BUSINESS) && styles.roleButtonTextActive,
                    ]}
                  >
                    {ROLE_LABELS.business}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Name Input */}
            <FormField
              label={formData.role === UserRole.BUSINESS ? 'Nombre del Negocio' : 'Nombre'}
              value={formData.name}
              error={errors.name}
              placeholder={
                formData.role === UserRole.BUSINESS
                  ? 'Ej: Restaurante El Buen Sabor'
                  : 'Ingresa tu nombre completo'
              }
              onChangeText={(value) => handleFieldChange('name', value)}
              disabled={isSubmitting}
              accessibilityLabel="Name input field"
            />

            {/* Phone Input */}
            <FormField
              label="Teléfono"
              value={formData.phone}
              error={errors.phone}
              placeholder="Ingresa tu número de teléfono"
              onChangeText={(value) => handleFieldChange('phone', value)}
              disabled={isSubmitting}
              keyboardType="phone-pad"
              accessibilityLabel="Phone number input field"
            />

            {/* Email Input */}
            <FormField
              label="Correo Electrónico"
              value={formData.email}
              error={errors.email}
              placeholder="you@example.com"
              onChangeText={(value) => handleFieldChange('email', value)}
              disabled={isSubmitting}
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              accessibilityLabel="Email input field"
            />

            {/* Address Input - Only for Business */}
            {formData.role === UserRole.BUSINESS && (
              <FormField
                label="Dirección del Negocio"
                value={formData.address || ''}
                error={errors.address}
                placeholder="Calle 123 #45-67, Medellín, Antioquia"
                onChangeText={(value) => handleFieldChange('address', value)}
                disabled={isSubmitting}
                multiline
                numberOfLines={2}
                accessibilityLabel="Business address input field"
              />
            )}

            {/* Password Input */}
            <FormField
              label="Contraseña"
              value={formData.password}
              error={errors.password}
              placeholder="Ingresa tu contraseña"
              onChangeText={(value) => handleFieldChange('password', value)}
              disabled={isSubmitting}
              secureTextEntry
              autoComplete="password"
              accessibilityLabel="Password input field"
            />

            <View style={BASE_STYLES.underline} />

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                BASE_STYLES.button,
                isSubmitting && BASE_STYLES.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              accessibilityLabel="Register button"
              accessibilityHint="Tap to create your account"
              accessibilityRole="button"
            >
              {isSubmitting ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={BASE_STYLES.buttonText}>Registrarse</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Component-specific styles
 */
const styles = StyleSheet.create({
  roleContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  roleButtonActive: {
    borderColor: '#27AE60',
    backgroundColor: '#E8F5E9',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  roleButtonTextActive: {
    color: '#27AE60',
  },
});

export default SignUpScreen;