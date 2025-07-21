import { Observable } from 'rxjs';
import { ServiceDto } from '@barbershop-app/shared/domain';

export abstract class ServiceGateway {
  abstract getAllServices(): Observable<ServiceDto[]>
}
