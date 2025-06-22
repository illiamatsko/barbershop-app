import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { UserRepository } from '@barbershop-app/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepo.findByEmail(payload.email);

    if(!user) throw new UnauthorizedException('User does not exist');

    return payload;
  }
}
