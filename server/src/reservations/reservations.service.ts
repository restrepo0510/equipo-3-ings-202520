// src/reservations/reservations.service.ts
import { 
  Injectable, 
  NotFoundException, 
  BadRequestException,
  Logger 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Reservation, ReservationStatus } from './entities/reservation.entity';
import { Product } from '../products/entities/product.entity';

interface CreateReservationDto {
  userId: string;
  productId: string;
  quantity: number;
}

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);
  private readonly RESERVATION_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /**
   * Create a new reservation
   */
  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { userId, productId, quantity } = createReservationDto;

    // Verificar que el producto existe y tiene stock
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!product.isAvailable) {
      throw new BadRequestException('Product is not available');
    }

    if (product.stock < quantity) {
      throw new BadRequestException(`Insufficient stock. Available: ${product.stock}`);
    }

    // Cancelar reservas anteriores pendientes del usuario para este producto
    await this.cancelPreviousReservations(userId, productId);

    // Calcular precios
    const unitPrice = product.price;
    const subtotal = unitPrice * quantity;
    const discount = product.originalPrice 
      ? (product.originalPrice - product.price) * quantity 
      : 0;
    const total = subtotal;

    // Calcular fecha de expiración (5 minutos desde ahora)
    const expiresAt = new Date(Date.now() + this.RESERVATION_DURATION);

    // Crear reserva
    const reservation = this.reservationRepository.create({
      userId,
      productId,
      quantity,
      unitPrice,
      subtotal,
      discount,
      total,
      status: ReservationStatus.PENDING,
      expiresAt,
    });

    const savedReservation = await this.reservationRepository.save(reservation);

    // Reducir stock temporalmente
    product.stock -= quantity;
    await this.productRepository.save(product);

    this.logger.log(
      `✅ Reservation created: ${savedReservation.id} - Expires at ${expiresAt.toLocaleTimeString()}`
    );

    return savedReservation;
  }

  /**
   * Cancel previous pending reservations for the same user and product
   */
  private async cancelPreviousReservations(
    userId: string,
    productId: string
  ): Promise<void> {
    const previousReservations = await this.reservationRepository.find({
      where: {
        userId,
        productId,
        status: ReservationStatus.PENDING,
      },
    });

    for (const reservation of previousReservations) {
      await this.cancelReservation(reservation.id);
    }
  }

  /**
   * Confirm reservation (after successful payment)
   */
  async confirm(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['product'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.status !== ReservationStatus.PENDING) {
      throw new BadRequestException('Reservation is not pending');
    }

    if (new Date() > reservation.expiresAt) {
      await this.expireReservation(reservationId);
      throw new BadRequestException('Reservation has expired');
    }

    reservation.status = ReservationStatus.CONFIRMED;
    const confirmedReservation = await this.reservationRepository.save(reservation);

    this.logger.log(`✅ Reservation confirmed: ${reservationId}`);

    return confirmedReservation;
  }

  /**
   * Cancel reservation
   */
  async cancelReservation(reservationId: string): Promise<void> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['product'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.status === ReservationStatus.PENDING) {
      // Devolver stock al producto
      reservation.product.stock += reservation.quantity;
      await this.productRepository.save(reservation.product);

      reservation.status = ReservationStatus.CANCELLED;
      await this.reservationRepository.save(reservation);

      this.logger.log(`❌ Reservation cancelled: ${reservationId}`);
    }
  }

  /**
   * Expire reservation (automatically called by cron)
   */
  async expireReservation(reservationId: string): Promise<void> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['product'],
    });

    if (!reservation) return;

    if (reservation.status === ReservationStatus.PENDING) {
      // Devolver stock al producto
      reservation.product.stock += reservation.quantity;
      await this.productRepository.save(reservation.product);

      reservation.status = ReservationStatus.EXPIRED;
      await this.reservationRepository.save(reservation);

      this.logger.log(`⏰ Reservation expired: ${reservationId}`);
    }
  }

  /**
   * Get user reservations
   */
  async getUserReservations(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: { userId },
      relations: ['product', 'product.restaurant'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get reservation by ID
   */
  async findOne(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['product', 'product.restaurant', 'user'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  /**
   * Cron job to expire old reservations every minute
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleExpiredReservations(): Promise<void> {
    const expiredReservations = await this.reservationRepository.find({
      where: {
        status: ReservationStatus.PENDING,
        expiresAt: LessThan(new Date()),
      },
      relations: ['product'],
    });

    for (const reservation of expiredReservations) {
      await this.expireReservation(reservation.id);
    }

    if (expiredReservations.length > 0) {
      this.logger.log(`⏰ Expired ${expiredReservations.length} reservations`);
    }
  }
}