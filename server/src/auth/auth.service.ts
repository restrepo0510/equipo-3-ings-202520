import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException, 
  InternalServerErrorException,
  BadRequestException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto, LoginUserDto, UserResponseDto } from './dto/auth.dto';
import { 
  IAuthResponse, 
  ILoginCredentials, 
  IRegistrationData 
} from './interfaces/auth.interfaces';

/**
 * Authentication service handling user registration, login, and user management
 * Provides secure authentication with password hashing
 */
@Injectable()
export class AuthService {
  private readonly saltRounds: number = 12;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Registers a new user in the system
   * @param registerUserDto - User registration data
   * @returns Authentication response with user data
   * @throws {ConflictException} When email already exists
   * @throws {BadRequestException} When input data is invalid
   * @throws {InternalServerErrorException} When registration fails
   */
  async register(registerUserDto: RegisterUserDto): Promise<IAuthResponse> {
    try {
      // Validate input data
      this.validateRegistrationData(registerUserDto);

      // Check if user already exists
      await this.checkEmailUniqueness(registerUserDto.email);

      // Hash password (basic implementation - replace with bcrypt later)
      const hashedPassword = await this.basicHashPassword(registerUserDto.password);

      // Create user entity
      const user = this.userRepository.create({
        ...registerUserDto,
        password: hashedPassword,
      });

      // Save user to database
      const savedUser = await this.userRepository.save(user);

      // Return response without password
      const userResponse = new UserResponseDto(savedUser);

      return {
        message: 'User registered successfully',
        user: userResponse,
      };
    } catch (error) {
      if (
        error instanceof ConflictException || 
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to register user: ${error.message}`);
    }
  }

  /**
   * Authenticates a user and returns user data
   * @param loginUserDto - User login credentials
   * @returns Authentication response with user data
   * @throws {UnauthorizedException} When credentials are invalid
   * @throws {InternalServerErrorException} When login process fails
   */
  async login(loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    try {
      // Validate input data
      this.validateLoginCredentials(loginUserDto);

      // Find user by email
      const user = await this.findUserByEmail(loginUserDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password (basic implementation - replace with bcrypt later)
      const isPasswordValid = await this.basicVerifyPassword(
        loginUserDto.password, 
        user.password
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Return response without password
      const userResponse = new UserResponseDto(user);

      return {
        message: 'Login successful',
        user: userResponse,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to authenticate user: ${error.message}`);
    }
  }

  /**
   * Retrieves all users from the system (excluding passwords)
   * @returns Array of user data without sensitive information
   * @throws {InternalServerErrorException} When database query fails
   */
  async getAllUsers(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.find({
        select: ['id', 'name', 'email', 'phone', 'createdAt', 'updatedAt'],
        order: { createdAt: 'DESC' },
      });

      return users.map(user => new UserResponseDto(user));
    } catch (error) {
      throw new InternalServerErrorException(`Failed to retrieve users: ${error.message}`);
    }
  }

  /**
   * Validates registration data
   * @param data - Registration data to validate
   * @throws {BadRequestException} When data is invalid
   */
  private validateRegistrationData(data: IRegistrationData): void {
    const { name, email, phone, password } = data;

    if (!name || !email || !phone || !password) {
      throw new BadRequestException('All fields are required');
    }

    if (name.trim().length < 2) {
      throw new BadRequestException('Name must be at least 2 characters long');
    }

    if (!this.isValidEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    if (!this.isValidPhone(phone)) {
      throw new BadRequestException('Invalid phone number format');
    }
  }

  /**
   * Validates login credentials
   * @param credentials - Login credentials to validate
   * @throws {BadRequestException} When credentials are invalid
   */
  private validateLoginCredentials(credentials: ILoginCredentials): void {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    if (!this.isValidEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }
  }

  /**
   * Checks if email is unique in the system
   * @param email - Email to check
   * @throws {ConflictException} When email already exists
   */
  private async checkEmailUniqueness(email: string): Promise<void> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email address is already registered');
    }
  }

  /**
   * Finds a user by email address
   * @param email - Email to search for
   * @returns User entity or null if not found
   */
  private async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ 
        where: { email },
        select: ['id', 'name', 'email', 'phone', 'password', 'createdAt', 'updatedAt']
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find user by email: ${error.message}`);
    }
  }

  /**
   * Basic password hashing (REPLACE WITH BCRYPT AFTER INSTALLATION)
   * @param password - Plain text password
   * @returns Hashed password
   */
  private async basicHashPassword(password: string): Promise<string> {
    try {
      // Temporary basic hashing - replace with bcrypt after installation
      // In a real application, use: return await bcrypt.hash(password, this.saltRounds);
      const simpleHash = Buffer.from(password).toString('base64');
      return `basic_hash_${simpleHash}`;
    } catch (error) {
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  /**
   * Basic password verification (REPLACE WITH BCRYPT AFTER INSTALLATION)
   * @param plainPassword - Plain text password
   * @param hashedPassword - Hashed password
   * @returns Boolean indicating password validity
   */
  private async basicVerifyPassword(
    plainPassword: string, 
    hashedPassword: string
  ): Promise<boolean> {
    try {
      // Temporary basic verification - replace with bcrypt after installation
      // In a real application, use: return await bcrypt.compare(plainPassword, hashedPassword);
      const testHash = Buffer.from(plainPassword).toString('base64');
      return hashedPassword === `basic_hash_${testHash}`;
    } catch (error) {
      throw new InternalServerErrorException('Failed to verify password');
    }
  }

  /**
   * Validates email format
   * @param email - Email to validate
   * @returns Boolean indicating email validity
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates phone number format
   * @param phone - Phone number to validate
   * @returns Boolean indicating phone validity
   */
  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
}