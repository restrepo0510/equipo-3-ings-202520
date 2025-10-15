// src/auth/auth.service.ts
import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException, 
  InternalServerErrorException,
  BadRequestException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { 
  RegisterUserDto, 
  LoginUserDto, 
  UserResponseDto,
  AuthResponseDto 
} from './dto/auth.dto';

/**
 * JWT Payload interface
 */
interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}

/**
 * Authentication service with JWT support
 * Handles user registration, login, and token generation
 */
@Injectable()
export class AuthService {
  private readonly saltRounds: number = 12;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user and returns JWT token
   */
  async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    try {
      // Validate input
      this.validateRegistrationData(registerUserDto);

      // Check email uniqueness
      await this.checkEmailUniqueness(registerUserDto.email);

      // Hash password (basic implementation)
      const hashedPassword = await this.basicHashPassword(registerUserDto.password);

      // Set default role if not provided
      const role = registerUserDto.role || UserRole.CUSTOMER;

      // Create user
      const user = this.userRepository.create({
        ...registerUserDto,
        password: hashedPassword,
        role,
      });

      const savedUser = await this.userRepository.save(user);

      // Generate JWT token
      const accessToken = this.generateToken(savedUser);

      return new AuthResponseDto(
        'User registered successfully',
        savedUser,
        accessToken
      );
    } catch (error) {
      if (
        error instanceof ConflictException || 
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(`Registration failed: ${error.message}`);
    }
  }

  /**
   * Authenticates user and returns JWT token
   */
  async login(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    try {
      // Validate input
      this.validateLoginCredentials(loginUserDto);

      // Find user with password
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
        select: ['id', 'name', 'email', 'phone', 'password', 'role', 'createdAt', 'updatedAt'],
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await this.basicVerifyPassword(
        loginUserDto.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      const accessToken = this.generateToken(user);

      return new AuthResponseDto(
        'Login successful',
        user,
        accessToken
      );
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException(`Login failed: ${error.message}`);
    }
  }

  /**
   * Generates JWT access token for user
   */
  private generateToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Retrieves all users (without passwords)
   */
  async getAllUsers(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.find({
        select: ['id', 'name', 'email', 'phone', 'role', 'createdAt', 'updatedAt'],
        order: { createdAt: 'DESC' },
      });

      return users.map(user => new UserResponseDto(user));
    } catch (error) {
      throw new InternalServerErrorException(`Failed to retrieve users: ${error.message}`);
    }
  }

  // Validation methods
  private validateRegistrationData(data: RegisterUserDto): void {
    if (!data.name || !data.email || !data.phone || !data.password) {
      throw new BadRequestException('All fields are required');
    }

    if (data.name.trim().length < 2) {
      throw new BadRequestException('Name must be at least 2 characters');
    }

    if (!this.isValidEmail(data.email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (data.password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    if (!this.isValidPhone(data.phone)) {
      throw new BadRequestException('Invalid phone number');
    }

    if (data.role && !Object.values(UserRole).includes(data.role)) {
      throw new BadRequestException('Invalid role');
    }
  }

  private validateLoginCredentials(credentials: LoginUserDto): void {
    if (!credentials.email || !credentials.password) {
      throw new BadRequestException('Email and password are required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new BadRequestException('Invalid email format');
    }
  }

  private async checkEmailUniqueness(email: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
  }

  // Basic password hashing (REPLACE WITH BCRYPT)
  private async basicHashPassword(password: string): Promise<string> {
    const simpleHash = Buffer.from(password).toString('base64');
    return `basic_hash_${simpleHash}`;
  }

  private async basicVerifyPassword(plain: string, hashed: string): Promise<boolean> {
    const testHash = Buffer.from(plain).toString('base64');
    return hashed === `basic_hash_${testHash}`;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone.replace(/\s/g, ''));
  }
}