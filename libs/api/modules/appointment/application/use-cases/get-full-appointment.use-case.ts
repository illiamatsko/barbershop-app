import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFullAppointmentQuery } from '../queries/get-full-appointment.query';
import { AppointmentMapper, AppointmentRepository } from '@barbershop-app/api/appointment/domain';


@QueryHandler(GetFullAppointmentQuery)
export class GetFullAppointmentUseCase implements IQueryHandler<GetFullAppointmentQuery> {
  constructor(private appointmentRepo: AppointmentRepository) {}

  async execute(query: GetFullAppointmentQuery) {
    const appointmentEntity = await this.appointmentRepo.getFullAppointment(query.appointmentId);

    return AppointmentMapper.toDto(appointmentEntity);
  }
}
