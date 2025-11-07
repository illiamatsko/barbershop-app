import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '@barbershop-app/client/shared/presentation';
import { Stats } from '../stats/stats';
import { ProfileOverview } from '../profile-overview/profile-overview';
import { Appointments } from '../appointments/appointments';


@Component({
  selector: 'app-profile',
  imports: [Header, Stats, ProfileOverview, Appointments],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {}
