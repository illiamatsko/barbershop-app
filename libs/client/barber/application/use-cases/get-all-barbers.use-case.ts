import { inject, Injectable } from '@angular/core';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllBarbersUseCase {
  private barberGateway = inject(BarberGateway);

  execute() {
    return firstValueFrom(this.barberGateway.getAllBarbers())
  }
}
