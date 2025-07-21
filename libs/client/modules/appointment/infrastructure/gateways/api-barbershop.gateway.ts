import { BarbershopGateway } from '@barbershop-app/client/appointment/domain';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BarbershopDto } from '@barbershop-app/shared/domain';
import { environment } from '@env/environment';

export class ApiBarbershopGateway implements BarbershopGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  getAll() {
    return this.httpClient.get<BarbershopDto[]>(`${this.API_URL}/barbershop/all`)
  }
}
