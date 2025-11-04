import { Appointment } from '@prisma/client';
import { AppointmentEntity } from '@barbershop-app/api/appointment/domain';

export class AppointmentMapper {
  static toEntity(appointment: Appointment, date: Date, customerEmail: string, customerId: number | null, barbershopId: number): AppointmentEntity {
    return {
      id: appointment.id,
      date,
      customerEmail,
      customerId,
      barbershopId,
      barberId: appointment.barberId,
      serviceId: appointment.serviceId,
      status: appointment.status,
      comment: appointment.comment
    }
  }
}
