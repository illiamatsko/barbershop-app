import { AppointmentEntity } from '../entities/appointment.entity';
import {
  AppointmentDto,
  AppointmentInfoDto,
} from '@barbershop-app/shared/domain';
import { AppointmentInfoEntity } from '../entities/appointment-info.entity';

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

  static toInfoDto(appointmentInfoEntity: AppointmentInfoEntity): AppointmentInfoDto {
    return {
      id: appointmentInfoEntity.id,
      barberName: appointmentInfoEntity.barberName,
      serviceName: appointmentInfoEntity.serviceName,
      status: appointmentInfoEntity.status,
      date: appointmentInfoEntity.date.toISOString(),
      price: appointmentInfoEntity.price,
    }
  }
}
