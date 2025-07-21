import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LeftArrowIcon, LogoIcon, RightArrowIcon } from '../../../../../shared';
import { SelectBarbershop } from '../select-barbershop/select-barbershop';
import { SelectBarber } from '../select-barber/select-barber';
import { SelectService } from '../select-service/select-service';
import { SelectTime } from '../select-time/select-time';
import { Confirmation } from '../confirmation/confirmation';
import { Stepper } from './stepper/stepper';


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
    Stepper,
  ],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointment {
  steps = ['Barbershop', 'Barber', 'Service', 'Date & Time', 'Contacts'];
  currentStep = signal<number>(1);
  selectedBarbershopId = signal<number>(-1);

  selectBarbershop(id: number) {
    this.selectedBarbershopId.set(id);
  }

  nextStep() {
    if (this.currentStep() < 5) {
      this.currentStep.update((step) => step + 1);
      console.log(this.currentStep());
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
      console.log(this.currentStep());
    }
  }
}
