import { BarbershopState } from './barbershop.state';
import { BarbershopDto } from '@barbershop-app/shared/domain';

export function setBarbershops(state: BarbershopState, barbershops: BarbershopDto[]): BarbershopState {
  return {
    ...state,
    barbershops
  };
}

export function setBarbershopBarberIds(
  state: BarbershopState,
  barberIds: Record<number, number[]>
): BarbershopState {
  return {
    ...state,
    barbersByBarbershopId: {
      ...state.barbersByBarbershopId,
      ...barberIds,
    },
  };
}
