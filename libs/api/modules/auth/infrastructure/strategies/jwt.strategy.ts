import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@barbershop-app/api/auth/domain';
import { JwtPayload } from '@barbershop-app/api/shared/auth';


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

  async validate(payload: JwtPayload) {
    const userEntity = await this.userRepo.findUserByEmail(payload.email);
    if(!userEntity) throw new UnauthorizedException('User does not exist');

    return userEntity;
  }
}
