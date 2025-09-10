import { TimeSlot } from '@prisma/client';
import { TimeSlotEntity } from '@barbershop-app/api/barber/domain';

export class TimeSlotMapper {
  static toEntity(timeSlot: TimeSlot): TimeSlotEntity {
    return {
      id: timeSlot.id,
      startTime: timeSlot.startTime,
      status: timeSlot.status,
      barberId: timeSlot.barberId,
      appointmentId: timeSlot.appointmentId
    }
  }
}
