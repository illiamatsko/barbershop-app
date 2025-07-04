import { TimeSlotDto } from '@barbershop-app/shared/types';
import { TimeSlotEntity } from '../entities/time-slot.entity';

export function TimeSlotEntityToDto(timeSlot: TimeSlotEntity): TimeSlotDto {
  return {
    id: timeSlot.id,
    startTime: timeSlot.startTime.toISOString()
  }
}
