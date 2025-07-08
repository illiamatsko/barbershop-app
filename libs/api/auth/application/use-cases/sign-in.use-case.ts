import {
  AuthTokenGenerator,
  UserMapper,
  CustomerRepository,
} from '@barbershop-app/api/core/domain';
import { UnauthorizedException } from '@nestjs/common';
import { AuthResult } from '../types/auth-result.interface';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '../commands/sign-in.command';

@CommandHandler(SignInCommand)
export class SignInUseCase implements ICommandHandler<SignInCommand> {
  constructor(
    private userRepo: CustomerRepository,
    private tokenGenerator: AuthTokenGenerator
  ) {}

  async execute(command: SignInCommand): Promise<AuthResult> {
    const userEntity = await this.userRepo.findByEmail(
      command.signInPayload.email
    );
    if (!userEntity) throw new UnauthorizedException();

    const userDto = UserMapper.toDto(userEntity);
    const jwtPayload = UserMapper.toJwtPayload(userEntity);
    return { payload: userDto, token: this.tokenGenerator.sign(jwtPayload) };
  }
}
