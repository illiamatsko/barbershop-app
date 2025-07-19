import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenGenerator } from '@barbershop-app/api/auth/domain';
import { JwtPayload } from '@barbershop-app/api/shared/auth';


@Injectable()
export class JwtAuthTokenGenerator implements AuthTokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
