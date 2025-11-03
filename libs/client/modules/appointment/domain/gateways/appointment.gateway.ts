import { CreateAppointmentPayload } from '@barbershop-app/shared/domain';

export abstract class AppointmentGateway {
  abstract createAppointment(
    createAppointmentPayload: CreateAppointmentPayload
  ): void;
}
