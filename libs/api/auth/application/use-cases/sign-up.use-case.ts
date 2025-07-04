import { SignUpUserDto } from '@barbershop-app/shared/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthTokenGenerator, PasswordHelper, UserRepository } from '@barbershop-app/core/domain';
import { AuthResult } from '../interfaces/auth-result.interface';
import { UserEntityToDto } from '@barbershop-app/core/domain';


@Injectable()
export class SignUpUseCase {
  constructor(
    private userRepo: UserRepository,
    private tokenGenerator: AuthTokenGenerator,
    private passwordHelper: PasswordHelper
    ) {}

  async execute(createUserDto: SignUpUserDto): Promise<AuthResult> {
    if(await this.userRepo.findByEmail(createUserDto.email)) throw new BadRequestException('Email already exists')

    createUserDto.password = await this.passwordHelper.hashPassword(createUserDto.password);
    const userEntity = await this.userRepo.create(createUserDto);
    const userDto = UserEntityToDto(userEntity);

    return { payload: userDto, token: this.tokenGenerator.sign(userDto) };
  }
}
