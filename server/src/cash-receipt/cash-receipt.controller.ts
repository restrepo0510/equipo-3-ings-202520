// src/cash-receipts/cash-receipts.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CashReceiptsService } from './cash-receipt.service';
import {
  CreateCashReceiptDto,
  ValidateCashReceiptDto,
  QueryCashReceiptsDto,
  CashReceiptResponseDto,
} from './dto/cash-receipt.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response } from 'express';

@ApiTags('Cash Receipts')
@Controller('cash-receipts')
export class CashReceiptsController {
  constructor(private readonly cashReceiptsService: CashReceiptsService) {}

  /**
   * Create a new cash receipt
   * Used when user selects "pay with cash"
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new cash payment receipt' })
  @ApiResponse({
    status: 201,
    description: 'Receipt created successfully',
    type: CashReceiptResponseDto,
  })
  async create(@Req() req, @Body() createDto: CreateCashReceiptDto) {
    const userId = req.user.id;
    const receipt = await this.cashReceiptsService.create(userId, createDto);

    return {
      success: true,
      message: 'Receipt created successfully',
      data: {
        id: receipt.id,
        receiptCode: receipt.receiptCode,
        orderId: receipt.orderId,
        restaurantId: receipt.restaurantId,
        restaurantName: receipt.restaurant.name,
        productName: receipt.productName,
        quantity: receipt.quantity,
        totalAmount: receipt.totalAmount,
        status: receipt.status,
        expiresAt: receipt.expiresAt,
        qrCodeData: receipt.qrCodeData,
        createdAt: receipt.createdAt,
      },
    };
  }

  /**
   * Get user's receipts with filters
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user cash receipts' })
  @ApiResponse({
    status: 200,
    description: 'Receipts retrieved successfully',
  })
  async findUserReceipts(@Req() req, @Query() query: QueryCashReceiptsDto) {
    const userId = req.user.id;
    const { receipts, total } = await this.cashReceiptsService.findUserReceipts(
      userId,
      query,
    );

    return {
      success: true,
      data: receipts.map((receipt) => ({
        id: receipt.id,
        receiptCode: receipt.receiptCode,
        restaurantName: receipt.restaurant.name,
        productName: receipt.productName,
        quantity: receipt.quantity,
        totalAmount: receipt.totalAmount,
        status: receipt.status,
        expiresAt: receipt.expiresAt,
        validatedAt: receipt.validatedAt,
        createdAt: receipt.createdAt,
      })),
      meta: {
        total,
        limit: query.limit,
        skip: query.skip,
      },
    };
  }

  /**
   * Get receipt by ID
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get receipt by ID' })
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    const receipt = await this.cashReceiptsService.findByCode(id);

    // Ensure user owns this receipt
    if (receipt.userId !== userId) {
      return {
        success: false,
        message: 'Receipt not found',
      };
    }

    return {
      success: true,
      data: {
        id: receipt.id,
        receiptCode: receipt.receiptCode,
        orderId: receipt.orderId,
        restaurantId: receipt.restaurantId,
        restaurantName: receipt.restaurant.name,
        restaurantAddress: receipt.restaurant.address,
        productName: receipt.productName,
        quantity: receipt.quantity,
        unitPrice: receipt.unitPrice,
        subtotal: receipt.subtotal,
        discount: receipt.discount,
        totalAmount: receipt.totalAmount,
        status: receipt.status,
        expiresAt: receipt.expiresAt,
        validatedAt: receipt.validatedAt,
        validatedBy: receipt.validatedBy,
        qrCodeData: receipt.qrCodeData,
        notes: receipt.notes,
        createdAt: receipt.createdAt,
      },
    };
  }

  /**
   * Download receipt PDF
   */
  @Get(':id/pdf')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Download receipt as PDF' })
  @ApiResponse({
    status: 200,
    description: 'PDF generated successfully',
  })
  async downloadPDF(
    @Param('id') id: string,
    @Req() req,
    @Res() res: Response,
  ) {
    const userId = req.user.id;
    const pdfBuffer = await this.cashReceiptsService.getReceiptPDF(id, userId);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=receipt-${id}.pdf`,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  /**
   * Validate receipt (for restaurant staff)
   * This endpoint should be protected with additional authorization
   */
  @Patch(':code/validate')
  @ApiOperation({ summary: 'Validate a cash receipt (staff only)' })
  @ApiResponse({
    status: 200,
    description: 'Receipt validated successfully',
  })
  async validate(
    @Param('code') code: string,
    @Body() validateDto: ValidateCashReceiptDto,
  ) {
    const receipt = await this.cashReceiptsService.validate(code, validateDto);

    return {
      success: true,
      message: 'Receipt validated successfully',
      data: {
        id: receipt.id,
        receiptCode: receipt.receiptCode,
        productName: receipt.productName,
        totalAmount: receipt.totalAmount,
        status: receipt.status,
        validatedAt: receipt.validatedAt,
        validatedBy: receipt.validatedBy,
      },
    };
  }

  /**
   * Check receipt status by code (public endpoint for quick validation)
   */
  @Get('check/:code')
  @ApiOperation({ summary: 'Check receipt status by code' })
  async checkByCode(@Param('code') code: string) {
    const receipt = await this.cashReceiptsService.findByCode(code);

    return {
      success: true,
      data: {
        receiptCode: receipt.receiptCode,
        status: receipt.status,
        isExpired: receipt.isExpired(),
        canBeValidated: receipt.canBeValidated(),
        restaurantName: receipt.restaurant.name,
        productName: receipt.productName,
        totalAmount: receipt.totalAmount,
        expiresAt: receipt.expiresAt,
      },
    };
  }

  /**
   * Cancel a receipt
   */
  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel a pending receipt' })
  async cancel(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    const receipt = await this.cashReceiptsService.cancel(id, userId);

    return {
      success: true,
      message: 'Receipt cancelled successfully',
      data: {
        id: receipt.id,
        receiptCode: receipt.receiptCode,
        status: receipt.status,
      },
    };
  }
}