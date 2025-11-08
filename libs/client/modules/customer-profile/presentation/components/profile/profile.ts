import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Header } from '@barbershop-app/client/shared/presentation';
import { Stats } from '../stats/stats';
import { ProfileOverview } from '../profile-overview/profile-overview';
import { Appointments } from '../appointments/appointments';
import { AuthStore } from '@barbershop-app/client/core/application';
import { AppointmentInfoDto } from '@barbershop-app/shared/domain';


@Component({
  selector: 'app-profile',
  imports: [Header, Stats, ProfileOverview, Appointments],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private authStore = inject(AuthStore);

  isSignedIn = this.authStore.isSignedIn;
  user = this.authStore.user;
  appointmets: AppointmentInfoDto[] = [];

  ngOnInit() {
    console.log('get stats');
    console.log('get appointments');
  }
}
