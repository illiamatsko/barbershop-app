import { TimeSlot } from '@prisma/client';
import { TimeSlotEntity } from '@barbershop-app/api/core/domain';
import { TimeSlotStatusMap } from './time-slot-status.map';

export function TimeSlotToDomainEntity(timeSlot: TimeSlot): TimeSlotEntity {
  return {
    id: timeSlot.id,
    startTime: timeSlot.startTime,
    appointmentId: timeSlot.appointmentId,
    barberId: timeSlot.barberId,
    status: TimeSlotStatusMap[timeSlot.status]
  }
}
