import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
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
import { API_URL } from '@/config/api';
import {
  COLORS,
  BASE_STYLES,
  LOGIN_STYLES,
  DECORATIVE_STYLES,
  type LoginFormData,
  type ApiError,
  type LoginResponse
} from '../../styles/authStyles';
import { FormField } from '../../components/ui/FormField';

// Keep these constants at the top - makes it easy to change them later
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the login form
 * Pretty simple - just checks email format and password length
 */
const validateForm = (formData: LoginFormData): Partial<LoginFormData> => {
  const errors: Partial<LoginFormData> = {};

  // Trim whitespace from email before validating
  const trimmedEmail = formData.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation - just needs to exist and be long enough
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return errors;
};

const LoginScreen: React.FC = () => {
  // Store the email and password
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  
  // Track if we're currently submitting
  const [isLoading, setIsLoading] = useState(false);
  
  // Store any validation errors
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  /**
   * Updates a field and clears its error
   * Using useCallback to prevent unnecessary re-renders
   */
  const handleFieldChange = useCallback((field: keyof LoginFormData, value: string) => {
    // Update the field
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear the error for this field (if any)
    // No point showing an error while they're typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Handles the login submission
   * Validates, calls the API, and handles success/failure
   */
  const handleLogin = useCallback(async () => {
    // First, validate the form
    const validationErrors = validateForm(formData);

    // If there are errors, show them and stop here
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    // Start loading state
    setIsLoading(true);

    try {
      // Make the API call
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: LoginResponse = await response.json();

      // Check if login was successful
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Success! Show a message
      Alert.alert('Success', data.message || 'Login successful');
      
      // TODO: Navigate to home screen once we have navigation
      // navigation.navigate('Home');

    } catch (error) {
      // Something went wrong - log it and show an error
      const apiError = error as ApiError;
      console.error('Login error:', apiError);
      Alert.alert('Login Failed', apiError.message || 'Unable to connect to server');
    } finally {
      // Always stop loading, whether we succeeded or failed
      setIsLoading(false);
    }
  }, [formData]);

  /**
   * Navigates to the registration screen
   * Prevents navigation if we're currently loading
   */
  const handleNavigateToRegister = useCallback(() => {
    // Don't allow navigation while loading
    if (isLoading) return;
    
    // TODO: Replace with actual navigation
    Alert.alert('Info', 'Navigate to registration screen');
  }, [isLoading]);

  return (
    <SafeAreaView style={LOGIN_STYLES.safeArea}>
      {/* KeyboardAvoidingView pushes content up when keyboard appears */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={BASE_STYLES.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={LOGIN_STYLES.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* App logo at the top */}
          <Image
            source={require('@/assets/img/logo.png')}
            style={BASE_STYLES.logo}
            resizeMode="contain"
            accessibilityLabel="App Logo"
          />

          <View style={BASE_STYLES.cardContainer}>
            {/* Decorative leaf at the top */}
            <Image
              source={require('@/assets/img/leaf.png')}
              style={[BASE_STYLES.leaf, DECORATIVE_STYLES.leafTop]}
              accessibilityLabel="Decorative leaf"
            />

            {/* Main login card */}
            <View style={LOGIN_STYLES.formCard}>
              <Text style={BASE_STYLES.title}>Iniciar Sesión</Text>
              <View style={BASE_STYLES.underline} />

              {/* Email input field */}
              <FormField
                label="Correo Electrónico"
                value={formData.email}
                error={errors.email}
                placeholder="you@example.com"
                onChangeText={(value) => handleFieldChange('email', value)}
                disabled={isLoading}
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                accessibilityLabel="Email input"
                accessibilityHint="Enter your email address"
              />

              {/* Password input field */}
              <FormField
                label="Contraseña"
                value={formData.password}
                error={errors.password}
                placeholder="••••••"
                onChangeText={(value) => handleFieldChange('password', value)}
                disabled={isLoading}
                secureTextEntry
                autoComplete="password"
                textContentType="password"
                accessibilityLabel="Password input"
                accessibilityHint="Enter your password"
              />

              {/* Login button - shows spinner when loading */}
              <TouchableOpacity
                style={[
                  BASE_STYLES.button,
                  {marginTop: 20},
                  isLoading && BASE_STYLES.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading}
                accessibilityLabel="Login button"
                accessibilityHint="Press to submit login form"
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={BASE_STYLES.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              {/* Decorative leaf at the bottom */}
              <Image
                source={require('@/assets/img/leaf.png')}
                style={[BASE_STYLES.leaf, DECORATIVE_STYLES.leafBottom]}
                accessibilityLabel="Decorative leaf"
              />
            </View>

            {/* Secondary button to go to registration */}
            <TouchableOpacity
              style={BASE_STYLES.secondaryButton}
              onPress={handleNavigateToRegister}
              disabled={isLoading}
              accessibilityLabel="Not registered button"
              accessibilityHint="Press to navigate to registration screen"
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