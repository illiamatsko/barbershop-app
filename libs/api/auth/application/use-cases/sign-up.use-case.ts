import { AuthResult, CreateUserDto, JwtPayload } from '@barbershop-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthTokenGenerator, PasswordHelper, UserRepository } from '@barbershop-app/core/domain';


@Injectable()
export class SignUpUseCase {
  constructor(
    private userRepo: UserRepository,
    private tokenGenerator: AuthTokenGenerator,
    private passwordHelper: PasswordHelper
    ) {}

  async execute(createUserDto: CreateUserDto): Promise<AuthResult> {
    if(await this.userRepo.findByEmail(createUserDto.email)) throw new BadRequestException('Email already exists')

    createUserDto.password = await this.passwordHelper.hashPassword(createUserDto.password);
    const user: JwtPayload = await this.userRepo.create(createUserDto);

    return { payload: user, token: await this.tokenGenerator.sign(user) };
  }
}
