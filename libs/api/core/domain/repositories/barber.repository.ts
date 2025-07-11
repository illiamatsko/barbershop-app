import { BarberEntity } from '../entities/barber.entity';
import { TimeSlotEntity } from '../entities/time-slot.entity';
import { BarberStatusDto } from '@barbershop-app/shared/types';

export abstract class BarberRepository {
  abstract getAll(): Promise<BarberEntity[]>

  abstract getBarberStatuses(): Promise<BarberStatusDto[]>

  abstract getTimeSlotsByBarberId(id: number): Promise<TimeSlotEntity[]>

  abstract getServicesByBarberId(id: number): Promise<{ serviceId: number }[]>
}
