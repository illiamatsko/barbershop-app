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
import { FormField, FormTextArea, LeftArrowIcon } from '@barbershop-app/client/shared/presentation';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormsModule, ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '@barbershop-app/client/core/application';

@Component({
  selector: 'app-confirmation',
  imports: [
    Header,
    LeftArrowIcon,
    DatePipe,
    FormsModule,
    FormField,
    ReactiveFormsModule,
    FormTextArea,
    CurrencyPipe,
  ],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Confirmation implements OnInit {
  private router = inject(Router);
  private bookingFlowStore = inject(BookingFlowStore);
  private authStore = inject(AuthStore);
  private createAppointmentUseCase = inject(CreateAppointmentUseCase);

  additionalInfoForm = new FormBuilder().nonNullable.group({
    email: [
      this.authStore.user.email(),
      [Validators.required, Validators.email],
    ],
    comment: [''],
  });

  selectedBarbershop = this.bookingFlowStore.selectedBarbershop();
  selectedBarber = this.bookingFlowStore.selectedBarber();
  selectedService = this.bookingFlowStore.selectedService();
  selectedTimeSlot = this.bookingFlowStore.selectedTimeSlot();
  price = this.bookingFlowStore.price();

  ngOnInit() {
    if (!this.isParamsValid()) {
      this.navigateToEdit();
    }
  }

  navigateToEdit() {
    this.router.navigate(['/appointment/create']).then();
  }

  onConfirm() {
    const barberId = this.bookingFlowStore.selectedBarber()?.id;
    const serviceId = this.bookingFlowStore.selectedService()?.id;
    const timeSlot = this.bookingFlowStore.selectedTimeSlot();

    if (!barberId || !serviceId || !timeSlot) {
      this.navigateToEdit();
      return;
    }

    if (this.additionalInfoForm.invalid) return;

    const { email, comment } = this.additionalInfoForm.getRawValue();

    this.createAppointmentUseCase.execute({
      email,
      customerId: this.authStore.user.id(),
      barberId: barberId,
      serviceId: serviceId,
      date: timeSlot.startTime.toISOString(),
      comment,
    });
  }

  getError(errorCode: string, control: AbstractControl) {
    if (!control) return false;
    return control.touched && control.hasError(errorCode);
  }

  isParamsValid() {
    return (
      this.selectedBarbershop &&
      this.selectedBarber &&
      this.selectedService &&
      this.selectedTimeSlot
    );
  }
}
