import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async addFavorite(userId: number, productId: string): Promise<Favorite> {
    // Check if already exists
    const existing = await this.favoritesRepository.findOne({
      where: { 
        userId: userId,
        productId: productId
      },
    });

    if (existing) {
      throw new ConflictException('Product already in favorites');
    }

    const favorite = this.favoritesRepository.create({
      userId,
      productId,
    });

    return this.favoritesRepository.save(favorite);
  }

  async removeFavorite(userId: number, productId: string): Promise<void> {
    const result = await this.favoritesRepository.delete({
      userId: userId,
      productId: productId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
  }

  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      where: { userId: userId },
      relations: ['product', 'product.restaurant'],
      order: { createdAt: 'DESC' },
    });
  }

  async isFavorite(userId: number, productId: string): Promise<boolean> {
    const count = await this.favoritesRepository.count({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    return count > 0;
  }
}