import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnauthorizedException } from '@nestjs/common';
import { SignInCommand } from '../commands/sign-in.command';
import { AuthResult, AuthTokenGenerator, UserMapper, UserRepository } from '@barbershop-app/api/auth/domain';

@CommandHandler(SignInCommand)
export class SignInUseCase implements ICommandHandler<SignInCommand> {
  constructor(
    private userRepo: UserRepository,
    private tokenGenerator: AuthTokenGenerator
  ) {}

  async execute(command: SignInCommand): Promise<AuthResult> {
    const userEntity = await this.userRepo.findByEmail(
      command.signInPayload.email
    );
    if (!userEntity) throw new UnauthorizedException();

    const userDto = UserMapper.toDto(userEntity);
    const jwtPayload = UserMapper.toJwtPayload(userEntity);
    return { user: userDto, token: this.tokenGenerator.sign(jwtPayload) };
  }
}
