import { Query } from '@nestjs/cqrs';
import { TimeSlotDto } from '@barbershop-app/shared/domain';

export class GetTimeSlotsByDateQuery extends Query<TimeSlotDto[]> {
  constructor(
    public readonly date: Date,
  ) {
    super();
  }
}
