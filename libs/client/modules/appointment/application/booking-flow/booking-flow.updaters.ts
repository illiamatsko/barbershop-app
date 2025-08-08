import { BookingFlowState } from './booking-flow.state';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export function barberUpdater(
  state: BookingFlowState,
  barbers: BarberSummaryDto[],
  barberId: number
): BookingFlowState {
  const clickedOnSelected = state.barberId === barberId;

  if (clickedOnSelected) {
    return {
      ...state,
      barberId: null,
    };
  }

  const barber = barbers.find(b => b.id === barberId);
  if (!barber) return state;

  return {
    ...state,
    barberId: barberId,
    barbershopId: barber.barbershopId,
  };
}

export function barbershopUpdater(
  state: BookingFlowState,
  barbershopId: number
): BookingFlowState {
  const clickedOnSelected = state.barbershopId === barbershopId;

  if(clickedOnSelected) {
    return {
      ...state,
      barbershopId: null,
      barberId: null
    }
  } else {
    return {
      ...state,
      barbershopId: barbershopId,
      barberId: null
    }
  }
}

export function serviceUpdater(
  state: BookingFlowState,
  serviceId: number
): BookingFlowState {
  const clickedOnSelected = serviceId === state.serviceId;

  if(clickedOnSelected) {
    return {
      ...state,
      serviceId: null
    }
  } else {
    return {
      ...state,
      serviceId: serviceId
    }
  }
}
