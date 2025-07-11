import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ServiceGateway } from '@barbershop-app/client/service/domain';


@Injectable({ providedIn: 'root' })
export class GetAllServicesUseCase {
  private serviceGateway = inject(ServiceGateway);

  execute() {
    return firstValueFrom(this.serviceGateway.getAllServices())
  }
}
