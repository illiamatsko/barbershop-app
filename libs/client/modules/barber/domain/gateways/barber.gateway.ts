import { Observable } from 'rxjs';
import { BarberStatusDto, BarberSummaryDto, TimeSlotDto } from '@barbershop-app/shared/domain';

export abstract class BarberGateway {
  abstract getAllBarbers(): Observable<BarberSummaryDto[]>

  abstract getBarberStatuses(): Observable<BarberStatusDto[]>

  abstract getTimeSlotsByDate(date: Date): Observable<TimeSlotDto[]>
}
