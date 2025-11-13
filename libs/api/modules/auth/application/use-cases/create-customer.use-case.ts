import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import {
  CustomerMapper,
  UserRepository,
  CustomerRepository,
  AuthResult,
  AuthTokenGenerator
} from '@barbershop-app/api/auth/domain';
import { UserMapper } from '@barbershop-app/api/auth/domain';


@CommandHandler(CreateCustomerCommand)
export class CreateCustomerUseCase
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly customerRepo: CustomerRepository,
    private readonly tokenGen: AuthTokenGenerator
  ) {}

  async execute({ payload }: CreateCustomerCommand): Promise<AuthResult> {
    const createUserPayload = CustomerMapper.toCreateUserPayload(payload);
    const user = await this.userRepo.create(createUserPayload);

    const createCustomerRecordPayload = CustomerMapper.toCreateCustomerRecordPayload(user.id);
    const customer = await this.customerRepo.create(createCustomerRecordPayload);

    const jwtPayload = UserMapper.toJwtPayload(user);
    return { user: CustomerMapper.toDto(customer), token: this.tokenGen.sign(jwtPayload) };
  }
}
