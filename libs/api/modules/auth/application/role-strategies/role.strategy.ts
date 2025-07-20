import { BarberFullDto, CustomerDto } from '@barbershop-app/shared/types';

export interface RoleStrategy {
  canHandle(role: string): boolean;
  execute(email: string): Promise<CustomerDto | BarberFullDto>;
}
