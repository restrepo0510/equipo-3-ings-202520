// context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { router } from 'expo-router';
import { authService } from '@/services/authService';
import { storageService } from '@/services/storageService';
import {
  User,
  UserRole,
  LoginCredentials,
  RegisterData,
  RegistrationData,
  AuthContextValue,
  AuthState,
  isBusinessUser,
} from '@/types/auth.types';

/**
 * Auth Context
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider Component
 * 
 * Manages authentication state across the entire app.
 * Handles login, registration, logout, and token persistence.
 * 
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // ============================================================================
  // State Management
  // ============================================================================
  
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // ============================================================================
  // Initialization - Load stored auth data
  // ============================================================================
  
  useEffect(() => {
    loadStoredAuth();
  }, []);

  /**
   * Loads authentication data from storage on app start
   */
  const loadStoredAuth = async (): Promise<void> => {
    try {
      const authData = await storageService.getAuthData();

      if (authData) {
        setState({
          user: authData.user,
          token: authData.token,
          isLoading: false,
          isAuthenticated: true,
        });

        console.log('✅ Auth restored from storage');
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('❌ Error loading stored auth:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // ============================================================================
  // Authentication Methods
  // ============================================================================

  /**
   * Logs in a user with email and password
   * Redirects based on user role
   * 
   * @throws Error if login fails
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Call authentication service
      const response = await authService.login(credentials);

      // Store auth data
      await storageService.saveAuthData(response.accessToken, response.user);

      // Update state
      setState({
        user: response.user,
        token: response.accessToken,
        isLoading: false,
        isAuthenticated: true,
      });

      // Redirect based on user role
      if (isBusinessUser(response.user)) {
        router.replace('/(tabs)/BusinessProfileScreen');
      } else {
        router.replace('/(tabs)/HomeScreen');
      }

      console.log('✅ Login successful:', response.user.email, 'Role:', response.user.role);
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  /**
   * Registers a new user
   * Automatically logs in the user after successful registration
   * 
   * @throws Error if registration fails
   */
  const register = async (data: RegisterData): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Call authentication service (handles role normalization)
      const response = await authService.register(data);

      // Store auth data
      await storageService.saveAuthData(response.accessToken, response.user);

      // Update state
      setState({
        user: response.user,
        token: response.accessToken,
        isLoading: false,
        isAuthenticated: true,
      });

      // Redirect based on user role
      if (isBusinessUser(response.user)) {
        router.replace('/(tabs)/BusinessProfileScreen');
      } else {
        router.replace('/(tabs)/HomeScreen');
      }

      console.log('✅ Registration successful:', response.user.email);
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  /**
   * Logs out the current user
   * Clears all stored authentication data and redirects to login
   */
  const logout = async (): Promise<void> => {
    try {
      // Clear stored data
      await storageService.clearAuthData();

      // Update state
      setState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });

      // Redirect to login
      router.replace('/(tabs)/LoginScreen');

      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Error during logout:', error);
      throw error;
    }
  };

  /**
   * Updates user data in state and storage
   * Used after profile updates
   */
  const updateUser = async (user: User): Promise<void> => {
    try {
      await storageService.updateUserData(user);
      
      setState(prev => ({
        ...prev,
        user,
      }));

      console.log('✅ User data updated');
    } catch (error) {
      console.error('❌ Error updating user:', error);
      throw error;
    }
  };

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * useAuth Hook
 * 
 * Provides access to authentication state and methods
 * Must be used within AuthProvider
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * ```
 * 
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};