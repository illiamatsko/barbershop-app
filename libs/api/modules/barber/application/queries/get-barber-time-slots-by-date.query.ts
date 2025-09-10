import { Query } from '@nestjs/cqrs';
import { TimeSlotDto } from '@barbershop-app/shared/domain';

export class GetBarberTimeSlotsByDateQuery extends Query<TimeSlotDto[]> {
  constructor(
    public readonly barberId: number,
    public readonly date: Date,
  ) {
    super();
  }
}
