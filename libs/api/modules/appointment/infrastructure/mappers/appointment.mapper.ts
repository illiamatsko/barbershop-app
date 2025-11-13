import { Appointment } from '@prisma/client';
import {
  AppointmentEntity,
  AppointmentInfoEntity,
} from '@barbershop-app/api/appointment/domain';
import { RawAppointmentType } from '../types/raw-appointment.type';

export class AppointmentMapper {
  static toEntity(appointment: Appointment, barbershopId: number): AppointmentEntity {
    return {
      id: appointment.id,
      date: appointment.date,
      customerEmail: appointment.email,
      customerId: appointment.customerId,
      barbershopId,
      barberId: appointment.barberId,
      serviceId: appointment.serviceId,
      status: appointment.status,
      comment: appointment.comment
    }
  }

  static toInfoEntity(appointment: RawAppointmentType): AppointmentInfoEntity {
    return {
      id: appointment.id,
      barberName: appointment.barber.user.firstName + ' ' + appointment.barber.user.lastName,
      serviceName: appointment.service.name,
      status: appointment.status,
      date: appointment.date,
      price: appointment.price,
    }
  }
}
