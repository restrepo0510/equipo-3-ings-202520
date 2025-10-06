import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Registro
  async register(data: { name: string; email: string; phone: string; password: string }) {
    const existing = await this.userRepository.findOne({ where: { email: data.email } });
    if (existing) {
      return { message: 'El usuario ya existe' };
    }

    const user = this.userRepository.create(data);
    await this.userRepository.save(user);

    return { message: 'Usuario registrado con éxito', user };
  }

  // Inicio de sesión
  async login(data: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { email: data.email, password: data.password },
    });

    if (!user) return { message: 'Credenciales incorrectas' };

    return { message: 'Inicio de sesión exitoso', user };
  }

  // Listado de usuarios
  async getAllUsers() {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'phone'], // excluye la contraseña
    });
  }
}
