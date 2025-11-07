import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-profile-overview',
  imports: [],
  templateUrl: './profile-overview.html',
  styleUrl: './profile-overview.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOverview {}
