import { TimeSlot } from '@prisma/client';
import { TimeSlotEntity } from '@barbershop-app/api/core/domain';
import { TimeSlotStatusMap } from './time-slot-status.map';

export class TimeSlotMapper {
  static toDomain(timeSlot: TimeSlot): TimeSlotEntity {
    return {
      id: timeSlot.id,
      startTime: timeSlot.startTime,
      barberId: timeSlot.barberId,
      status: TimeSlotStatusMap[timeSlot.status],
    };
  }
}
