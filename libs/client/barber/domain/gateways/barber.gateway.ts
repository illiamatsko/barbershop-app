import { Observable } from 'rxjs';
import { BarberDto, BarberStatusDto } from '@barbershop-app/shared/types';

export abstract class BarberGateway {
  abstract getAllBarbers(): Observable<BarberDto[]>

  abstract getBarberStatuses(): Observable<BarberStatusDto[]>
}
