import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { Observable } from 'rxjs';
import { BarberStatusDto, BarberSummaryDto } from '@barbershop-app/shared/types';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


export class ApiBarberGateway implements BarberGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  getAllBarbers(): Observable<BarberSummaryDto[]> {
    return this.httpClient.get<BarberSummaryDto[]>(`${this.API_URL}/barber/all`);
  }

  getBarberStatuses(): Observable<BarberStatusDto[]> {
    return this.httpClient.get<BarberStatusDto[]>(`${this.API_URL}/barber/statuses`);
  }
}
