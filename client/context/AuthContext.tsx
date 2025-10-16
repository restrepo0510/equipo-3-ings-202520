// context/AuthContext.tsx
import { router } from 'expo-router';
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/config/api';
import {
  User,
  UserRole,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  AuthContextValue,
  AuthState,
} from '../types/auth.types';

/**
 * Storage keys for AsyncStorage
 */
const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
} as const;

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
   * Loads authentication data from AsyncStorage on app start
   */
  const loadStoredAuth = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
      ]);

      if (storedToken && storedUser) {
        const user: User = JSON.parse(storedUser);
        
        setState({
          user,
          token: storedToken,
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
   * Stores token and user data in AsyncStorage
   * 
   * @throws Error if login fails
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, data.accessToken),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user)),
      ]);

      setState({
        user: data.user,
        token: data.accessToken,
        isLoading: false,
        isAuthenticated: true,
      });

// ✅ Redirect based on user role
if (data.user.role === UserRole.BUSINESS) {
  router.replace('/(tabs)/BusinessProfileScreen');
} else {
  router.replace('/(tabs)/HomeScreen');
}

console.log('✅ Login successful:', data.user.email, 'Role:', data.user.role);
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

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData: AuthResponse = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      // Store auth data
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, responseData.accessToken),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(responseData.user)),
      ]);

      setState({
        user: responseData.user,
        token: responseData.accessToken,
        isLoading: false,
        isAuthenticated: true,
      });

      console.log('✅ Registration successful:', responseData.user.email);
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  /**
   * Logs out the current user
   * Clears all stored authentication data
   */
  const logout = async (): Promise<void> => {
    try {
      // Clear stored data
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
      ]);

      setState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });

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
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      
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