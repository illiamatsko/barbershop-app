import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {
  AppointmentDto,
  AppointmentInfoDto,
} from '@barbershop-app/shared/domain';
import { Router } from '@angular/router';
import { GetFullAppointmentUseCase } from '@barbershop-app/client/customer-profile/application';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-past-appointment-card',
  imports: [DatePipe],
  templateUrl: './past-appointment-card.html',
  styleUrl: './past-appointment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastAppointmentCard {
  private router = inject(Router);
  private getFullAppointmentUseCase = inject(GetFullAppointmentUseCase);
  appointment = input.required<AppointmentInfoDto>();

  async rebookAppointment() {
    const fullAppointment: AppointmentDto =
      await this.getFullAppointmentUseCase.execute(this.appointment().id);
    this.router
      .navigate(['/appointment/create'], {
        queryParams: {
          barbershopId: fullAppointment.barbershopId,
          barberId: fullAppointment.barberId,
          serviceId: fullAppointment.serviceId,
        },
      })
      .then();
  }

  leaveReview() {
    console.log('Opening review form');
  }

  getStatusClass(status: string) {
    const classes: Record<string, string> = {
      COMPLETED: 'bg-green-100 text-green-700',
      CANCELED: 'bg-red-300 text-red-700',
    };
    return classes[status] || 'bg-neutral-200 text-neutral-700';
  }
}
