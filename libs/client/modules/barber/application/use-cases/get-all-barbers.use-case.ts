import { inject, Injectable } from '@angular/core';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { firstValueFrom } from 'rxjs';
import { BarberStore } from '@barbershop-app/client/core/application';

@Injectable({ providedIn: 'root' })
export class GetAllBarbersUseCase {
  private barberGateway = inject(BarberGateway);
  private barberStore = inject(BarberStore);

  async execute() {
    this.barberStore.setBarbers(await firstValueFrom(this.barberGateway.getAllBarbers()));
  }
}
