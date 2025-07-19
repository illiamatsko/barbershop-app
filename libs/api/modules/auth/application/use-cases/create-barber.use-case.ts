import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBarberCommand } from '../commands/create-barber.command';
import {
  BarberRepository,
  BarberMapper,
  UserRepository,
  AuthResult,
  UserMapper, AuthTokenGenerator
} from '@barbershop-app/api/auth/domain';


@CommandHandler(CreateBarberCommand)
export class CreateBarberUseCase
  implements ICommandHandler<CreateBarberCommand>
{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly barberRepo: BarberRepository,
    private readonly tokenGen: AuthTokenGenerator
  ) {}

  async execute({ payload }: CreateBarberCommand): Promise<AuthResult> {
    const createUserPayload = BarberMapper.toCreateUserPayload(payload);
    const user = await this.userRepo.create(createUserPayload);

    const createBarberRecordPayload = BarberMapper.toCreateBarberRecordPayload(
      payload,
      user.id
    );
    const barber = await this.barberRepo.createBarber(
      createBarberRecordPayload
    );

    const jwtPayload = UserMapper.toJwtPayload(user);
    return { user: BarberMapper.toFullDto(barber), token: this.tokenGen.sign(jwtPayload) };
  }
}
