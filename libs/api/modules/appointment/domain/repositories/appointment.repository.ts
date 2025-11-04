import { CreateAppointmentPayload } from '@barbershop-app/shared/domain';
import { AppointmentEntity } from '../entities/appointment.entity';

export abstract class AppointmentRepository {
  abstract create(createAppointmentPayload: CreateAppointmentPayload): Promise<AppointmentEntity>
}
