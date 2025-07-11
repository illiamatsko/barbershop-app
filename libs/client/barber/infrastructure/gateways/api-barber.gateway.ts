import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { Observable } from 'rxjs';
import { BarberDto, BarberStatusDto } from '@barbershop-app/shared/types';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@barbershop-app/shared/env';


export class ApiBarberGateway implements BarberGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  getAllBarbers(): Observable<BarberDto[]> {
    return this.httpClient.get<BarberDto[]>(`${this.API_URL}/barber/all`);
  }

  getBarberStatuses(): Observable<BarberStatusDto[]> {
    return this.httpClient.get<BarberStatusDto[]>(`${this.API_URL}/barber/statuses`);
  }
}
