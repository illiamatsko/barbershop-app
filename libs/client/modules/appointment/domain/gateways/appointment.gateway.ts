import { AppointmentDto } from '@barbershop-app/shared/types';


export abstract class AppointmentGateway {
  abstract createAppointment(appointmentDto: AppointmentDto): void
}
