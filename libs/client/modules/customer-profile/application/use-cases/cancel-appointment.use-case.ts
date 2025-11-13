import { inject, Injectable } from '@angular/core';
import { CustomerProfileGateway } from '@barbershop-app/client/customer-profile/domain';


@Injectable({ providedIn: 'root' })
export class CancelAppointmentUseCase {
  private customerProfileGateway = inject(CustomerProfileGateway);

  execute(appointmentId: number) {
    return this.customerProfileGateway.cancelAppointment(appointmentId);
  }
}
