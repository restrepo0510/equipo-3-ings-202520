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

  async addFavorite(userId: string, productId: string): Promise<Favorite> {
    // Check if already exists
    const existing = await this.favoritesRepository.findOne({
      where: { 
        user: { id: userId },
        product: { id: productId }
      },
    });

    if (existing) {
      throw new ConflictException('Product already in favorites');
    }

    const favorite = this.favoritesRepository.create({
      user: { id: userId },
      product: { id: productId },
    });

    return this.favoritesRepository.save(favorite);
  }

  async removeFavorite(userId: string, productId: string): Promise<void> {
    const result = await this.favoritesRepository.delete({
      user: { id: userId },
      product: { id: productId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      where: { user: { id: userId } },
      relations: ['product', 'product.restaurant'],
      order: { createdAt: 'DESC' },
    });
  }

  async isFavorite(userId: string, productId: string): Promise<boolean> {
    const count = await this.favoritesRepository.count({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });
    return count > 0;
  }
}