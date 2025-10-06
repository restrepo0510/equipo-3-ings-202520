import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // POST /users
  @Post()
  async create(@Body() body: Partial<User>): Promise<User> {
    return await this.usersService.create(body);
  }
}
