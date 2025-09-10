import { BarberSummaryEntity } from '../entities/barber-summary.entity';
import { TimeSlotEntity } from '../entities/time-slot.entity';
import { BarberStatusEntity } from '../entities/barber-status.entity';

export abstract class BarberRepository {
  abstract getAll(): Promise<BarberSummaryEntity[]>

  abstract getBarberStatuses(): Promise<BarberStatusEntity[]>

  abstract getBarberTimeSlotsByDate(barberId: number, date: Date): Promise<TimeSlotEntity[]>
}
