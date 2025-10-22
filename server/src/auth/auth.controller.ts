// src/auth/auth.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  HttpCode, 
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto, AuthResponseDto, UserResponseDto } from './dto/auth.dto';

/**
 * Authentication Controller
 * Handles user registration, login, and user management
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user
   * @param registerUserDto - User registration data
   * @returns Authentication response with JWT token
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    try {
      return await this.authService.register(registerUserDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   * @param loginUserDto - User login credentials
   * @returns Authentication response with JWT token
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all users (for admin/testing purposes)
   * @returns Array of user data
   */
  @Get('users')
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<UserResponseDto[]> {
    try {
      return await this.authService.getAllUsers();
    } catch (error) {
      throw error;
    }
  }
}