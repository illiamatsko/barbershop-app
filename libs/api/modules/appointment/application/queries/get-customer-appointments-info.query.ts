import { Query } from '@nestjs/cqrs';
import { AppointmentInfoDto } from '@barbershop-app/shared/domain';


export class GetCustomerAppointmentsInfoQuery extends Query<AppointmentInfoDto[]> {
  constructor(
    public customerId: number
  ) {
    super();
  }
}
