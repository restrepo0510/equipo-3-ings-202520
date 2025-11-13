// src/cash-receipts/cash-receipts.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashReceipt, CashReceiptStatus } from './entities/cash-receipt.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import {
  CreateCashReceiptDto,
  ValidateCashReceiptDto,
  QueryCashReceiptsDto,
} from './dto/cash-receipt.dto';
import * as crypto from 'crypto';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';

@Injectable()
export class CashReceiptsService {
  constructor(
    @InjectRepository(CashReceipt)
    private readonly receiptRepository: Repository<CashReceipt>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  /**
   * Generate unique receipt code
   * Format: CR-XXXXXXXX (CR = Cash Receipt)
   */
  private generateReceiptCode(): string {
    const randomString = crypto
      .randomBytes(4)
      .toString('hex')
      .toUpperCase();
    return `CR-${randomString}`;
  }

  /**
   * Calculate expiration date
   * Default: 24 hours from creation
   */
  private calculateExpirationDate(hours: number = 24): Date {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + hours);
    return expiresAt;
  }

  /**
   * Generate QR Code for receipt
   */
  private async generateQRCode(receiptCode: string): Promise<string> {
    try {
      // QR contains the receipt code for easy scanning
      const qrData = await QRCode.toDataURL(receiptCode, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
        margin: 2,
      });
      return qrData;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new InternalServerErrorException('Failed to generate QR code');
    }
  }

  /**
   * Generate PDF receipt
   */
  private async generatePDF(receipt: CashReceipt): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header
        doc
          .fontSize(24)
          .font('Helvetica-Bold')
          .text('RECIBO DE PAGO EN EFECTIVO', { align: 'center' })
          .moveDown();

        // Receipt Code (Large)
        doc
          .fontSize(20)
          .font('Helvetica-Bold')
          .fillColor('#1B5E20')
          .text(receipt.receiptCode, { align: 'center' })
          .fillColor('#000000')
          .moveDown();

        // QR Code
        if (receipt.qrCodeData) {
          const qrImage = receipt.qrCodeData.split(',')[1]; // Remove data:image/png;base64,
          doc.image(Buffer.from(qrImage, 'base64'), {
            fit: [150, 150],
            align: 'center',
          });
          doc.moveDown();
        }

        // Divider
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

        // Restaurant Info
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .text('Restaurante:', { continued: true })
          .font('Helvetica')
          .text(` ${receipt.restaurant.name}`)
          .moveDown(0.5);

        doc
          .fontSize(12)
          .font('Helvetica')
          .text(`📍 ${receipt.restaurant.address}`)
          .moveDown();

        // Order Details
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .text('Detalles del Pedido:')
          .moveDown(0.5);

        doc
          .fontSize(12)
          .font('Helvetica')
          .text(`Producto: ${receipt.productName}`)
          .text(`Cantidad: ${receipt.quantity}`)
          .text(`Precio unitario: $${receipt.unitPrice.toLocaleString('es-CO')}`)
          .moveDown();

        // Pricing
        doc.fontSize(12).font('Helvetica');
        doc.text(`Subtotal: $${receipt.subtotal.toLocaleString('es-CO')}`, {
          align: 'right',
        });
        
        if (receipt.discount > 0) {
          doc
            .fillColor('#27AE60')
            .text(`Descuento: -$${receipt.discount.toLocaleString('es-CO')}`, {
              align: 'right',
            })
            .fillColor('#000000');
        }

        doc.moveDown(0.5);
        doc
          .fontSize(16)
          .font('Helvetica-Bold')
          .text(`TOTAL: $${receipt.totalAmount.toLocaleString('es-CO')}`, {
            align: 'right',
          })
          .moveDown();

        // Divider
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

        // Instructions
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('#E74C3C')
          .text('INSTRUCCIONES:', { align: 'center' })
          .fillColor('#000000')
          .moveDown(0.5);

        doc
          .fontSize(10)
          .font('Helvetica')
          .text('1. Presenta este recibo en el restaurante', { align: 'left' })
          .text('2. Realiza el pago en efectivo por el monto total')
          .text('3. El personal escaneará el código QR o ingresará el código manualmente')
          .text('4. Recibirás tu pedido una vez validado el pago')
          .moveDown();

        // Expiration Warning
        doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .fillColor('#E74C3C')
          .text(
            `⚠️ Este recibo expira el: ${receipt.expiresAt.toLocaleString('es-CO')}`,
            { align: 'center' }
          )
          .fillColor('#000000')
          .moveDown();

        // Footer
        doc
          .fontSize(8)
          .font('Helvetica')
          .text('Este es un comprobante de reserva de pedido', {
            align: 'center',
          })
          .text('El pago debe realizarse en el local', { align: 'center' })
          .text(`Fecha de emisión: ${receipt.createdAt.toLocaleString('es-CO')}`, {
            align: 'center',
          });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create a new cash receipt
   */
  async create(
    userId: string,
    createDto: CreateCashReceiptDto,
  ): Promise<CashReceipt> {
    // Validate restaurant exists
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createDto.restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // Generate unique receipt code
    let receiptCode = this.generateReceiptCode();
    let codeExists = await this.receiptRepository.findOne({
      where: { receiptCode },
    });

    // Ensure code is unique
    while (codeExists) {
      receiptCode = this.generateReceiptCode();
      codeExists = await this.receiptRepository.findOne({
        where: { receiptCode },
      });
    }

    // Generate QR code
    const qrCodeData = await this.generateQRCode(receiptCode);

    // Create receipt
    const receipt = this.receiptRepository.create({
      receiptCode,
      orderId: createDto.orderId,
      userId,
      restaurantId: createDto.restaurantId,
      productId: createDto.productId,
      productName: createDto.productName,
      quantity: createDto.quantity,
      unitPrice: createDto.unitPrice,
      subtotal: createDto.subtotal,
      discount: createDto.discount || 0,
      totalAmount: createDto.totalAmount,
      status: CashReceiptStatus.PENDING,
      expiresAt: this.calculateExpirationDate(),
      qrCodeData,
      notes: createDto.notes,
    });

    const savedReceipt = await this.receiptRepository.save(receipt);

    // Load relations for PDF generation
    const receiptWithRelations = await this.receiptRepository.findOne({
      where: { id: savedReceipt.id },
      relations: ['restaurant', 'user'],
    });

    if (!receiptWithRelations) {
      throw new InternalServerErrorException('Failed to retrieve created receipt');
    }

    return receiptWithRelations;
  }

  /**
   * Get receipt PDF
   */
  async getReceiptPDF(receiptId: string, userId: string): Promise<Buffer> {
    const receipt = await this.receiptRepository.findOne({
      where: { id: receiptId, userId },
      relations: ['restaurant', 'user'],
    });

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    return this.generatePDF(receipt);
  }

  /**
   * Validate a receipt (used by restaurant staff)
   */
  async validate(
    receiptCode: string,
    validateDto: ValidateCashReceiptDto,
  ): Promise<CashReceipt> {
    const receipt = await this.receiptRepository.findOne({
      where: { receiptCode },
      relations: ['restaurant', 'user'],
    });

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    if (!receipt.canBeValidated()) {
      throw new BadRequestException(
        `Receipt cannot be validated. Status: ${receipt.status}, Expired: ${receipt.isExpired()}`,
      );
    }

    receipt.status = CashReceiptStatus.VALIDATED;
    receipt.validatedAt = new Date();
    receipt.validatedBy = validateDto.validatedBy;
    
    if (validateDto.notes) {
      receipt.notes = validateDto.notes;
    }

    return this.receiptRepository.save(receipt);
  }

  /**
   * Get user's receipts
   */
  async findUserReceipts(
    userId: string,
    query: QueryCashReceiptsDto,
  ): Promise<{ receipts: CashReceipt[]; total: number }> {
    const queryBuilder = this.receiptRepository
      .createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.restaurant', 'restaurant')
      .where('receipt.userId = :userId', { userId });

    if (query.status) {
      queryBuilder.andWhere('receipt.status = :status', { status: query.status });
    }

    if (query.restaurantId) {
      queryBuilder.andWhere('receipt.restaurantId = :restaurantId', {
        restaurantId: query.restaurantId,
      });
    }

    const total = await queryBuilder.getCount();
    const receipts = await queryBuilder
      .orderBy('receipt.createdAt', 'DESC')
      .skip(query.skip)
      .take(query.limit)
      .getMany();

    return { receipts, total };
  }

  /**
   * Get receipt by code (for validation)
   */
  async findByCode(receiptCode: string): Promise<CashReceipt> {
    const receipt = await this.receiptRepository.findOne({
      where: { receiptCode },
      relations: ['restaurant', 'user', 'product'],
    });

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    return receipt;
  }

  /**
   * Cancel a receipt
   */
  async cancel(receiptId: string, userId: string): Promise<CashReceipt> {
    const receipt = await this.receiptRepository.findOne({
      where: { id: receiptId, userId },
    });

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    if (receipt.status !== CashReceiptStatus.PENDING) {
      throw new BadRequestException(
        'Only pending receipts can be cancelled',
      );
    }

    receipt.status = CashReceiptStatus.CANCELLED;
    return this.receiptRepository.save(receipt);
  }
}