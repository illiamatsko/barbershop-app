import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-barber-status-card',
  imports: [CommonModule],
  templateUrl: './barber-status-card.html',
  styleUrl: './barber-status-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarberStatusCard {

}
