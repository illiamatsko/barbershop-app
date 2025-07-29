import { BookingFlowState } from './booking-flow.state';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export function barberUpdater(
  state: BookingFlowState,
  barbers: BarberSummaryDto[],
  barberId: number
): BookingFlowState {
  const clickedOnSelected = state.selectedBarberId === barberId;

  if (clickedOnSelected) {
    return {
      ...state,
      selectedBarberId: null,
    };
  }

  const barber = barbers.find(b => b.id === barberId);
  if (!barber) return state;

  return {
    ...state,
    selectedBarberId: barberId,
    selectedBarbershopId: barber.barbershopId,
  };
}

export function barbershopUpdater(
  state: BookingFlowState,
  barbershopId: number
): BookingFlowState {
  const clickedOnSelected = state.selectedBarbershopId === barbershopId;

  if(clickedOnSelected) {
    return {
      ...state,
      selectedBarbershopId: null,
      selectedBarberId: null
    }
  } else {
    return {
      ...state,
      selectedBarbershopId: barbershopId,
      selectedBarberId: null
    }
  }
}

export function serviceUpdater(
  state: BookingFlowState,
  serviceId: number
): BookingFlowState {
  const clickedOnSelected = serviceId === state.selectedServiceId;

  if(clickedOnSelected) {
    return {
      ...state,
      selectedServiceId: null
    }
  } else {
    return {
      ...state,
      selectedServiceId: serviceId
    }
  }
}
