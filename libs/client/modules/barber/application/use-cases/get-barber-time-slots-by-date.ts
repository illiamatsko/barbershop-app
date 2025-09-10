import { inject, Injectable } from '@angular/core';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetBarberTimeSlotsByDate {
  private barberGateway = inject(BarberGateway);

  async execute(barberId: number, date: Date) {
    return firstValueFrom(this.barberGateway.getBarberTimeSlotsByDate(barberId, date));
  }
}
