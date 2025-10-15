// app/(tabs)/LoginScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import {
  COLORS,
  BASE_STYLES,
  LOGIN_STYLES,
  DECORATIVE_STYLES,
} from '../../styles/authStyles';
import { FormField } from '../../components/ui/FormField';

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Validates login form data
 */
const validateForm = (formData: LoginFormData): Partial<LoginFormData> => {
  const errors: Partial<LoginFormData> = {};

  const trimmedEmail = formData.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return errors;
};

/**
 * LoginScreen Component
 * 
 * Handles user authentication using AuthContext
 * Redirects to home screen on successful login
 */
const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  /**
   * Updates form field and clears its error
   */
  const handleFieldChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Handles login submission
   */
  const handleLogin = useCallback(async () => {
    // Validate form
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    try {
      // Call login from AuthContext
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      // Success! AuthContext automatically updates navigation
      // No need to navigate manually - the layout will handle it
      console.log('✅ Login successful, navigation will update automatically');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'Unable to connect to server'
      );
    }
  }, [formData, login]);

  /**
   * Navigates to registration screen
   */
  const handleNavigateToRegister = useCallback(() => {
    if (authLoading) return;
    router.push('/SignUpScreen');
  }, [authLoading, router]);

  return (
    <SafeAreaView style={LOGIN_STYLES.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={BASE_STYLES.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={LOGIN_STYLES.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* App logo */}
          <Image
            source={require('@/assets/img/logo.png')}
            style={BASE_STYLES.logo}
            resizeMode="contain"
            accessibilityLabel="App Logo"
          />

          <View style={BASE_STYLES.cardContainer}>
            {/* Decorative leaf top */}
            <Image
              source={require('@/assets/img/leaf.png')}
              style={[BASE_STYLES.leaf, DECORATIVE_STYLES.leafTop]}
              accessibilityLabel="Decorative leaf"
            />

            {/* Login card */}
            <View style={LOGIN_STYLES.formCard}>
              <Text style={BASE_STYLES.title}>Iniciar Sesión</Text>
              <View style={BASE_STYLES.underline} />

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
                textContentType="emailAddress"
                accessibilityLabel="Email input"
              />

              {/* Password field */}
              <FormField
                label="Contraseña"
                value={formData.password}
                error={errors.password}
                placeholder="••••••"
                onChangeText={(value) => handleFieldChange('password', value)}
                disabled={authLoading}
                secureTextEntry
                autoComplete="password"
                textContentType="password"
                accessibilityLabel="Password input"
              />

              {/* Login button */}
              <TouchableOpacity
                style={[
                  BASE_STYLES.button,
                  { marginTop: 20 },
                  authLoading && BASE_STYLES.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={authLoading}
                accessibilityLabel="Login button"
              >
                {authLoading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={BASE_STYLES.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              {/* Decorative leaf bottom */}
              <Image
                source={require('@/assets/img/leaf.png')}
                style={[BASE_STYLES.leaf, DECORATIVE_STYLES.leafBottom]}
                accessibilityLabel="Decorative leaf"
              />
            </View>

            {/* Register button */}
            <TouchableOpacity
              style={BASE_STYLES.secondaryButton}
              onPress={handleNavigateToRegister}
              disabled={authLoading}
              accessibilityLabel="Not registered button"
            >
              <Text style={BASE_STYLES.secondaryButtonText}>
                ¿No estás registrado?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;