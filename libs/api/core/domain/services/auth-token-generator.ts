import { UserDto } from '@barbershop-app/shared/types';

export abstract class AuthTokenGenerator {
  abstract sign(payload: UserDto): string;
}
