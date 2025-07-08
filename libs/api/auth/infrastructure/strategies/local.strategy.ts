import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PasswordHelper, PasswordRepository, UserMapper, CustomerRepository } from '@barbershop-app/api/core/domain';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private passwordRepo: PasswordRepository,
    private userRepo: CustomerRepository,
    private passwordHelper: PasswordHelper
    ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const bd_password = await this.passwordRepo.getHashedPasswordByUserEmail(email);

    if (!bd_password || !await this.passwordHelper.checkPassword(password, bd_password))
      throw new UnauthorizedException('Incorrect email or password');

    const userEntity = await this.userRepo.findByEmail(email);
    if(!userEntity)
      throw new UnauthorizedException('Incorrect email or password');

    return UserMapper.toDto(userEntity);
  }
}
