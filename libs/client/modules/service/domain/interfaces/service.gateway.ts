import { Observable } from 'rxjs';
import { ServiceDto } from '@barbershop-app/shared/types';

export abstract class ServiceGateway {
  abstract getAllServices(): Observable<ServiceDto[]>
}
