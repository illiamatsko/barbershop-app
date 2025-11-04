import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Header } from '../create-appointment/header/header';
import { Router } from '@angular/router';
import {
  BookingFlowStore,
  CreateAppointmentUseCase,
} from '@barbershop-app/client/appointment/application';
import { LeftArrowIcon } from '@barbershop-app/client/shared/presentation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  imports: [Header, LeftArrowIcon, DatePipe],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Confirmation implements OnInit {
  private router = inject(Router);
  private bookingFlowStore = inject(BookingFlowStore);
  private createAppointmentUseCase = inject(CreateAppointmentUseCase);

  selectedBarbershop = this.bookingFlowStore.selectedBarbershop();
  selectedBarber = this.bookingFlowStore.selectedBarber();
  selectedService = this.bookingFlowStore.selectedService();
  selectedTimeSlot = this.bookingFlowStore.selectedTimeSlot();

  ngOnInit() {
    if (!this.isParamsValid()) {
      this.navigateToEdit();
    }
  }

  navigateToEdit() {
    this.router.navigate(['/appointment/create']).then();
  }

  onConfirm() {
    const barbershopId = this.bookingFlowStore.selectedBarbershop()?.id;
    const barberId = this.bookingFlowStore.selectedBarber()?.id;
    const serviceId = this.bookingFlowStore.selectedService()?.id;

    if (!barbershopId || !barberId || !serviceId) {
      this.navigateToEdit();
      return;
    }

    this.createAppointmentUseCase.execute({
      barbershopId: barbershopId,
      barberId: barberId,
      serviceId: serviceId,
      email: '',
      comment: ''
    });
  }

  isParamsValid() {
    return this.selectedBarbershop && this.selectedBarber && this.selectedService && this.selectedTimeSlot;
  }
}
