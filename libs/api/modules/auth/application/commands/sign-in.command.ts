import { Command } from '@nestjs/cqrs';
import { AuthResult, BarberFullEntity, CustomerEntity } from '@barbershop-app/api/auth/domain';

export class SignInCommand extends Command<AuthResult> {
  constructor(
    public readonly payload: CustomerEntity | BarberFullEntity
  ) {
    super();
  }
}
