import { CreateAppointmentPayload, } from '@barbershop-app/shared/domain';
import { AppointmentGateway } from '@barbershop-app/client/appointment/domain';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


export class ApiAppointmentGateway implements AppointmentGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  createAppointment(createAppointmentPayload: CreateAppointmentPayload) {
    this.httpClient.post(`${this.API_URL}/appointment/create`, createAppointmentPayload).subscribe();
  }
}
