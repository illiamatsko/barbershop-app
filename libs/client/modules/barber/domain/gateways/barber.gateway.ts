import { Observable } from 'rxjs';
import { BarberStatusDto, BarberSummaryDto } from '@barbershop-app/shared/domain';

export abstract class BarberGateway {
  abstract getAllBarbers(): Observable<BarberSummaryDto[]>

  abstract getBarberStatuses(): Observable<BarberStatusDto[]>
}
