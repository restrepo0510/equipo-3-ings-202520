import { 
  Injectable, 
  ConflictException, 
  NotFoundException, 
  InternalServerErrorException,
  BadRequestException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../auth/user.entity'; // ✅ Importar desde auth
import { Restaurant } from '../restaurants/restaurant.entity';

/**
 * DTO para crear usuario (con role)
 */
export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole; // ✅ Ahora incluye role
}

/**
 * DTO para actualizar usuario
 */
export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: UserRole;
}

/**
 * Service handling business logic for user operations
 * Provides methods for user management and data persistence
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  /**
   * Retrieves all users from the database
   * returns Promise resolving to an array of all User entities
   * throws {InternalServerErrorException} When database query fails
   */
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        select: ['id', 'name', 'email', 'phone', 'role', 'createdAt', 'updatedAt'],
        order: { createdAt: 'DESC' }
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to retrieve users: ${error.message}`);
    }
  }

  /**
   * Creates a new user after validating email uniqueness
   * param createUserDto - Data transfer object containing user creation data
   * returns Promise resolving to the created User entity
   * throws {ConflictException} When email already exists in the system
   * throws {BadRequestException} When user data is invalid
   * throws {InternalServerErrorException} When user creation fails
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Validate required fields
      this.validateUserData(createUserDto);
      await this.validateEmailUniqueness(createUserDto.email);

      // Set default role if not provided
      const role = createUserDto.role || UserRole.CUSTOMER;

      const newUser = this.userRepository.create({
        ...createUserDto,
        role,
      });
      
      const savedUser = await this.userRepository.save(newUser);
      console.log(`✅ User created: ${savedUser.email} with role: ${savedUser.role}`);

      // Automatically create a Restaurant if user is a business
      if (role === UserRole.BUSINESS) {
        await this.createBusinessRestaurant(savedUser);
      }

      const { password: _, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as User;
    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      console.error('❌ Error creating user:', error);
      throw new InternalServerErrorException(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Finds a user by their email address
   * param email - Email address to search for
   * returns Promise resolving to User entity or null if not found
   * throws {InternalServerErrorException} When database query fails
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      if (!email || typeof email !== 'string') {
        throw new BadRequestException('Valid email is required');
      }

      return await this.userRepository.findOne({ 
        where: { email },
        select: ['id', 'name', 'email', 'phone', 'password', 'role', 'createdAt'] 
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to find user by email: ${error.message}`);
    }
  }

  /**
   * Finds a user by their ID
   * param userId - Unique identifier of the user
   * returns Promise resolving to User entity or null if not found
   * throws {InternalServerErrorException} When database query fails
   */
  async findById(userId: string): Promise<User | null> {
    try {
      if (!userId || typeof userId !== 'string') {
        throw new BadRequestException('Valid user ID is required');
      }

      return await this.userRepository.findOne({ 
        where: { id: userId },
        select: ['id', 'name', 'email', 'phone', 'role', 'createdAt', 'updatedAt']
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to find user by ID: ${error.message}`);
    }
  }

  /**
   * Validates that an email address is not already registered
   * param email - Email address to validate
   * throws {ConflictException} When email is already in use
   */
  private async validateEmailUniqueness(email: string): Promise<void> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(`Email address ${email} is already registered`);
    }
  }

  /**
   * Validates user data for creation
   * @param userData - User data to validate
   * @throws {BadRequestException} When required fields are missing or invalid
   */
  private validateUserData(userData: CreateUserDto): void {
    const { name, email, phone, password } = userData;

    if (!name || !email || !phone || !password) {
      throw new BadRequestException('All fields (name, email, phone, password) are required');
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new BadRequestException('Valid name is required');
    }

    if (typeof email !== 'string' || !this.isValidEmail(email)) {
      throw new BadRequestException('Valid email address is required');
    }

    if (typeof password !== 'string' || password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    // Validate role if provided
    if (userData.role && !Object.values(UserRole).includes(userData.role)) {
      throw new BadRequestException('Invalid role');
    }
  }

  /**
   * Basic email validation
   * param email - Email to validate
   * returns boolean indicating if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Creates a restaurant automatically when a user with BUSINESS role registers
   * @param user - The business user
   */
  private async createBusinessRestaurant(user: User): Promise<void> {
    try {
      console.log(`🏪 Creating restaurant for business user: ${user.email}`);

      const restaurant = this.restaurantRepository.create({
        id: user.id, // Use the same UUID as the user
        name: user.name,
        email: user.email,
        phone: user.phone,
        userId: user.id,
        address: 'Dirección no especificada',
        description: `Restaurante de ${user.name}`,
        latitude: 0,
        longitude: 0,
        category: 'General',
        isActive: true,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
        openingTime: '08:00',
        closingTime: '20:00',
      });

      await this.restaurantRepository.save(restaurant);
      console.log(`✅ Restaurant created for business user: ${user.email}`);
    } catch (error) {
      console.error('❌ Failed to create restaurant automatically:', error);
      // No lanzamos error para que el registro de usuario no falle
    }
  }
}