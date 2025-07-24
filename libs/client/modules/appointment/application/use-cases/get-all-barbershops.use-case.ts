import { inject, Injectable } from '@angular/core';
import { BarbershopGateway } from '@barbershop-app/client/appointment/domain';
import { BarbershopStore } from '@barbershop-app/client/core/application';
import { firstValueFrom } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class GetAllBarbershopsUseCase {
  private barbershopGateway = inject(BarbershopGateway);
  private barbershopStore = inject(BarbershopStore)

  async execute() {
    this.barbershopStore.setBarbershops(await firstValueFrom(this.barbershopGateway.getAll()));
  }
}
