import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerAppointmentsInfoQuery } from '../queries/get-customer-appointments-info.query';
import { PrismaAppointmentRepository } from '@barbershop-app/api/appointment/infrastructure';
import { AppointmentMapper } from '@barbershop-app/api/appointment/domain';


@QueryHandler(GetCustomerAppointmentsInfoQuery)
export class GetCustomerAppointmentsInfoUseCase
  implements IQueryHandler<GetCustomerAppointmentsInfoQuery>
{
  constructor(private appointmentRepository: PrismaAppointmentRepository) {}

  async execute(query: GetCustomerAppointmentsInfoQuery) {
    const appointmentsInfo =
      await this.appointmentRepository.getCustomerAppointmentsInfo(
        query.customerId
      );

    return appointmentsInfo.map(ai => AppointmentMapper.toInfoDto(ai));
  }
}
