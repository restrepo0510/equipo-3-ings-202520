// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../auth/user.entity';
import { Restaurant } from '../restaurants/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Restaurant]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}