import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenGenerator } from '@barbershop-app/core/domain';
import { JwtPayload } from '@barbershop-app/types';

@Injectable()
export class JwtAuthTokenGenerator implements AuthTokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
