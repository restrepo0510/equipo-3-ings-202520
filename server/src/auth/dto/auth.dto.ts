// src/auth/dto/auth.dto.ts
import { User, UserRole } from '../user.entity';
import { IsEmail, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';

/**
 * DTO for user registration
 */
export class RegisterUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  @MinLength(10)
  address?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}

/**
 * DTO for user login
 */
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

/**
 * DTO for updating user information
 */
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  phone?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}

/**
 * Response DTO for user data (excludes sensitive information)
 */
export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.profileImage = user.profileImage;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

/**
 * Response DTO for authentication (includes JWT token)
 */
export class AuthResponseDto {
  message: string;
  user: UserResponseDto;
  accessToken: string;

  constructor(message: string, user: User, accessToken: string) {
    this.message = message;
    this.user = new UserResponseDto(user);
    this.accessToken = accessToken;
  }
}

// También exporta la interfaz para el controller
export interface IAuthResponse {
  message: string;
  user: UserResponseDto;
  accessToken?: string;
}