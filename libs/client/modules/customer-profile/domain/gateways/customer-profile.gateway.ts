import {
  AppointmentDto,
  AppointmentInfoDto,
} from '@barbershop-app/shared/domain';

export abstract class CustomerProfileGateway {
  abstract getCustomerAppointmentsInfo(customerId: number): Promise<AppointmentInfoDto[]>

  abstract getFullAppointment(appointmentId: number): Promise<AppointmentDto>

  abstract cancelAppointment(appointmentId: number): Promise<boolean>
}
