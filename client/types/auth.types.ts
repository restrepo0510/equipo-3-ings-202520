// types/auth.types.ts

/**
 * User roles in the system
 */
export enum UserRole {
  CUSTOMER = 'customer',
  BUSINESS = 'business',
  ADMIN = 'admin',
}

/**
 * User data structure
 */
export interface User {
  id: string; // UUID
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Authentication response from API
 */
export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data (alias for backward compatibility)
 */
export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole;
  address?: string;
}

/**
 * Registration data (new naming convention)
 */
export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  address?: string; // Required for business accounts
}

/**
 * Update profile data
 */
export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

/**
 * Validation errors for a form
 * Generic type allows errors for any form structure
 */
export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * API Error structure
 */
export interface ApiError {
  message: string;
  statusCode?: number;
}

/**
 * Auth context state
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Auth context value
 */
export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

/**
 * Type guard to check if user is business
 */
export const isBusinessUser = (user: User | null): boolean => {
  return user?.role === UserRole.BUSINESS;
};

/**
 * Type guard to check if user is customer
 */
export const isCustomerUser = (user: User | null): boolean => {
  return user?.role === UserRole.CUSTOMER;
};

/**
 * Type guard to check if user is admin
 */
export const isAdminUser = (user: User | null): boolean => {
  return user?.role === UserRole.ADMIN;
};