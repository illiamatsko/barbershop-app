import { BarberState } from './barber.state';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export function setBarbers(state: BarberState, barbers: BarberSummaryDto[]): BarberState {
  return {
    ...state,
    barbers
  };
}


export function setBarberServicesIds(
  state: BarberState,
  servicesIds: Record<number, number[]>
): BarberState {
  return {
    ...state,
    servicesByBarberId: {
      ...state.servicesByBarberId,
      ...servicesIds,
    },
  };
}

