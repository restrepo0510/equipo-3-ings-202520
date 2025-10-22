/**
 * Login Screen
 * 
 * User authentication screen with email and password
 * Handles user login and navigation to registration
 */

import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLoginForm } from '@/hooks/useLoginForm';
import { FormField } from '@/components/ui/FormField';
import {
  COLORS,
  BASE_STYLES,
  LOGIN_STYLES,
  DECORATIVE_STYLES,
} from '@/styles/authStyles';

/**
 * LoginScreen Component
 * 
 * Renders login form with email and password fields
 * Uses custom hook for form state management
 * Automatically redirects on successful authentication
 */
const LoginScreen: React.FC = () => {
  const router = useRouter();
  
  // Custom hook handles all form logic
  const {
    formData,
    errors,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
  } = useLoginForm();

  /**
   * Navigates to registration screen
   */
  const navigateToSignUp = useCallback(() => {
    if (isSubmitting) return;
    router.push('/SignUpScreen');
  }, [isSubmitting, router]);

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
          {/* App Logo */}
          <Image
            source={require('@/assets/img/logo.png')}
            style={BASE_STYLES.logo}
            resizeMode="contain"
            accessibilityLabel="Yummi App Logo"
          />

          <View style={BASE_STYLES.cardContainer}>
            {/* Decorative Leaf - Top */}
            <Image
              source={require('@/assets/img/leaf.png')}
              style={[BASE_STYLES.leaf, DECORATIVE_STYLES.leafTop]}
              accessibilityLabel="Decorative element"
            />

            {/* Login Form Card */}
            <View style={LOGIN_STYLES.formCard}>
              <Text style={BASE_STYLES.title}>Iniciar Sesión</Text>
              <View style={BASE_STYLES.underline} />

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
                textContentType="emailAddress"
                autoCapitalize="none"
                accessibilityLabel="Email input field"
                accessibilityHint="Enter your email address"
              />

              {/* Password Input */}
              <FormField
                label="Contraseña"
                value={formData.password}
                error={errors.password}
                placeholder="••••••"
                onChangeText={(value) => handleFieldChange('password', value)}
                disabled={isSubmitting}
                secureTextEntry
                autoComplete="password"
                textContentType="password"
                accessibilityLabel="Password input field"
                accessibilityHint="Enter your password"
              />

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  BASE_STYLES.button,
                  { marginTop: 20 },
                  isSubmitting && BASE_STYLES.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                accessibilityLabel="Login button"
                accessibilityHint="Tap to sign in to your account"
                accessibilityRole="button"
              >
                {isSubmitting ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={BASE_STYLES.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              {/* Decorative Leaf - Bottom */}
              <Image
                source={require('@/assets/img/leaf.png')}
                style={[BASE_STYLES.leaf, DECORATIVE_STYLES.leafBottom]}
                accessibilityLabel="Decorative element"
              />
            </View>

            {/* Registration Link */}
            <TouchableOpacity
              style={BASE_STYLES.secondaryButton}
              onPress={navigateToSignUp}
              disabled={isSubmitting}
              accessibilityLabel="Go to registration"
              accessibilityHint="Tap to create a new account"
              accessibilityRole="button"
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