import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Header } from '../create-appointment/header/header';
import { Router } from '@angular/router';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';
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

  selectedBarbershop = this.bookingFlowStore.selectedBarbershop();
  selectedBarber = this.bookingFlowStore.selectedBarber();
  selectedService = this.bookingFlowStore.selectedService();
  selectedTimeSlot = this.bookingFlowStore.selectedTimeSlot();

  ngOnInit() {
    if (
      !this.selectedBarbershop ||
      !this.selectedBarber ||
      !this.selectedService ||
      !this.selectedTimeSlot
    ) {
      this.navigateToEdit();
    }
  }

  navigateToEdit() {
    this.router
      .navigate(['/appointment/create'], {
        queryParams: {
          barbershopId: this.selectedBarbershop?.id,
          barberId: this.selectedBarber?.id,
          serviceId: this.selectedService?.id,
          date: this.selectedTimeSlot?.startTime.toISOString().split('T')[0] ?? null,
          time: this.selectedTimeSlot?.startTime.toISOString().split('T')[1] ?? null,
        }
      })
      .then();
  }

  onConfirm() {
    console.log('Confirm');
  }
}
