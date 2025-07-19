import { UserDto } from '@barbershop-app/shared/types';

export interface AuthResult {
  user: UserDto;
  token: string;
}
