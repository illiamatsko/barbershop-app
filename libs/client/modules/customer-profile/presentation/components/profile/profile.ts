import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Header } from '@barbershop-app/client/shared/presentation';
import { Stats } from '../stats/stats';
import { ProfileOverview } from '../profile-overview/profile-overview';
import { Appointments } from '../appointments/appointments';
import { AuthStore } from '@barbershop-app/client/core/application';
import { AppointmentInfoDto } from '@barbershop-app/shared/domain';
import { GetCustomerAppointmentsInfoUseCase } from '@barbershop-app/client/customer-profile/application';


@Component({
  selector: 'app-profile',
  imports: [Header, Stats, ProfileOverview, Appointments],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private authStore = inject(AuthStore);
  private getCustomerAppointmentsInfoUseCase = inject(GetCustomerAppointmentsInfoUseCase)

  isSignedIn = this.authStore.isSignedIn;
  user = this.authStore.user;

  appointmentsInfo = signal<AppointmentInfoDto[]>([]);
  stats = computed(() => ({
    count: this.appointmentsInfo().filter(a => new Date(a.date) > new Date()).length,
    futureCount: this.appointmentsInfo().filter(a => new Date(a.date) > new Date()).length,
    moneySpent: this.appointmentsInfo()
      .filter(a => new Date(a.date) < new Date() && a.status === 'COMPLETED')
      .reduce((acc, a) => acc + a.price, 0),
  }));

  constructor() {
    effect(async () => {
      const id = this.user.id();
      if(id) {
        this.appointmentsInfo.set(await this.getCustomerAppointmentsInfoUseCase.execute(id));
      }
    });
  }
}
