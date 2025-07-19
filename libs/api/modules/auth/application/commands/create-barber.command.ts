import { Command } from '@nestjs/cqrs';
import { CreateBarberDto } from '../dtos/create-barber.dto';
import { AuthResult } from '@barbershop-app/api/auth/domain';

export class CreateBarberCommand extends Command<AuthResult> {
  constructor(
    public readonly payload: CreateBarberDto
  ) {
    super();
  }
}
