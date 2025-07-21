import { BarberStatusDto } from '@barbershop-app/shared/domain';
import { BarberSummaryEntity } from '../entities/barber-summary.entity';

export abstract class BarberRepository {
  abstract getAll(): Promise<BarberSummaryEntity[]>

  abstract getBarberStatuses(): Promise<BarberStatusDto[]>
}
