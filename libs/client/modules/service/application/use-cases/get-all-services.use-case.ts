import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ServiceGateway } from '@barbershop-app/client/service/domain';
import { ServiceStore } from '@barbershop-app/client/core/application';


@Injectable({ providedIn: 'root' })
export class GetAllServicesUseCase {
  private serviceGateway = inject(ServiceGateway);
  private serviceStore = inject(ServiceStore);

  async execute() {
    this.serviceStore.setServices({
      services: await firstValueFrom(this.serviceGateway.getAllServices())
    });
  }
}
