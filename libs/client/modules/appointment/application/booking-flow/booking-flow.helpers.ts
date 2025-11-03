import { BarberSummaryDto, TimeSlotDto } from '@barbershop-app/shared/domain';


export function hasEnoughConsecutiveSlots(
  requestedTime: Date,
  timesForDate: TimeSlotDto[],
  serviceDuration: number,
  barberIdsToCheck: number[]
): boolean {
  const endTime = new Date(requestedTime.getTime() + serviceDuration * 60_000);
  const requestedTimeMs = requestedTime.getTime();

  for (const bId of barberIdsToCheck) {
    const consecutiveSlots = timesForDate.filter(slot =>
      slot.barberId === bId &&
      slot.startTime.getTime() >= requestedTimeMs &&
      slot.startTime.getTime() <= endTime.getTime() &&
      slot.status === 'AVAILABLE'
    );

    const availableMinutes = consecutiveSlots.length * 30;
    if (availableMinutes >= serviceDuration) {
      return true;
    }
  }

  return false;
}

export function getIds<T extends { id: number }>(arr: T[]) {
  return arr.map(a => a.id);
}

export function getBarbersFromBarbershop(barbershopId: number, barbers: BarberSummaryDto[]) {
  return barbers.filter(b => b.barbershopId === barbershopId);
}
export function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}
