import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UsePipes, 
  ValidationPipe,
  InternalServerErrorException,
  BadRequestException,
  ConflictException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/user.entity';
import type { CreateUserDto } from './users.service'; // ✅ Importar tipo desde service

/**
 * Controller handling user-related HTTP requests
 * Provides endpoints for user management operations
 */
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves all users from the system
   * returns Promise resolving to an array of User entities
   * InternalServerErrorException When database operation fails
   */
  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to retrieve users: ${error.message}`);
    }
  }

  /**
   * Creates a new user in the system
   * param createUserDto - User data transfer object containing required user information
   * returns Promise resolving to the created User entity
   * throws {BadRequestException} When user data is invalid
   * throws {ConflictException} When email already exists
   * throws {InternalServerErrorException} When user creation fails
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to create user: ${error.message}`);
    }
  }
}