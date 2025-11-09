import { inject, Injectable } from '@angular/core';
import { CustomerProfileGateway } from '@barbershop-app/client/customer-profile/domain';


@Injectable({ providedIn: 'root' })
export class GetCustomerAppointmentsInfoUseCase {
  private customerProfileGateway = inject(CustomerProfileGateway)

  async execute(customerId: number) {
    return await this.customerProfileGateway.getCustomerAppointmentsInfo(customerId);
  }
}
