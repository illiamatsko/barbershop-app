import { Command } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { AuthResult } from '@barbershop-app/api/auth/domain';

export class CreateCustomerCommand extends Command<AuthResult> {
  constructor(
    public readonly payload: CreateCustomerDto
  ) {
    super();
  }
}
