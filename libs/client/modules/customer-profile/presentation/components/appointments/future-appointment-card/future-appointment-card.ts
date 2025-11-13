import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AppointmentInfoDto } from '@barbershop-app/shared/domain';
import { DatePipe } from '@angular/common';
import { CancelAppointmentUseCase } from '@barbershop-app/client/customer-profile/application';


@Component({
  selector: 'app-future-appointment-card',
  imports: [DatePipe],
  templateUrl: './future-appointment-card.html',
  styleUrl: './future-appointment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureAppointmentCard {
  private cancelAppointmentUseCase = inject(CancelAppointmentUseCase);
  appointment = input.required<AppointmentInfoDto>();

  cancelAppointment(id: number) {
    this.cancelAppointmentUseCase.execute(id);
  }

  getCardBorderClass(status: string): string {
    if (status === 'CONFIRMED') {
      return 'border-2 border-yellow-500';
    }
    return 'border-2 border-neutral-600';
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      CONFIRMED: 'bg-yellow-500 text-white',
      PENDING: 'bg-neutral-200 text-neutral-700',
      COMPLETED: 'bg-green-100 text-green-700',
    };
    return classes[status] || 'bg-neutral-200 text-neutral-700';
  }
}
