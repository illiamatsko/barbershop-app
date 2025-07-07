import { Observable } from 'rxjs';
import { BarberDto } from '@barbershop-app/shared/types';

export abstract class BarberGateway {
  abstract getAllBarbers(): Observable<BarberDto[]>
}
