import { BarberSummaryDto } from '@barbershop-app/shared/types';

export interface BarberState {
  barbers: BarberSummaryDto[]
}

export const initialBarberState: BarberState = {
  barbers: []
}
