import { UserDto } from '@barbershop-app/shared/types';
import { AuthTokenGenerator } from '@barbershop-app/core/domain';
import { Injectable } from '@nestjs/common';
import { AuthResult } from '../interfaces/auth-result.interface';
import { UserRepository } from '@barbershop-app/core/domain';
import { UserEntityToDto } from '@barbershop-app/core/domain';


@Injectable()
export class SignInUseCase {
  constructor(
    private userRepo: UserRepository,
    private tokenGenerator: AuthTokenGenerator) {}

  async execute(signInDto: UserDto): Promise<AuthResult> {
    const userEntity = await this.userRepo.findByEmail(signInDto.email)
    const userDto = UserEntityToDto(userEntity)

    return { payload: userDto, token: this.tokenGenerator.sign(userDto) }
  }
}
