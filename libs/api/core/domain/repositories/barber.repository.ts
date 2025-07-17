import { TimeSlotEntity } from '../entities/time-slot.entity';
import { BarberStatusDto } from '@barbershop-app/shared/types';
import { BarberSummaryEntity } from '../entities/barber-summary.entity';

export abstract class BarberRepository {
  abstract getAll(): Promise<BarberSummaryEntity[]>

  abstract getBarberStatuses(): Promise<BarberStatusDto[]>

  abstract getTimeSlotsByBarberId(id: number): Promise<TimeSlotEntity[]>

  abstract getServicesByBarberId(id: number): Promise<{ serviceId: number }[]>
}
