import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export interface BarberState {
  barbers: BarberSummaryDto[]
  servicesByBarberId: Record<number, number[]>
}

export const initialBarberState: BarberState = {
  barbers: [],
  servicesByBarberId: {}
};
