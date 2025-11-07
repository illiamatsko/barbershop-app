import { CreateAppointmentPayload } from '@barbershop-app/shared/domain';
import { AppointmentEntity } from '../entities/appointment.entity';
import { AppointmentInfoEntity } from '../entities/appointment-info.entity';

export abstract class AppointmentRepository {
  abstract create(createAppointmentPayload: CreateAppointmentPayload): Promise<AppointmentEntity>

  abstract getCustomerAppointmentsInfo(customerId: number): Promise<AppointmentInfoEntity[]>
}
