// src/restaurants/restaurants.service.ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(RestaurantsService.name);

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.find();
    this.logger.log(`📋 Total restaurants in DB: ${restaurants.length}`);
    return restaurants;
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async findNearby(nearbyDto: NearbyRestaurantsDto): Promise<RestaurantWithDistance[]> {
    const { latitude, longitude, radius = 20, limit = 20 } = nearbyDto;

    this.logger.log(`🔍 Searching nearby restaurants:`);
    this.logger.log(`   📍 User location: (${latitude}, ${longitude})`);
    this.logger.log(`   📏 Radius: ${radius} km`);
    this.logger.log(`   🔢 Limit: ${limit}`);

    // Get all active restaurants
    const restaurants = await this.restaurantRepository.find({
      where: { isActive: true },
    });

    this.logger.log(`   ✅ Active restaurants found: ${restaurants.length}`);

    if (restaurants.length === 0) {
      this.logger.warn('   ⚠️  No active restaurants in database!');
      return [];
    }

    // Calculate distance and filter by radius
    const restaurantsWithDistance = restaurants
      .map(restaurant => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          Number(restaurant.latitude),
          Number(restaurant.longitude),
        );

        // Log each restaurant's distance
        this.logger.debug(
          `   📌 ${restaurant.name}: ${distance.toFixed(2)} km away`,
        );

        return {
          ...restaurant,
          distance,
        };
      })
      .filter(restaurant => {
        const withinRadius = restaurant.distance <= radius;
        if (!withinRadius) {
          this.logger.debug(
            `   ❌ ${restaurant.name} excluded (${restaurant.distance.toFixed(2)} km > ${radius} km)`,
          );
        }
        return withinRadius;
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    this.logger.log(`   🎯 Restaurants within ${radius}km: ${restaurantsWithDistance.length}`);

    return restaurantsWithDistance;
  }

  /**
   * Haversine formula to calculate distance between two points
   * @returns Distance in kilometers
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in kilometers
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

    return Math.round(distance * 100) / 100; // Round to 2 decimals
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async update(
    id: string,
    updateData: Partial<CreateRestaurantDto>,
  ): Promise<Restaurant> {
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