import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SelectBarbershop } from '../select-barbershop/select-barbershop';
import { SelectBarber } from '../select-barber/select-barber';
import { SelectTime } from '../select-time/select-time';
import { Header } from './header/header';
import { SelectService } from '../select-service/select-service';
import { RightArrowIcon } from '@barbershop-app/client/shared/presentation';
import { Router } from '@angular/router';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-create-appointment',
  imports: [
    SelectBarbershop,
    SelectBarber,
    SelectTime,
    Header,
    SelectService,
    RightArrowIcon,
    NgClass,
  ],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointment {
  private bookingFlowStore = inject(BookingFlowStore);
  private router = inject(Router);

  isCompleted = this.bookingFlowStore.isCompleted;

  navigateToConfirmation() {
    this.router.navigate(['/appointment/confirmation']).then();
  }
}
