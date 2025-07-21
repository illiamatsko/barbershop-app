import { AppointmentDto } from '@barbershop-app/shared/domain';
import { AppointmentGateway } from '@barbershop-app/client/appointment/domain';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


export class ApiAppointmentGateway implements AppointmentGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  createAppointment(appointmentDto: AppointmentDto) {
    this.httpClient.post<AppointmentDto>(`${this.API_URL}/auth/sign-in`, appointmentDto)
  }
}
