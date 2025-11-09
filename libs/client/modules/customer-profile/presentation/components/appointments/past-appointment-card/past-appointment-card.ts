import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppointmentInfoDto } from '@barbershop-app/shared/domain';


@Component({
  selector: 'app-past-appointment-card',
  imports: [],
  templateUrl: './past-appointment-card.html',
  styleUrl: './past-appointment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastAppointmentCard {
  appointment = input.required<AppointmentInfoDto>();

  rebookAppointment(appointment: any): void {
    console.log("[v0] Rebooking appointment:", appointment)
    // Add rebooking logic here
    alert("Перехід до сторінки запису...")
  }

  leaveReview(appointmentId: number): void {
    console.log("[v0] Opening review form for:", appointmentId)
    // Add review logic here
    alert("Відкриття форми відгуку...")
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      COMPLETED: "bg-green-100 text-green-700",
      CANCELED: "bg-red-300 text-red-700",
    }
    return classes[status] || "bg-neutral-200 text-neutral-700"
  }
}
