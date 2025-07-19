import { Command } from '@nestjs/cqrs';
import { UserDto } from '@barbershop-app/shared/types';
import { AuthResult } from '@barbershop-app/api/auth/domain';

export class SignInCommand extends Command<AuthResult> {
  constructor(
    public readonly signInPayload: UserDto
  ) {
    super();
  }
}
