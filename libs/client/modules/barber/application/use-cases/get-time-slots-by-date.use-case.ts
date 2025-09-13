import { inject, Injectable } from '@angular/core';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetTimeSlotsByDate {
  private barberGateway = inject(BarberGateway);

  async execute(date: Date) {
    const slots = await firstValueFrom(
      this.barberGateway.getTimeSlotsByDate(date)
    );
    return slots
      .map((slot) => ({
        ...slot,
        startTime: new Date(slot.startTime),
      }))
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }
}
