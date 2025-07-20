import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnauthorizedException } from '@nestjs/common';
import { SignInCommand } from '../commands/sign-in.command';
import { AuthResult, AuthTokenGenerator, UserMapper } from '@barbershop-app/api/auth/domain';
import { RoleStrategy } from '../role-strategies/role.strategy';
import { Inject } from '@nestjs/common';


@CommandHandler(SignInCommand)
export class SignInUseCase implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject('ROLE_STRATEGIES') private roleStrategies: RoleStrategy[],
    private tokenGenerator: AuthTokenGenerator,
  ) {}

  async execute(command: SignInCommand): Promise<AuthResult> {
    const userEntity = command.payload;
    if (!userEntity) throw new UnauthorizedException();

    const strategy = this.roleStrategies.find(s => s.canHandle(userEntity.role));
    if (!strategy) throw new UnauthorizedException();

    const userDto = await strategy.execute(userEntity.email);
    const jwtPayload = UserMapper.toJwtPayload(userEntity);

    return {
      user: userDto,
      token: this.tokenGenerator.sign(jwtPayload)
    };
  }
}
