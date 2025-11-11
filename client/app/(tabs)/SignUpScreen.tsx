// app/(tabs)/SignUpScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRegistrationForm } from '@/hooks/userRegistrationForm';
import { UserRole } from '@/types/auth.types';
import { FormField } from '@/components/ui/FormField';
import { ROLE_LABELS } from '@/constants/auth.constants';
import { AUTH_ICONS, AUTH_UI_TEXT } from '@/constants/auth.constants';
import {
  COLORS,
  BASE_STYLES,
  SIGNUP_STYLES,
} from '@/styles/authStyles';

/**
 * SignUpScreen Component
 * 
 * Renders registration form with role selection
 * IMPROVED: Scrollable, password visibility toggle, back button
 */
const SignUpScreen: React.FC = () => {
  const router = useRouter();
  
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

  /**
   * Navigates back to login screen
   */
  const handleGoBack = (): void => {
    if (isSubmitting) return;
    router.back();
  };

  return (
    <SafeAreaView style={SIGNUP_STYLES.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={BASE_STYLES.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={BASE_STYLES.scrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={SIGNUP_STYLES.container}>
            {/* Header with Back Button */}
            <View style={styles.headerContainer}>
              {/* Back Button */}
              <TouchableOpacity 
                onPress={handleGoBack} 
                disabled={isSubmitting}
                style={styles.backButton}
                accessibilityLabel="Volver"
                accessibilityRole="button"
              >
                <Ionicons 
                  name={AUTH_ICONS.BACK_ARROW} 
                  size={AUTH_ICONS.SIZE.EXTRA_LARGE} 
                  color={AUTH_ICONS.COLOR.PRIMARY} 
                />
              </TouchableOpacity>

              {/* Logo and Title */}
              <View style={BASE_STYLES.header}>
                <Image
                  source={require('@/assets/img/logo.png')}
                  style={BASE_STYLES.logoSmall}
                  resizeMode="contain"
                  accessibilityLabel="Yummi App Logo"
                />
                <Text style={BASE_STYLES.subtitle}>{AUTH_UI_TEXT.SIGNUP.TITLE}</Text>
              </View>
            </View>

            {/* Registration Form */}
            <View style={SIGNUP_STYLES.formContainer}>
              {/* Role Selection */}
              <View style={styles.roleContainer}>
                <Text style={styles.roleLabel}>{AUTH_UI_TEXT.SIGNUP.ROLE_LABEL}</Text>
                <View style={styles.roleButtons}>
                  {/* Customer Role Button */}
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      isRoleSelected(UserRole.CUSTOMER) && styles.roleButtonActive,
                    ]}
                    onPress={() => handleRoleChange(UserRole.CUSTOMER)}
                    disabled={isSubmitting}
                    accessibilityLabel="Seleccionar cuenta de usuario"
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
                    accessibilityLabel="Seleccionar cuenta de empresa"
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
                returnKeyType="next"
                accessibilityLabel="Campo de nombre"
              />

              {/* Phone Input */}
              <FormField
                label="Teléfono"
                value={formData.phone}
                error={errors.phone}
                placeholder="1234567890"
                onChangeText={(value) => handleFieldChange('phone', value)}
                disabled={isSubmitting}
                keyboardType="numeric"
                maxLength={10}
                returnKeyType="next"
                accessibilityLabel="Campo de teléfono"
                accessibilityHint="Ingresa 10 dígitos"
              />
              {formData.phone && (
                <Text style={styles.phoneHelper}>
                  {formData.phone.length}/10 dígitos
                </Text>
              )}

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
                returnKeyType="next"
                accessibilityLabel="Campo de correo electrónico"
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
                  returnKeyType="next"
                  accessibilityLabel="Campo de dirección"
                />
              )}

              {/* Password Input - WITH VISIBILITY TOGGLE */}
              <FormField
                label="Contraseña"
                value={formData.password}
                error={errors.password}
                placeholder="Ingresa tu contraseña"
                onChangeText={(value) => handleFieldChange('password', value)}
                disabled={isSubmitting}
                secureTextEntry
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                accessibilityLabel="Campo de contraseña"
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
                accessibilityLabel="Botón de registro"
                accessibilityHint="Toca para crear tu cuenta"
                accessibilityRole="button"
              >
                {isSubmitting ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={BASE_STYLES.buttonText}>{AUTH_UI_TEXT.SIGNUP.BUTTON}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/**
 * Component-specific styles
 */
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    padding: 8,
  },
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
  phoneHelper: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default SignUpScreen;