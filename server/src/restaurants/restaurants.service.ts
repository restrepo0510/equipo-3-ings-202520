// src/restaurants/restaurants.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { NearbyRestaurantsDto } from './dto/nearby-restaurants.dto';

export interface RestaurantWithDistance extends Restaurant {
  distance: number;
}

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async findNearby(nearbyDto: NearbyRestaurantsDto): Promise<RestaurantWithDistance[]> {
    const { latitude, longitude, radius = 10, limit = 20 } = nearbyDto;

    // Obtener todos los restaurantes activos
    const restaurants = await this.restaurantRepository.find({
      where: { isActive: true },
    });

    // Calcular distancia y filtrar por radio
    const restaurantsWithDistance = restaurants
      .map(restaurant => ({
        ...restaurant,
        distance: this.calculateDistance(
          latitude,
          longitude,
          Number(restaurant.latitude),
          Number(restaurant.longitude)
        ),
      }))
      .filter(restaurant => restaurant.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return restaurantsWithDistance;
  }

  // Fórmula de Haversine para calcular distancia entre dos puntos
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100; // Redondear a 2 decimales
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async update(id: string, updateData: Partial<CreateRestaurantDto>): Promise<Restaurant> {
    await this.restaurantRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.restaurantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
  }
}