import { BarberFullDto, CustomerDto } from '@barbershop-app/shared/types';

export interface AuthResult {
  user: CustomerDto | BarberFullDto;
  token: string;
}
