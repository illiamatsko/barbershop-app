import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberStatusDto } from '../@barbershop-app/shared/domain';


@Component({
  selector: 'app-barber-status-card',
  imports: [CommonModule],
  templateUrl: './barber-status-card.html',
  styleUrl: './barber-status-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarberStatusCard {
  barberStatus = input.required<BarberStatusDto>();
}
