import { BarberState } from './barber.state';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export function setBarbers(state: BarberState, barbers: BarberSummaryDto[]): BarberState {
  return {
    ...state,
    barbers
  };
}

