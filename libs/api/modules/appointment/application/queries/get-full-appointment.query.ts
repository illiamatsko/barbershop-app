import { Query } from '@nestjs/cqrs';
import { AppointmentDto } from '@barbershop-app/shared/domain';

export class GetFullAppointmentQuery extends Query<AppointmentDto> {
  constructor(
    public appointmentId: number
  ) {
    super();
  }
}
