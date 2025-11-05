import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ServiceGateway } from '@barbershop-app/client/service/domain';
import { ServiceStore } from '@barbershop-app/client/core/application';


@Injectable({ providedIn: 'root' })
export class GetPricesByBarberStatusUseCase {
  private serviceGateway = inject(ServiceGateway);
  private serviceStore = inject(ServiceStore);

  async execute(barberStatus: string) {
    const prices = await firstValueFrom(this.serviceGateway.getPricesByBarberStatus(barberStatus));
    this.serviceStore.addPricesByBarberId(barberStatus, prices);
  }
}
