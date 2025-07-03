import { AuthResult, JwtPayload } from '@barbershop-app/types';
import { AuthTokenGenerator } from '@barbershop-app/core/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInUseCase {
  constructor(private tokenGenerator: AuthTokenGenerator) {}

  async execute(user: JwtPayload): Promise<AuthResult> {
    return { payload: user, token: await this.tokenGenerator.sign(user) }
  }
}
