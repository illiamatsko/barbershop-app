import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserMapper, UserRepository } from '@barbershop-app/api/auth/domain';
import { UserDto } from '@barbershop-app/shared/types';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    const secret = process.env['JWT_SECRET'];
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }

  async validate(payload: UserDto) {
    const userEntity = await this.userRepo.findByEmail(payload.email);
    if(!userEntity) throw new UnauthorizedException('User does not exist');

    return UserMapper.toDto(userEntity);
  }
}
