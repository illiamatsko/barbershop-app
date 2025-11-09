import { AppointmentInfoDto } from '@barbershop-app/shared/domain';

export abstract class CustomerProfileGateway {
  abstract getCustomerAppointmentsInfo(customerId: number): Promise<AppointmentInfoDto[]>
}
