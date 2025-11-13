import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // No necesitas TypeOrmModuleOptions aquí
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CashReceiptsController } from './cash-receipt/cash-receipt.controller';
import { CashReceiptsModule } from './cash-receipt/cash-receipt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // 1. Revisar si la variable DB_SSL está como 'true'
        const useSsl = configService.get<string>('DB_SSL') === 'true';

        // 2. Retornar la configuración completa en un solo objeto
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true, // ⚠️ Cambiar a false en producción
          
          // --- ESTA ES LA CORRECCIÓN ---
          // Usamos un "spread operator" condicional.
          // Si useSsl es true, añade el objeto 'ssl'.
          // Si es false, no añade nada.
          ...(useSsl && {
            ssl: {
              rejectUnauthorized: false, // Requerido por Render
            },
          }),
        };
      },
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
    CashReceiptsModule,
  ],
  providers: [],
  controllers: [CashReceiptsController],
})
export class AppModule {}