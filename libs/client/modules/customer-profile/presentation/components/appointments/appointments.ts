import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AppointmentInfoDto } from '@barbershop-app/shared/domain';
import { FutureAppointmentCard } from './future-appointment-card/future-appointment-card';
import { PastAppointmentCard } from './past-appointment-card/past-appointment-card';


interface Appointment {
  id: string
  service: string
  barber: string
  date: string
  time: string
  duration: number
  price: number
  status: "confirmed" | "pending" | "completed" | "cancelled"
}
@Component({
  selector: 'app-profile-appointments',
  imports: [
    FutureAppointmentCard,
    PastAppointmentCard,
  ],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointments {
  activeTab: 'future' | 'history' = 'future';

  allAppointmentsInfo = input.required<AppointmentInfoDto[]>();
  selectedAppointmentsInfo = computed(() =>
    this.allAppointmentsInfo().filter((a) => {
      if (this.activeTab === 'future') {
        return new Date(a.date) < new Date();
      } else {
        return new Date(a.date) <= new Date();
      }
    })
  );

  switchTab(tab: 'future' | 'history'): void {
    this.activeTab = tab;
  }

  cancelAppointment(appointmentId: number): void {
    const confirmed = confirm('Ви впевнені, що хочете скасувати цей запис?');
    if (confirmed) {
      console.log('[v0] Cancelling appointment:', appointmentId);
      // Add cancellation logic here
      alert('Запис успішно скасовано');
    }
  }

  rebookAppointment(appointment: Appointment): void {
    console.log('[v0] Rebooking appointment:', appointment);
    // Add rebooking logic here
    alert('Перехід до сторінки запису...');
  }

  leaveReview(appointmentId: string): void {
    console.log('[v0] Opening review form for:', appointmentId);
    // Add review logic here
    alert('Відкриття форми відгуку...');
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      confirmed: 'bg-yellow-500 text-white',
      pending: 'bg-neutral-200 text-neutral-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return classes[status] || 'bg-neutral-200 text-neutral-700';
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = {
      confirmed: 'Підтверджено',
      pending: 'Очікує підтвердження',
      completed: 'Завершено',
      cancelled: 'Скасовано',
    };
    return texts[status] || status;
  }

  getCardBorderClass(status: string): string {
    if (status === 'confirmed') {
      return 'border-2 border-yellow-500 bg-yellow-50/30';
    }
    return 'border-2 border-neutral-200 hover:border-neutral-300';
  }
}
