// src/auth/auth.service.ts
import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException, 
  InternalServerErrorException,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { 
  RegisterUserDto, 
  LoginUserDto, 
  UpdateUserDto,
  UserResponseDto,
  AuthResponseDto 
} from './dto/auth.dto';
import axios from 'axios';

/**
 * JWT Payload interface
 */
interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

/**
 * Coordinates interface
 */
interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Authentication service with JWT support
 * Handles user registration, login, and token generation
 */
@Injectable()
export class AuthService {
  private readonly saltRounds: number = 12;
  private readonly DEFAULT_COORDINATES: Coordinates = {
    latitude: 6.2476,  // Medellín, Colombia
    longitude: -75.5658,
  };

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
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

      // Hash password (basic for now)
      const hashedPassword = await this.basicHashPassword(registerUserDto.password);

      // Set default role
      const role = registerUserDto.role || UserRole.CUSTOMER;

      // Create user entity
      const user = this.userRepository.create({
        ...registerUserDto,
        password: hashedPassword,
        role,
      });

      const savedUser = await this.userRepository.save(user);
      console.log(`✅ User created: ${savedUser.email} with role: ${savedUser.role}`);

      // ✅ If business, create a restaurant with address
      if (role === UserRole.BUSINESS) {
        await this.createRestaurantForBusiness(savedUser, registerUserDto.address);
      }

      // Generate token
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
      console.error('❌ Registration error:', error);
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

      // Find user with password and profileImage
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
        select: ['id', 'name', 'email', 'phone', 'password', 'role', 'profileImage', 'createdAt', 'updatedAt'],
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

      console.log('✅ Login successful. Profile image:', user.profileImage || 'None');

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
        select: ['id', 'name', 'email', 'phone', 'role', 'profileImage', 'createdAt', 'updatedAt'],
        order: { createdAt: 'DESC' },
      });

      return users.map(user => new UserResponseDto(user));
    } catch (error) {
      throw new InternalServerErrorException(`Failed to retrieve users: ${error.message}`);
    }
  }

  /**
   * Updates user profile information
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    try {
      // Find user
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Update fields if provided
      if (updateUserDto.name) {
        user.name = updateUserDto.name.trim();
      }

      if (updateUserDto.email) {
        // Check if email is being changed and if new email is unique
        if (updateUserDto.email !== user.email) {
          const existingUser = await this.userRepository.findOne({ 
            where: { email: updateUserDto.email } 
          });
          if (existingUser) {
            throw new ConflictException('Email already in use');
          }
          user.email = updateUserDto.email.trim();
        }
      }

      if (updateUserDto.phone) {
        user.phone = updateUserDto.phone.trim();
      }

      if (updateUserDto.password) {
        user.password = await this.basicHashPassword(updateUserDto.password);
      }

      if (updateUserDto.profileImage !== undefined) {
        user.profileImage = updateUserDto.profileImage;
        console.log('✅ Updated profile image:', updateUserDto.profileImage);
      }

      // Save updated user
      const updatedUser = await this.userRepository.save(user);

      console.log('✅ User profile updated:', updatedUser.email);

      return new UserResponseDto(updatedUser);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update user: ${error.message}`);
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

    // Validate address for business accounts
    if (data.role === UserRole.BUSINESS) {
      if (!data.address || data.address.trim().length < 10) {
        throw new BadRequestException('Valid business address is required (minimum 10 characters)');
      }
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

  /**
   * Normaliza y limpia direcciones colombianas
   */
  private normalizeAddress(address: string): string {
    let normalized = address.trim();
    
    // Remover espacios extras alrededor de caracteres especiales
    normalized = normalized.replace(/\s*#\s*/g, ' #').replace(/\s*-\s*/g, '-');
    
    // Convertir a minúsculas para comparaciones
    const lowerAddress = normalized.toLowerCase();
    
    // Detectar si ya tiene ciudad
    const hasBello = lowerAddress.includes('bello');
    const hasEnvigado = lowerAddress.includes('envigado');
    const hasItagui = lowerAddress.includes('itagüí') || lowerAddress.includes('itagui');
    const hasSabaneta = lowerAddress.includes('sabaneta');
    const hasMedellin = lowerAddress.includes('medellín') || lowerAddress.includes('medellin');
    
    // Si tiene municipio del área metropolitana pero no Medellín completo
    if ((hasBello || hasEnvigado || hasItagui || hasSabaneta) && !lowerAddress.includes('colombia')) {
      // Remover duplicados de "Antioquia"
      normalized = normalized.replace(/,?\s*(antioquia|Antioquia)\s*,?\s*/gi, ', ');
      // Limpiar comas duplicadas
      normalized = normalized.replace(/,\s*,/g, ',').trim();
      return `${normalized}, Antioquia, Colombia`;
    }
    
    // Si solo tiene Medellín
    if (hasMedellin && !lowerAddress.includes('colombia')) {
      normalized = normalized.replace(/,?\s*(antioquia|Antioquia)\s*,?\s*/gi, ', ');
      normalized = normalized.replace(/,\s*,/g, ',').trim();
      return `${normalized}, Antioquia, Colombia`;
    }
    
    // Si no tiene ninguna ciudad, agregar Medellín por defecto
    if (!hasMedellin && !hasBello && !hasEnvigado && !hasItagui && !hasSabaneta) {
      return `${normalized}, Medellín, Antioquia, Colombia`;
    }
    
    // Si ya está completo, solo limpiar
    normalized = normalized.replace(/,?\s*(antioquia|Antioquia)\s*,?\s*(antioquia|Antioquia)\s*,?/gi, ', Antioquia, ');
    normalized = normalized.replace(/,\s*,/g, ',').trim();
    
    return normalized;
  }

  /**
   * Geocodes an address to latitude and longitude using Nominatim (OpenStreetMap)
   * Optimized for Medellín, Colombia addresses
   */
  private async geocodeAddress(address: string): Promise<Coordinates> {
    try {
      const searchAddress = this.normalizeAddress(address);
      console.log(`🔍 Original: ${address}`);
      console.log(`🔍 Normalized: ${searchAddress}`);

      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: searchAddress,
          format: 'json',
          limit: 3,
          countrycodes: 'co',
          addressdetails: 1,
        },
        headers: {
          'User-Agent': 'YummiApp/1.0',
        },
        timeout: 8000,
      });

      if (response.data && response.data.length > 0) {
        // Buscar el mejor resultado (priorizar área metropolitana de Medellín)
        const bestResult = response.data.find((result: any) => {
          const displayName = result.display_name.toLowerCase();
          return displayName.includes('medellín') || 
                 displayName.includes('bello') || 
                 displayName.includes('envigado') ||
                 displayName.includes('itagüí') ||
                 displayName.includes('sabaneta');
        }) || response.data[0];

        const coordinates: Coordinates = {
          latitude: parseFloat(bestResult.lat),
          longitude: parseFloat(bestResult.lon),
        };
        
        console.log(`✅ Geocoded successfully: (${coordinates.latitude}, ${coordinates.longitude})`);
        console.log(`   Location: ${bestResult.display_name}`);
        return coordinates;
      }

      console.warn('⚠️ No geocoding results found, using default coordinates (Parque Lleras)');
      return this.DEFAULT_COORDINATES;
    } catch (error) {
      console.error('❌ Geocoding error:', error.message);
      console.log('🔍 Using default coordinates for Medellín');
      return this.DEFAULT_COORDINATES;
    }
  }

  /**
   * Automatically creates a restaurant entry when a business user registers
   * Includes geocoding of the provided address
   */
  private async createRestaurantForBusiness(user: User, address?: string): Promise<void> {
    try {
      console.log(`🪙 Creating restaurant for business user: ${user.email}`);

      let coordinates: Coordinates = this.DEFAULT_COORDINATES;

      // ✅ Geocode address if provided
      if (address && address.trim().length > 0) {
        coordinates = await this.geocodeAddress(address.trim());
      } else {
        console.warn('⚠️ No address provided, using default coordinates');
      }

      const restaurant = this.restaurantRepository.create({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userId: user.id,
        address: address?.trim() || 'Dirección no especificada',
        description: `Restaurante de ${user.name}`,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        category: 'General',
        isActive: true,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
        openingTime: '08:00',
        closingTime: '20:00',
      });

      const savedRestaurant = await this.restaurantRepository.save(restaurant);
      console.log(`✅ Restaurant created at coordinates: (${coordinates.latitude}, ${coordinates.longitude})`);
      console.log(`   Address: ${savedRestaurant.address}`);
    } catch (error) {
      console.error('❌ Error creating restaurant for business:', error);
      // No lanzamos el error para que el registro del usuario no falle
    }
  }
}