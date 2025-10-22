/**
 * User interface for type safety
 */
export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Authentication response interface
 */
export interface IAuthResponse {
  message: string;
  user?: Omit<IUser, 'password'>;
  token?: string;
}

/**
 * Login credentials interface
 */
export interface ILoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data interface
 */
export interface IRegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

/**
 * Error response interface
 */
export interface IErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}