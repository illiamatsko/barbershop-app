import { TimeSlotEntity } from '../entities/time-slot.entity';
import { TimeSlotDto } from '@barbershop-app/shared/domain';

export class TimeSlotMapper {
  static toDto(timeSlotEntity: TimeSlotEntity): TimeSlotDto {
    return {
      id: timeSlotEntity.id,
      startTime: timeSlotEntity.startTime,
      status: timeSlotEntity.status,
      barberId: timeSlotEntity.barberId,
      appointmentId: timeSlotEntity.appointmentId
    }
  }
}
