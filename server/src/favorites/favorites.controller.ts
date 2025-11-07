import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':productId')
  addFavorite(@Param('productId') productId: string, @Request() req) {
    return this.favoritesService.addFavorite(req.user.id, productId);
  }

  @Delete(':productId')
  removeFavorite(@Param('productId') productId: string, @Request() req) {
    return this.favoritesService.removeFavorite(req.user.id, productId);
  }

  @Get()
  getUserFavorites(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.id);
  }

  @Get('check/:productId')
  isFavorite(@Param('productId') productId: string, @Request() req) {
    return this.favoritesService.isFavorite(req.user.id, productId);
  }
}