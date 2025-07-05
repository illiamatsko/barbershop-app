import { UserDto } from '@barbershop-app/shared/types';
import { AuthTokenGenerator, UserMapper } from '@barbershop-app/api/core/domain';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResult } from '../interfaces/auth-result.interface';
import { UserRepository } from '@barbershop-app/api/core/domain';


@Injectable()
export class SignInUseCase {
  constructor(
    private userRepo: UserRepository,
    private tokenGenerator: AuthTokenGenerator) {}

  async execute(signInDto: UserDto): Promise<AuthResult> {
    const userEntity = await this.userRepo.findByEmail(signInDto.email)
    if(!userEntity) throw new UnauthorizedException();

    const userDto = UserMapper.toDto(userEntity);
    const jwtPayload = UserMapper.toJwtPayload(userEntity);
    return { payload: userDto, token: this.tokenGenerator.sign(jwtPayload) }
  }
}
