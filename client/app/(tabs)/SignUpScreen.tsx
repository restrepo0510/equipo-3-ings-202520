// app/(tabs)/SignUpScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth.types';
import { 
  COLORS, 
  BASE_STYLES, 
  SIGNUP_STYLES,
} from '../../styles/authStyles';
import { FormField } from '../../components/ui/FormField';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[0-9\s\-\(\)]{10,}$/;

interface RegistrationFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
}

/**
 * Validates registration form
 */
const validateForm = (formData: RegistrationFormData): Partial<RegistrationFormData> => {
  const errors: Partial<RegistrationFormData> = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

/**
 * SignUpScreen Component
 * 
 * Handles user registration with role selection
 * Supports both customer and business account types
 */
const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: UserRole.CUSTOMER, // Default role
  });
  
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});

  /**
   * Updates form field and clears its error
   */
  const handleFieldChange = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Handles role selection
   */
  const handleRoleChange = useCallback((role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  }, []);

  /**
   * Handles registration submission
   */
  const handleRegister = useCallback(async () => {
    // Validate form
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    try {
      // Call register from AuthContext
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
      });

      // Success! Navigation updates automatically
      console.log('✅ Registration successful, navigation will update automatically');
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        error.message || 'Unable to connect to server'
      );
    }
  }, [formData, register]);

  return (
    <SafeAreaView style={SIGNUP_STYLES.safeArea}>
      <ScrollView 
        contentContainerStyle={BASE_STYLES.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={SIGNUP_STYLES.container}>
          {/* Header */}
          <View style={BASE_STYLES.header}>
            <Image
              source={require('@/assets/img/logo.png')}
              style={BASE_STYLES.logoSmall}
              resizeMode="contain"
              accessibilityLabel="App Logo"
            />
            <Text style={BASE_STYLES.subtitle}>Registro</Text>
          </View>

          {/* Form */}
          <View style={SIGNUP_STYLES.formContainer}>
            {/* Role selection */}
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Tipo de cuenta:</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    formData.role === UserRole.CUSTOMER && styles.roleButtonActive,
                  ]}
                  onPress={() => handleRoleChange(UserRole.CUSTOMER)}
                  disabled={authLoading}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      formData.role === UserRole.CUSTOMER && styles.roleButtonTextActive,
                    ]}
                  >
                    👤 Usuario
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    formData.role === UserRole.BUSINESS && styles.roleButtonActive,
                  ]}
                  onPress={() => handleRoleChange(UserRole.BUSINESS)}
                  disabled={authLoading}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      formData.role === UserRole.BUSINESS && styles.roleButtonTextActive,
                    ]}
                  >
                    🏢 Empresa
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Name field */}
            <FormField
              label="Nombre"
              value={formData.name}
              error={errors.name}
              placeholder="Ingresa tu nombre completo"
              onChangeText={(value) => handleFieldChange('name', value)}
              disabled={authLoading}
            />

            {/* Phone field */}
            <FormField
              label="Teléfono"
              value={formData.phone}
              error={errors.phone}
              placeholder="Ingresa tu número de teléfono"
              onChangeText={(value) => handleFieldChange('phone', value)}
              disabled={authLoading}
              keyboardType="phone-pad"
            />

            {/* Email field */}
            <FormField
              label="Correo Electrónico"
              value={formData.email}
              error={errors.email}
              placeholder="you@example.com"
              onChangeText={(value) => handleFieldChange('email', value)}
              disabled={authLoading}
              keyboardType="email-address"
              autoComplete="email"
            />

            {/* Password field */}
            <FormField
              label="Contraseña"
              value={formData.password}
              error={errors.password}
              placeholder="Ingresa tu contraseña"
              onChangeText={(value) => handleFieldChange('password', value)}
              disabled={authLoading}
              secureTextEntry
              autoComplete="password"
            />

            <View style={BASE_STYLES.underline} />

            {/* Submit button */}
            <TouchableOpacity
              style={[
                BASE_STYLES.button,
                authLoading && BASE_STYLES.buttonDisabled,
              ]}
              onPress={handleRegister}
              disabled={authLoading}
            >
              {authLoading ? (
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

const styles = {
  roleContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#2C3E50',
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row' as const,
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
    alignItems: 'center' as const,
  },
  roleButtonActive: {
    borderColor: '#27AE60',
    backgroundColor: '#E8F5E9',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#7F8C8D',
  },
  roleButtonTextActive: {
    color: '#27AE60',
  },
};

export default SignUpScreen;