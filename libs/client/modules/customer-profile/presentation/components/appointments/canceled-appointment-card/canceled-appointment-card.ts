import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppointmentInfoDto } from '@barbershop-app/shared/domain';


@Component({
  selector: 'app-canceled-appointment-card',
  imports: [],
  templateUrl: './canceled-appointment-card.html',
  styleUrl: './canceled-appointment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanceledAppointmentCard {
  appointment = input.required<AppointmentInfoDto>();
}
