import {
  BarbershopDto,
  BarberSummaryDto,
  ServiceDto, TimeSlotDto
} from '@barbershop-app/shared/domain';
import { hasEnoughConsecutiveSlots } from './booking-flow.helpers';


export function filterData(
  barbershops: BarbershopDto[],
  barbers: BarberSummaryDto[],
  services: ServiceDto[],
  timeSlotsByDate: TimeSlotDto[],
  selectedBarbershopId: number | null,
  selectedBarberId: number | null,
  selectedServiceId: number | null,
  selectedTime: string | null
) {
  let filteredBarbershops = [...barbershops];
  let filteredBarbers = [...barbers];
  let filteredServices = [...services];
  let filteredTimeSlots = [...timeSlotsByDate];

  console.log('slots before filtering', filteredTimeSlots)

  if (selectedBarbershopId) {
    console.log('barbershop selected')
    filteredBarbers = filteredBarbers.filter(
      b => b.barbershopId === selectedBarbershopId
    );
    const availableBarberIds = filteredBarbers.map(b => b.id);

    const availableServiceIds = [... new Set(filteredBarbers.flatMap(b => b.serviceIds))];
    filteredServices = filteredServices.filter(s => availableServiceIds.includes(s.id));

    const minServiceDuration = Math.min(...filteredServices.map(s => s.duration));
    filteredTimeSlots = filteredTimeSlots.filter(ts => availableBarberIds.includes(ts.barberId));
    filteredTimeSlots = filteredTimeSlots.filter(ts => hasEnoughConsecutiveSlots(ts.startTime, filteredTimeSlots, minServiceDuration, availableBarberIds));
  }

  if (selectedBarberId) {
    console.log('barber selected')
    const barber = filteredBarbers.find(b => b.id === selectedBarberId);
    if (barber) {
      const availableServiceIds = barber.serviceIds;
      filteredServices = filteredServices.filter(s => availableServiceIds.includes(s.id));

      const minServiceDuration = Math.min(...filteredServices.map(s => s.duration));
      filteredTimeSlots = filteredTimeSlots.filter(ts => ts.barberId === barber.id);
      filteredTimeSlots = filteredTimeSlots.filter(ts => hasEnoughConsecutiveSlots(ts.startTime, filteredTimeSlots, minServiceDuration, [selectedBarberId]));
    }
  }

  if (selectedServiceId) {
    console.log('service selected')
    filteredBarbers = filteredBarbers.filter(b => b.serviceIds.includes(selectedServiceId));
    const availableBarberIds = filteredBarbers.map(b => b.id);

    const availableBarbershopIds = new Set(filteredBarbers.map(b => b.barbershopId));
    filteredBarbershops = filteredBarbershops.filter(bbshop => availableBarbershopIds.has(bbshop.id));

    const serviceDuration = filteredServices.find(s => s.id === selectedServiceId)?.duration;
    if (serviceDuration) {
      filteredTimeSlots = filteredTimeSlots.filter(ts => availableBarberIds.includes(ts.barberId));
      filteredTimeSlots = filteredTimeSlots.filter(ts => hasEnoughConsecutiveSlots(ts.startTime, filteredTimeSlots, serviceDuration, availableBarberIds));
    }
  }

  if (selectedTime) {
    console.log('time selected')
    filteredServices = filteredServices.filter(s => {
      const availableBarberIds = filteredBarbers.filter(b => b.serviceIds.includes(s.id)).map(b => b.id);
      return hasEnoughConsecutiveSlots(new Date(selectedTime), filteredTimeSlots, s.duration, availableBarberIds);
    })

    const availableServiceIds = filteredServices.map(s => s.id);
    filteredBarbers = filteredBarbers.filter(b =>
      b.serviceIds.some(id => availableServiceIds.includes(id))
    );

    const availableBarbershopIds = filteredBarbers.map(b => b.barbershopId);
    filteredBarbershops = filteredBarbershops.filter(bbshop => availableBarbershopIds.includes(bbshop.id));
  }

  console.log('slots after filtering', filteredTimeSlots)

  return {
    filteredBarbershops,
    filteredBarbers,
    filteredServices,
    filteredTimeSlots
  }
}

// export function filterBarbershops(
//   barbershops: BarbershopDto[],
//   barbers: BarberSummaryDto[],
//   timeSlotsByDate: TimeSlotDto[],
//   selectedServiceId: number | null,
//   selectedTime: Date
// ): BarbershopDto[] {
//   let filtered = [...barbershops];
//
//   if (selectedServiceId) {
//     const availableBarbers = barbers.filter(barber => barber.serviceIds.includes(selectedServiceId));
//     const availableBarbershopIds = new Set(availableBarbers.map(b => b.barbershopId));
//     filtered = filtered.filter(bbshop => availableBarbershopIds.has(bbshop.id));
//   }
//
//   if (selectedTime) {
//     const timeSlotsByTime = timeSlotsByDate.filter(ts => ts.startTime === selectedTime);
//     if (timeSlotsByTime) {
//       const selectedTime = timeSlot.startTime;
//       const availableBarberIds = timeSlots.filter(ts => ts.startTime === selectedTime).map(ts => ts.barberId);
//       const availableBarbers = barbers.filter(b => availableBarberIds.includes(b.id));
//       const availableBarbershopIds = new Set(availableBarbers.map(b => b.barbershopId));
//       filtered = filtered.filter(bbshop => availableBarbershopIds.has(bbshop.id));
//     }
//   }
//
//   return filtered
// }
//
// export function filterBarbers(
//   barbers: BarberSummaryDto[],
//   timeSlots: TimeSlotDto[],
//   selectedServiceId: number | null,
//   selectedBarbershopId: number | null,
//   selectedTimeSlotId: number | null
// ): BarberSummaryDto[] {
//   let filtered = [...barbers];
//
//   if (selectedServiceId) {
//     filtered = filtered.filter((barber) =>
//       barber.serviceIds.includes(selectedServiceId)
//     );
//   }
//
//   if (selectedBarbershopId) {
//     filtered = filtered.filter(
//       (barber) => barber.barbershopId === selectedBarbershopId
//     );
//   }
//
//   if (selectedTimeSlotId) {
//     const timeSlot = timeSlots.find(ts => ts.id === selectedTimeSlotId);
//     if (timeSlot) {
//       const selectedTime = timeSlot.startTime;
//       const availableBarberIds = timeSlots.filter(ts => ts.startTime === selectedTime).map(ts => ts.barberId)
//       filtered = filtered.filter(b => availableBarberIds.includes(b.id))
//     }
//   }
//
//   return filtered;
// }
//
// export function filterServices(
//   services: ServiceDto[],
//   barbers: BarberSummaryDto[],
//   selectedBarberId: number | null,
//   selectedBarbershopId: number | null
// ): ServiceDto[] {
//   if (!selectedBarberId && selectedBarbershopId) {
//     const availableBarbers = barbers.filter(barber => barber.barbershopId === selectedBarbershopId);
//     const availableServiceIds = [... new Set(availableBarbers.flatMap(barber => barber.serviceIds))];
//     return services.filter((service) =>
//       availableServiceIds.includes(service.id)
//     );
//   }
//
//   if(selectedBarberId) {
//     const barber = barbers.find(barber => barber.id === selectedBarberId);
//     if(!barber) {
//       return services;
//     }
//
//     const barberServiceIds = barber.serviceIds;
//     return services.filter(service => barberServiceIds.includes(service.id));
//   }
//
//   return services;
// }
//
// export function filterTimeSlots(
//   services: ServiceDto[],
//   barbers: BarberSummaryDto[],
//   selectedBarberId: number | null,
//   selectedServiceId: number | null,
// ): TimeSlotDto[] {
//   if(!selectedBarberId && !selectedServiceId) {
//     return [];
//   }
//
//   return [];
// }
