// src/cash-receipts/cash-receipts.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashReceiptsController } from './cash-receipt.controller';
import { CashReceiptsService } from './cash-receipt.service';
import { CashReceipt } from './entities/cash-receipt.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { User } from '../auth/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CashReceipt,
      Restaurant,
      User,
      Product,
    ]),
  ],
  controllers: [CashReceiptsController],
  providers: [CashReceiptsService],
  exports: [CashReceiptsService],
})
export class CashReceiptsModule {}

