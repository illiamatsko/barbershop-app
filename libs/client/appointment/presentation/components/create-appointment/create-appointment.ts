import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LeftArrowIcon, LogoIcon, RightArrowIcon } from '@barbershop-app/shared/ui';
import { SelectBarbershop } from '../select-barbershop/select-barbershop';
import { SelectBarber } from '../select-barber/select-barber';
import { SelectService } from '../select-service/select-service';
import { SelectTime } from '../select-time/select-time';
import { Confirmation } from '../confirmation/confirmation';


@Component({
  selector: 'app-create-appointment',
  imports: [
    LogoIcon,
    LeftArrowIcon,
    SelectBarbershop,
    SelectBarber,
    SelectService,
    SelectTime,
    Confirmation,
    RightArrowIcon,
  ],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointment {
  currentStep = signal<number>(1);
}
