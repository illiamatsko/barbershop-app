import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LeftArrowIcon, RightArrowIcon, Stepper } from '@barbershop-app/client/shared/presentation';
import { SelectBarbershop } from '../select-barbershop/select-barbershop';
import { SelectBarber } from '../select-barber/select-barber';
import { SelectService } from '../select-service/select-service';
import { SelectTime } from '../select-time/select-time';
import { Confirmation } from '../confirmation/confirmation';
import { Header } from './header/header';


@Component({
  selector: 'app-create-appointment',
  imports: [
    LeftArrowIcon,
    SelectBarbershop,
    SelectBarber,
    SelectService,
    SelectTime,
    Confirmation,
    RightArrowIcon,
    Stepper,
    Header,
  ],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointment {
  steps = ['Barbershop', 'Barber', 'Service', 'Date & Time', 'Contacts'];
  currentStep = signal<number>(1);
  selectedBarbershopId = signal<number>(-1);
  selectedBarberId = signal<number>(-1);
  selectedServiceId = signal<number>(-1);

  canProceed = computed(() => {
    switch (this.currentStep()) {
      case 1:
        return this.selectedBarbershopId() !== -1;
      case 2:
        return this.selectedBarberId() !== -1;
      case 3:
        return this.selectedServiceId() !== -1;
      default:
        return false;
    }
  });

  selectBarbershop(id: number) {
    this.selectedBarbershopId.set(id);
  }

  selectBarber(id: number) {
    this.selectedBarberId.set(id);
  }

  setService(id: number) {
    this.selectedServiceId.set(id);
  }

  nextStep() {
    if (this.currentStep() < 5 && this.canProceed()) {
      this.currentStep.update((step) => step + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }
}
