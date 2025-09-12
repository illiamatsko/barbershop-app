import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetTimeSlotsByDateQuery
} from '../queries/get-time-slots-by-date.query';
import { TimeSlotDto } from '@barbershop-app/shared/domain';
import { BarberRepository } from '@barbershop-app/api/barber/domain';

@QueryHandler(GetTimeSlotsByDateQuery)
export class GetTimeSlotsByDateUseCase implements IQueryHandler<GetTimeSlotsByDateQuery> {
  constructor(private barberRepository: BarberRepository) {}

  async execute(query: GetTimeSlotsByDateQuery): Promise<TimeSlotDto[]> {
    return this.barberRepository.getTimeSlotsByDate(query.date);
  }
}
