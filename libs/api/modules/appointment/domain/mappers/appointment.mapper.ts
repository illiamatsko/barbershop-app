import { AppointmentEntity } from '../entities/appointment.entity';
import { AppointmentDto } from '@barbershop-app/shared/domain';

export class AppointmentMapper {
  static toDto(appointmentEntity: AppointmentEntity): AppointmentDto {
    return {
      id: appointmentEntity.id,
      date: appointmentEntity.date,
      customerEmail: appointmentEntity.customerEmail,
      customerId: appointmentEntity.customerId,
      barbershopId: appointmentEntity.barbershopId,
      barberId: appointmentEntity.barberId,
      serviceId: appointmentEntity.serviceId,
      status: appointmentEntity.status,
      comment: appointmentEntity.comment,
    }
  }
}
