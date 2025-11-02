import {
  BarbershopDto,
  BarberSummaryDto,
  ServiceDto, TimeSlotDto
} from '@barbershop-app/shared/domain';
import { getBarbersFromBarbershop, getIds, hasEnoughConsecutiveSlots } from './booking-flow.helpers';


export function filterData(
  barbershops: BarbershopDto[],
  barbers: BarberSummaryDto[],
  services: ServiceDto[],
  timeSlotsByDate: TimeSlotDto[],
  selectedBarbershopId: number | null,
  selectedBarberId: number | null,
  selectedServiceId: number | null,
  selectedTime: Date
) {
  let filteredBarbershops = [...barbershops];
  let filteredBarbers = [...barbers];
  let filteredServices = [...services];
  let filteredTimeSlots = [...timeSlotsByDate];

  const barber = filteredBarbers.find(b => b.id === selectedBarberId);
  const service = filteredServices.find(s => s.id === selectedServiceId);

  if (selectedBarbershopId) {
    filteredBarbers = getBarbersFromBarbershop(selectedBarbershopId, filteredBarbers);
    const availableBarberIds = getIds(filteredBarbers);

    const availableServiceIds = getServiceIdsFromBarbers(filteredBarbers);
    filteredServices = filterByIds(filteredServices, availableServiceIds);

    const minServiceDuration = getMinServiceDuration(filteredServices);
    filteredTimeSlots = filterTimeSlotsByBarberAndDuration(filteredTimeSlots, availableBarberIds, minServiceDuration);
  }

  if (barber) {
    const availableServiceIds = getServiceIdsFromBarbers([barber]);
    filteredServices = filterByIds(filteredServices, availableServiceIds);

    const minServiceDuration = getMinServiceDuration(filteredServices);
    filteredTimeSlots = filterTimeSlotsByBarberAndDuration(filteredTimeSlots, [barber.id], minServiceDuration);
  }

  if (service) {
    filteredBarbers = getBarbersByServices(filteredBarbers, [service.id]);
    const availableBarberIds = getIds(filteredBarbers);

    const availableBarbershopIds = [... new Set(filteredBarbers.map(b => b.barbershopId))];
    filteredBarbershops = filterByIds(filteredBarbershops, availableBarbershopIds)

    filteredTimeSlots = filterTimeSlotsByBarberAndDuration(filteredTimeSlots, availableBarberIds, service.duration);
  }

  if (selectedTime.toString() !== 'Invalid Date') {
    filteredServices = filteredServices.filter(s => {
      const availableBarberIds = getIds(getBarbersByServices(filteredBarbers, [s.id]));
      // console.log(selectedTime)
      return hasEnoughConsecutiveSlots(selectedTime, filteredTimeSlots, s.duration, availableBarberIds);
    })

    const availableServiceIds = getIds(filteredServices);
    filteredBarbers = getBarbersByServices(filteredBarbers, availableServiceIds);

    const availableBarbershopIds = filteredBarbers.map(b => b.barbershopId);
    filteredBarbershops = filterByIds(filteredBarbershops, availableBarbershopIds);
  }


  return {
    filteredBarbershops,
    filteredBarbers,
    filteredServices,
    filteredTimeSlots
  }
}


function filterByIds<T extends { id: number }>(arr: T[], ids: number[]) {
  return arr.filter(a => ids.includes(a.id));
}

function filterTimeSlotsByBarberAndDuration(timeSlots: TimeSlotDto[], barberIds: number[], duration: number) {
  timeSlots = timeSlots.filter(ts => barberIds.includes(ts.barberId));
  return timeSlots.filter(ts => hasEnoughConsecutiveSlots(ts.startTime, timeSlots, duration, barberIds));
}

function getBarbersByServices(barbers: BarberSummaryDto[], serviceIds: number[]) {
  return barbers.filter(b => serviceIds.some(id => b.serviceIds.includes(id)));
}

function getServiceIdsFromBarbers(barbers: BarberSummaryDto[]) {
  return [... new Set(barbers.flatMap(b => b.serviceIds))];
}

function getMinServiceDuration(services: ServiceDto[]) {
  return Math.min(...services.map(s => s.duration));
}
