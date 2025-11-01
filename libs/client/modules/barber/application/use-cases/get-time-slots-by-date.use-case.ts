import { inject, Injectable } from '@angular/core';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { firstValueFrom } from 'rxjs';
import { TimeSlotStore } from '@barbershop-app/client/core/application';

@Injectable({ providedIn: 'root' })
export class GetTimeSlotsByDate {
  private barberGateway = inject(BarberGateway);
  private timeSlotStore = inject(TimeSlotStore);

  async execute(date: string) {
    // await new Promise((resolve) => setTimeout(resolve, 800));
    const slots = await firstValueFrom(
      this.barberGateway.getTimeSlotsByDate(date)
    );
    const mappedSlots = slots
      .map((slot) => ({
        ...slot,
        startTime: new Date(slot.startTime),
      }))
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    this.timeSlotStore.addTimeSlots(date, mappedSlots);
    return mappedSlots;
  }
}
