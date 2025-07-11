import { Command } from '@nestjs/cqrs';
import { SignUpPayload } from '../payloads/sign-up.payload';
import { AuthResult } from '../types/auth-result.interface';

export class SignUpCommand extends Command<AuthResult> {
  constructor(
    public readonly signUpPayload: SignUpPayload
  ) {
    super();
  }
}
