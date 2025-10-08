import { User } from '../user.entity';

/**
 * Data transfer object for user registration
 */
export class RegisterUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

/**
 * Data transfer object for user login
 */
export class LoginUserDto {
  email: string;
  password: string;
}

/**
 * Data transfer object for updating user information
 */
export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

/**
 * Response DTO for user data (excludes sensitive information)
 */
export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}