import { BarberFullDto, CustomerDto } from '@barbershop-app/shared/domain';

export interface AuthResult {
  user: CustomerDto | BarberFullDto;
  token: string;
}
