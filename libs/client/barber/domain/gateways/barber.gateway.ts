import { Observable } from 'rxjs';
import { BarberStatusDto, BarberSummaryDto } from '@barbershop-app/shared/types';

export abstract class BarberGateway {
  abstract getAllBarbers(): Observable<BarberSummaryDto[]>

  abstract getBarberStatuses(): Observable<BarberStatusDto[]>
}
