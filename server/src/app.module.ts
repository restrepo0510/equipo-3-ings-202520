import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
<<<<<<< HEAD
import { PaymentsModule } from './payments/payments.module';
=======
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';

>>>>>>> 64ee6b084d5fc9ff8bafc65196de2d709652c996

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
<<<<<<< HEAD
    ProductsModule,
    PaymentsModule,
=======
    ReviewsModule,
    ProductsModule,
    FavoritesModule,
>>>>>>> 64ee6b084d5fc9ff8bafc65196de2d709652c996
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}