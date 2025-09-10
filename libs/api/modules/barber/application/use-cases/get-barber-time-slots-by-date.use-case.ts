import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetBarberTimeSlotsByDateQuery
} from '../queries/get-barber-time-slots-by-date.query';
import { TimeSlotDto } from '@barbershop-app/shared/domain';
import { BarberRepository } from '@barbershop-app/api/barber/domain';

@QueryHandler(GetBarberTimeSlotsByDateQuery)
export class GetBarberTimeSlotsByDateUseCase implements IQueryHandler<GetBarberTimeSlotsByDateQuery> {
  constructor(private barberRepository: BarberRepository) {}

  async execute(query: GetBarberTimeSlotsByDateQuery): Promise<TimeSlotDto[]> {
    return this.barberRepository.getBarberTimeSlotsByDate(query.barberId, query.date);
  }
}
