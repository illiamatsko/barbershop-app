import {
  BarbershopDto,
  BarberSummaryDto,
  ServiceDto, TimeSlotDto
} from '@barbershop-app/shared/domain';

export function filterBarbers(
  barbers: BarberSummaryDto[],
  selectedServiceId: number | null,
  selectedBarbershopId: number | null
): BarberSummaryDto[] {
  let filtered = barbers;

  // console.log(2, filtered)

  if (selectedServiceId) {
    filtered = filtered.filter((barber) =>
      barber.serviceIds.includes(selectedServiceId)
    );
  }

  if (selectedBarbershopId) {
    filtered = filtered.filter(
      (barber) => barber.barbershopId === selectedBarbershopId
    );
  }
  // console.log(3, filtered)
  return filtered;
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

export function filterServices(
  services: ServiceDto[],
  barbers: BarberSummaryDto[],
  selectedBarberId: number | null,
  selectedBarbershopId: number | null
): ServiceDto[] {
  if (!selectedBarberId && selectedBarbershopId) {
    const availableBarbers = barbers.filter(barber => barber.barbershopId === selectedBarbershopId);
    const availableServiceIds = [... new Set(availableBarbers.flatMap(barber => barber.serviceIds))];
    return services.filter((service) =>
      availableServiceIds.includes(service.id)
    );
  }

  if(selectedBarberId) {
    const barber = barbers.find(barber => barber.id === selectedBarberId);
    if(!barber) {
      return services;
    }

    const barberServiceIds = barber.serviceIds;
    return services.filter(service => barberServiceIds.includes(service.id));
  }

  return services;
}

export function filterTimeSlots(
  services: ServiceDto[],
  barbers: BarberSummaryDto[],
  selectedBarberId: number | null,
  selectedServiceId: number | null,
): TimeSlotDto[] {
  if(!selectedBarberId && !selectedServiceId) {
    return [];
  }

  return [];
}
