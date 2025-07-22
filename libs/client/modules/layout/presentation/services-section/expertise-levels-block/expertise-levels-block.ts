import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberStatusCard } from './barber-status-card/barber-status-card';
import { InViewDirective } from '@barbershop-app/client/shared/presentation';
import { BarberStatusDto } from '@barbershop-app/shared/domain';


@Component({
  selector: 'app-expertise-levels-block',
  imports: [CommonModule, BarberStatusCard, InViewDirective],
  templateUrl: './expertise-levels-block.html',
  styleUrls: ['./expertise-levels-block.css', '../services-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseLevelsBlock {
  barberStatuses = input.required<BarberStatusDto[]>();
}
