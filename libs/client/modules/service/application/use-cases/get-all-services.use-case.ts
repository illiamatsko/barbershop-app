import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ServiceGateway } from '../../domain';


@Injectable({ providedIn: 'root' })
export class GetAllServicesUseCase {
  private serviceGateway = inject(ServiceGateway);

  execute() {
    return firstValueFrom(this.serviceGateway.getAllServices())
  }
}
