import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  imports: [],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointments {
  activeTab: "upcoming" | "history" = "upcoming"

  upcomingAppointments: Appointment[] = [
    {
      id: "#00456",
      service: "Стрижка + Борода",
      barber: "Дмитро Коваль",
      date: "П'ятниця, 15 Березня 2024",
      time: "14:00",
      duration: 60,
      price: 450,
      status: "confirmed",
    },
    {
      id: "#00457",
      service: "Класична стрижка",
      barber: "Андрій Мельник",
      date: "Понеділок, 25 Березня 2024",
      time: "10:30",
      duration: 45,
      price: 300,
      status: "pending",
    },
  ]

  pastAppointments: Appointment[] = [
    {
      id: "#00445",
      service: "Стрижка + Борода",
      barber: "Дмитро Коваль",
      date: "2 Березня 2024",
      time: "14:00",
      duration: 60,
      price: 450,
      status: "completed",
    },
    {
      id: "#00432",
      service: "Класична стрижка",
      barber: "Андрій Мельник",
      date: "18 Лютого 2024",
      time: "11:00",
      duration: 45,
      price: 300,
      status: "completed",
    },
    {
      id: "#00428",
      service: "Королівське гоління",
      barber: "Дмитро Коваль",
      date: "10 Лютого 2024",
      time: "16:00",
      duration: 40,
      price: 250,
      status: "cancelled",
    },
  ]

  switchTab(tab: "upcoming" | "history"): void {
    this.activeTab = tab
  }

  cancelAppointment(appointmentId: string): void {
    const confirmed = confirm("Ви впевнені, що хочете скасувати цей запис?")
    if (confirmed) {
      console.log("[v0] Cancelling appointment:", appointmentId)
      // Add cancellation logic here
      alert("Запис успішно скасовано")
    }
  }

  rebookAppointment(appointment: Appointment): void {
    console.log("[v0] Rebooking appointment:", appointment)
    // Add rebooking logic here
    alert("Перехід до сторінки запису...")
  }

  leaveReview(appointmentId: string): void {
    console.log("[v0] Opening review form for:", appointmentId)
    // Add review logic here
    alert("Відкриття форми відгуку...")
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      confirmed: "bg-yellow-500 text-white",
      pending: "bg-neutral-200 text-neutral-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    }
    return classes[status] || "bg-neutral-200 text-neutral-700"
  }

  getStatusText(status: string): string {
    const texts: Record<string, string> = {
      confirmed: "Підтверджено",
      pending: "Очікує підтвердження",
      completed: "Завершено",
      cancelled: "Скасовано",
    }
    return texts[status] || status
  }

  getCardBorderClass(status: string): string {
    if (status === "confirmed") {
      return "border-2 border-yellow-500 bg-yellow-50/30"
    }
    return "border-2 border-neutral-200 hover:border-neutral-300"
  }
}
