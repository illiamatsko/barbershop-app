import { AppointmentDto } from '@barbershop-app/shared/domain';


export abstract class AppointmentGateway {
  abstract createAppointment(appointmentDto: AppointmentDto): void
}
