import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    console.log('🔍 Validating JWT payload:', payload);
    
    const user = await this.userRepository.findOne({ 
      where: { id: payload.sub } 
    });
    
    if (!user) {
      console.error('❌ User not found for ID:', payload.sub);
      throw new UnauthorizedException('User not found');
    }
    
    console.log('✅ User validated:', user.email);
    return { id: user.id, email: user.email, role: user.role };
  }
}