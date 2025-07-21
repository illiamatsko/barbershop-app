import { inject, Injectable } from '@angular/core';
import { AppointmentGateway } from '@barbershop-app/client/appointment/domain';
import { AppointmentDto } from '@barbershop-app/shared/domain';


@Injectable({ providedIn: 'root' })
export class CreateAppointmentUseCase {
  private appointmentGateway = inject(AppointmentGateway);

  execute(appointmentDto: AppointmentDto) {
    this.appointmentGateway.createAppointment(appointmentDto);
  }
}
