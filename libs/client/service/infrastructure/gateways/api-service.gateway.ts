import { Observable } from 'rxjs';
import { ServiceDto } from '@barbershop-app/shared/types';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@barbershop-app/shared/env';
import { ServiceGateway } from '@barbershop-app/client/service/domain';


export class ApiServiceGateway implements ServiceGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  getAllServices(): Observable<ServiceDto[]> {
    return this.httpClient.get<ServiceDto[]>(`${this.API_URL}/service/all`);
  }
}
