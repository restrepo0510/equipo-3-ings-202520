// src/reservations/reservations.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';

interface CreateReservationDto {
  productId: string;
  quantity: number;
}

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /**
   * Create a new reservation
   */
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req: any,
  ): Promise<Reservation> {
    // TODO: Extract userId from JWT token in req.user
    const userId = req.user?.id || 'temp-user-id';

    return await this.reservationsService.create({
      userId,
      productId: createReservationDto.productId,
      quantity: createReservationDto.quantity,
    });
  }

  /**
   * Get user's reservations
   */
  @Get('my-reservations')
  async getMyReservations(@Request() req: any): Promise<Reservation[]> {
    const userId = req.user?.id || 'temp-user-id';
    return await this.reservationsService.getUserReservations(userId);
  }

  /**
   * Get reservation by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation> {
    return await this.reservationsService.findOne(id);
  }

  /**
   * Confirm reservation (after payment)
   */
  @Patch(':id/confirm')
  async confirm(@Param('id') id: string): Promise<Reservation> {
    return await this.reservationsService.confirm(id);
  }

  /**
   * Cancel reservation
   */
  @Delete(':id')
  async cancel(@Param('id') id: string): Promise<{ message: string }> {
    await this.reservationsService.cancelReservation(id);
    return { message: 'Reservation cancelled successfully' };
  }
}