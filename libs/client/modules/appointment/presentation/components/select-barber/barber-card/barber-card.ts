import { ChangeDetectionStrategy, Component, input } from '@angular/core';


@Component({
  selector: 'app-barber-card',
  imports: [],
  templateUrl: './barber-card.html',
  styleUrl: './barber-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarberCard {
  barber = input.required<BarberDto>();
}
