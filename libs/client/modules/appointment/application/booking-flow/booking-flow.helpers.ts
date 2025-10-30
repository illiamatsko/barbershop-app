import { TimeSlotDto } from '@barbershop-app/shared/domain';


export function hasEnoughConsecutiveSlots(
  requestedTime: Date,
  timesForDate: TimeSlotDto[],
  serviceDuration: number,
  barberIdsToCheck: number[]
): boolean {
  const endTime = new Date(requestedTime.getTime() + serviceDuration * 60_000);
  const requestedTimeMs = requestedTime.getTime();

  // Check if any barber has enough consecutive slots
  for (const bId of barberIdsToCheck) {
    const consecutiveSlots = timesForDate.filter(slot =>
      slot.barberId === bId &&
      slot.startTime.getTime() >= requestedTimeMs &&
      slot.startTime.getTime() < endTime.getTime() &&
      slot.status === 'AVAILABLE'
    );

    const availableMinutes = consecutiveSlots.length * 30;
    if (availableMinutes >= serviceDuration) {
      return true; // Found a barber with enough slots
    }
  }

  return false; // No barber has enough consecutive slots
}
