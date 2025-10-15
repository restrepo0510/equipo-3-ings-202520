// src/restaurants/dto/create-restaurant.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  openingTime?: string;

  @IsString()
  @IsOptional()
  closingTime?: string;
}

