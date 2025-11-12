import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CashReceiptController } from './cash-receipt/cash-receipt.controller';
import { CashReceiptModule } from './cash-receipt/cash-receipt.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ Cambiar a false en producción
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    ProductsModule,
    PaymentsModule,
    ReviewsModule,
    ProductsModule,
    FavoritesModule,
    CashReceiptModule,
  ],
  providers: [],
  controllers: [CashReceiptController],
})
export class AppModule {}