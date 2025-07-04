import { BarberEntity } from '../entities/barber.entity';
import { TimeSlotEntity } from '../entities/time-slot.entity';

export abstract class BarberRepository {
  abstract getAll(): Promise<BarberEntity[]>

  abstract getTimeSlotsByBarberId(id: number): Promise<TimeSlotEntity[]>

  abstract getServicesByBarberId(id: number): Promise<{ serviceId: number }[]>
}
