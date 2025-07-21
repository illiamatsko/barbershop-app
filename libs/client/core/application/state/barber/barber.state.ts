import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export interface BarberState {
  barbers: BarberSummaryDto[]
}

export const initialBarberState: BarberState = {
  barbers: []
}
