import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LeftArrowIcon, LogoIcon } from '@barbershop-app/shared/ui';


@Component({
  selector: 'app-create-appointment',
  imports: [LogoIcon, LeftArrowIcon],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointment {}
