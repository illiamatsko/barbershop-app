import { inject, Injectable } from '@angular/core';
import { CustomerProfileGateway } from '@barbershop-app/client/customer-profile/domain';
import {
  AppointmentDto,
  AppointmentInfoDto,
  environment,
} from '@barbershop-app/shared/domain';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ApiCustomerProfileGateway implements CustomerProfileGateway {
  private API_URL = environment.apiUrl;
  private http = inject(HttpClient);

  getCustomerAppointmentsInfo(
    customerId: number
  ): Promise<AppointmentInfoDto[]> {
    return firstValueFrom(
      this.http.get<AppointmentInfoDto[]>(
        `${this.API_URL}/appointment/info/${customerId}`
      )
    );
  }

  getFullAppointment(appointmentId: number): Promise<AppointmentDto> {
    return firstValueFrom(
      this.http.get<AppointmentDto>(
        `${this.API_URL}/appointment/full/${appointmentId}`
      )
    );
  }

  cancelAppointment(appointmentId: number): Promise<boolean> {
    return firstValueFrom(
      this.http.post<boolean>(
        `${this.API_URL}/appointment/cancel/${appointmentId}`, {}
      )
    );
  }
}
