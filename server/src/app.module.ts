import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; // Asegúrate de importar TypeOrmModuleOptions
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
        // 1. Definir la configuración base
        const config: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true, // ⚠️ Cambiar a false en producción
        };

        // 2. Leer la variable de entorno DB_SSL
        const useSsl = configService.get<string>('DB_SSL');

        // 3. Si DB_SSL es 'true' (como lo será en Render), añadir la configuración de SSL
        if (useSsl === 'true') {
          config.ssl = {
            rejectUnauthorized: false, // Requerido por Render
          };
        }

        // 4. Retornar la configuración completa
        return config;
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