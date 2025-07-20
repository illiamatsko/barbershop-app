import { inject, Injectable } from '@angular/core';
import { BarbershopGateway } from '@barbershop-app/client/appointment/domain';


@Injectable({ providedIn: 'root' })
export class GetAllBarbershopsUseCase {
  private barbershopGateway = inject(BarbershopGateway);

  execute() {
    return this.barbershopGateway.getAll();
  }
}
