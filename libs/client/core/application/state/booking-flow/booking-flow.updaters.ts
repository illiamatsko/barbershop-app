import { BookingFlowState } from './booking-flow.state';
import { BarbershopDto, BarberSummaryDto, ServiceDto } from '@barbershop-app/shared/domain';

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

export function filterBarbers(
  barbers: BarberSummaryDto[],
  selectedServiceId: number | null,
  selectedBarbershopId: number | null
): BarberSummaryDto[] {
  let filtered = barbers;

  if (selectedServiceId) {
    filtered = filtered.filter(barber => barber.serviceIds.includes(selectedServiceId));
  }

  if (selectedBarbershopId) {
    filtered = filtered.filter(barber => barber.barbershopId === selectedBarbershopId);
  }

  return filtered;
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

export function filterBarbershops(
  barbershops: BarbershopDto[],
  barbers: BarberSummaryDto[],
  selectedServiceId: number | null
): BarbershopDto[] {
  if (!selectedServiceId) {
    return barbershops;
  }

  const filteredBarbers = barbers.filter(barber => barber.serviceIds.includes(selectedServiceId));

  const availableBarbershopIds = [ ...new Set(filteredBarbers.map(b => b.barbershopId))];

  return barbershops.filter(shop => availableBarbershopIds.includes(shop.id));
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

export function filterServices(
  services: ServiceDto[],
  barbers: BarberSummaryDto[],
  selectedBarberId: number | null
): ServiceDto[] {
  if (!selectedBarberId) {
    return services;
  }

  const barber = barbers.find(barber => barber.id === selectedBarberId);
  if(!barber) {
    return services;
  }

  const barberServiceIds = barber.serviceIds;
  return services.filter(service => barberServiceIds.includes(service.id));
}
