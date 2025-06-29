import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@barbershop-app/user';
import { JwtPayload } from '@barbershop-app/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload & { iat?: number, exp?: number }) {
    const user = await this.userRepo.findByEmail(payload.email);
    if(!user) throw new UnauthorizedException('User does not exist');

    const { iat: _iat, exp: _exp, ...rest } = payload;

    return rest;
  }
}
