// src/cash-receipts/dto/cash-receipt.dto.ts

import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CashReceiptStatus } from '../entities/cash-receipt.entity';

/**
 * Create Cash Receipt DTO
 * ✅ UPDATED: Added restaurantAddress field
 */
export class CreateCashReceiptDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsUUID()
  restaurantId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiProperty({ example: 'Hamburguesa Paisa' })
  @IsString()
  productName: string;

  @ApiProperty({ example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  subtotal: number;

  @ApiProperty({ example: 3000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiProperty({ example: 22000 })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  // ✅ NUEVO: Restaurant address field
  @ApiProperty({ 
    example: 'Calle 10 #43-15, El Poblado',
    required: false,
    description: 'Restaurant address (optional, will be fetched from restaurant if not provided)'
  })
  @IsOptional()
  @IsString()
  restaurantAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

/**
 * Validate Cash Receipt DTO
 */
export class ValidateCashReceiptDto {
  @ApiProperty({ example: 'CR-ABC123XY' })
  @IsString()
  receiptCode: string;

  @ApiProperty({ 
    example: 'Staff Name or ID',
    description: 'Person validating the receipt'
  })
  @IsString()
  validatedBy: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

/**
 * Cash Receipt Response DTO
 * ✅ UPDATED: Added missing fields
 */
export class CashReceiptResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  receiptCode: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  restaurantId: string;

  @ApiProperty()
  restaurantName: string;

  // ✅ ADDED
  @ApiProperty()
  restaurantAddress: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  quantity: number;

  // ✅ ADDED
  @ApiProperty()
  unitPrice: number;

  // ✅ ADDED
  @ApiProperty()
  subtotal: number;

  // ✅ ADDED
  @ApiProperty()
  discount: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ enum: CashReceiptStatus })
  status: CashReceiptStatus;

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  qrCodeData: string;

  @ApiProperty({ required: false })
  pdfUrl?: string;

  @ApiProperty()
  createdAt: Date;
}

/**
 * Query Cash Receipts DTO
 */
export class QueryCashReceiptsDto {
  @ApiProperty({ required: false, enum: CashReceiptStatus })
  @IsOptional()
  @IsEnum(CashReceiptStatus)
  status?: CashReceiptStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number = 0;
}