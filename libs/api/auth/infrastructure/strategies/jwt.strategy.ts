import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@barbershop-app/core/domain';
import { JwtPayload } from '@barbershop-app/types';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepo: UserRepository) {
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

  async validate(payload: JwtPayload & { iat?: number, exp?: number }) {
    const user = await this.userRepo.findByEmail(payload.email);
    if(!user) throw new UnauthorizedException('User does not exist');

    const { iat: _iat, exp: _exp, ...rest } = payload;

    return rest;
  }
}
