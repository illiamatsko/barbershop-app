import { Command } from '@nestjs/cqrs';
import { UserDto } from '@barbershop-app/shared/types';
import { AuthResult } from '../types/auth-result.interface';

export class SignInCommand extends Command<AuthResult> {
  constructor(
    public readonly signInPayload: UserDto
  ) {
    super();
  }
}
