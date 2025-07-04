import { UserDto } from '@barbershop-app/shared/types';

export interface AuthResult {
  payload: UserDto;
  token: string;
}
