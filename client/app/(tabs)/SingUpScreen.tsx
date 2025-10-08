import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { API_URL } from '@/config/api';
import { 
  COLORS, 
  BASE_STYLES, 
  SIGNUP_STYLES,
  type RegistrationFormData,
  type ApiError,
  type RegistrationResponse 
} from '../../styles/authStyles';
import { FormField } from '../../components/ui/FormField';

// Simple regex patterns for validation - nothing fancy here
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[0-9\s\-\(\)]{10,}$/;

/**
 * Validates the registration form
 * Returns an object with error messages for any invalid fields
 */
const validateForm = (formData: RegistrationFormData): Partial<RegistrationFormData> => {
  const errors: Partial<RegistrationFormData> = {};

  // Check if name exists and is long enough
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Validate phone number format
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Basic email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password just needs to be 6+ characters
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

const SignUpScreen: React.FC = () => {
  // Store form data - pretty straightforward
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  
  // Track loading state for the API call
  const [isLoading, setIsLoading] = useState(false);
  
  // Store validation errors for each field
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});

  /**
   * Updates a single field and clears its error
   * We use useCallback here to avoid recreating this function on every render
   */
  const handleFieldChange = useCallback((field: keyof RegistrationFormData, value: string) => {
    // Update the field value
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear the error for this field if it exists
    // (no need to show an error while the user is actively fixing it)
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Handles the registration submission
   * Validates the form, sends data to the API, and handles the response
   */
  const handleRegister = useCallback(async () => {
    // First, validate everything
    const validationErrors = validateForm(formData);
    
    // If there are any errors, show them and bail out
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Make the API request
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: RegistrationResponse = await response.json();

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Success! Show a happy message
      Alert.alert('Success', data.message || 'Registration successful!');
      
      // TODO: Navigate to login screen once we have navigation set up
      
    } catch (error) {
      // Something went wrong - show an error message
      const apiError = error as ApiError;
      console.error('Registration error:', apiError);
      Alert.alert('Registration Failed', apiError.message || 'Unable to connect to server');
    } finally {
      // Always stop the loading spinner, whether we succeeded or failed
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <SafeAreaView style={SIGNUP_STYLES.safeArea}>
      <ScrollView 
        contentContainerStyle={BASE_STYLES.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={SIGNUP_STYLES.container}>
          {/* Header with logo and title */}
          <View style={BASE_STYLES.header}>
            <Image
              source={require('@/assets/img/logo.png')}
              style={BASE_STYLES.logoSmall}
              resizeMode="contain"
              accessibilityLabel="App Logo"
            />
            <Text style={BASE_STYLES.subtitle}>Registro</Text>
          </View>

          {/* Main form */}
          <View style={SIGNUP_STYLES.formContainer}>
            {/* Name field */}
            <FormField
              label="Nombre"
              value={formData.name}
              error={errors.name}
              placeholder="Ingresa tu nombre completo"
              onChangeText={(value) => handleFieldChange('name', value)}
              disabled={isLoading}
              accessibilityLabel="Name input"
              accessibilityHint="Enter your full name"
            />

            {/* Phone field */}
            <FormField
              label="Teléfono"
              value={formData.phone}
              error={errors.phone}
              placeholder="Ingresa tu número de teléfono"
              onChangeText={(value) => handleFieldChange('phone', value)}
              disabled={isLoading}
              keyboardType="phone-pad"
              accessibilityLabel="Phone input"
              accessibilityHint="Enter your phone number"
            />

            {/* Email field */}
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

            {/* Password field */}
            <FormField
              label="Contraseña"
              value={formData.password}
              error={errors.password}
              placeholder="Ingresa tu contraseña"
              onChangeText={(value) => handleFieldChange('password', value)}
              disabled={isLoading}
              secureTextEntry
              autoComplete="password"
              textContentType="newPassword"
              accessibilityLabel="Password input"
              accessibilityHint="Enter your password"
            />

            {/* Visual separator */}
            <View style={BASE_STYLES.underline} />

            {/* Submit button - shows spinner when loading */}
            <TouchableOpacity
              style={[
                BASE_STYLES.button,
                isLoading && BASE_STYLES.buttonDisabled,
              ]}
              onPress={handleRegister}
              disabled={isLoading}
              accessibilityLabel="Register button"
              accessibilityHint="Press to submit registration form"
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={BASE_STYLES.buttonText}>Enviar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;