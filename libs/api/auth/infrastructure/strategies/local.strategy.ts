import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserUseCase } from '@barbershop-app/auth/application';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const res = await this.validateUserUseCase.execute(email, password);

    if(!res) throw new UnauthorizedException('Incorrect email or password')

    return res;
  }
}
