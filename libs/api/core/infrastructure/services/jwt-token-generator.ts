import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenGenerator } from '@barbershop-app/core/domain';
import { UserDto } from '@barbershop-app/shared/types';


@Injectable()
export class JwtAuthTokenGenerator implements AuthTokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: UserDto): string {
    return this.jwtService.sign(payload);
  }
}
