import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { JwtStrategy } from './jwt.strategy'; // ← AGREGAR

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Restaurant]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // ← AGREGAR
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // ← AGREGAR JwtStrategy
  exports: [AuthService, JwtStrategy, PassportModule], // ← AGREGAR exports
})
export class AuthModule {}