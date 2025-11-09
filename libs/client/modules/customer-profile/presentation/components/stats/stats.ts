import { ChangeDetectionStrategy, Component, input } from '@angular/core';


@Component({
  selector: 'app-profile-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stats {
  stats = input.required<{ count: number, futureCount: number, moneySpent: number }>();
}
