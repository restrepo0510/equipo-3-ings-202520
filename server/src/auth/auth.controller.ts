import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  HttpCode, 
  HttpStatus,
  BadRequestException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto/auth.dto';
import { IAuthResponse } from './interfaces/auth.interfaces';

/**
 * Authentication controller handling user registration and login
 * Provides endpoints for user authentication and management
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user in the system
   * @param registerUserDto - User registration data
   * @returns Authentication response with user data
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto): Promise<IAuthResponse> {
    try {
      return await this.authService.register(registerUserDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Authenticates a user and returns user data
   * @param loginUserDto - User login credentials
   * @returns Authentication response with user data
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all users from the system
   * @returns Array of user data without sensitive information
   */
  @Get('users')
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<any[]> {
    try {
      return await this.authService.getAllUsers();
    } catch (error) {
      throw error;
    }
  }
}