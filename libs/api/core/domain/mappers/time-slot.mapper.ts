import { TimeSlotDto } from '@barbershop-app/shared/types';
import { TimeSlotEntity } from '../entities/time-slot.entity';

export class TimeSlotMapper {
  static toDto(timeSlot: TimeSlotEntity): TimeSlotDto {
    return {
      id: timeSlot.id,
      startTime: timeSlot.startTime.toISOString(),
    };
  }
}
