import { BadRequestException } from '@nestjs/common';
import { AuthTokenGenerator, PasswordHelper, UserRepository, UserMapper } from '@barbershop-app/api/core/domain';
import { AuthResult } from '../interfaces/auth-result.interface';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from '../commands/sign-up.command';


@CommandHandler(SignUpCommand)
export class SignUpUseCase implements ICommandHandler<SignUpCommand> {
  constructor(
    private userRepo: UserRepository,
    private tokenGenerator: AuthTokenGenerator,
    private passwordHelper: PasswordHelper
    ) {}

  async execute(command: SignUpCommand): Promise<AuthResult> {
    const payload = command.signUpPayload;

    if(await this.userRepo.findByEmail(payload.email)) throw new BadRequestException('Email already exists')

    payload.password = await this.passwordHelper.hashPassword(payload.password);
    const userEntity = await this.userRepo.create(payload);
    const userDto = UserMapper.toDto(userEntity);
    const jwtPayload = UserMapper.toJwtPayload(userEntity);

    return { payload: userDto, token: this.tokenGenerator.sign(jwtPayload) };
  }
}
