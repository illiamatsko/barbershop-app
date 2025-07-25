import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockIcon } from '../icons/clock-icon/clock-icon';
import { ServiceTooltip } from '../service-tooltip/service-tooltip';


@Component({
  selector: 'lib-service-card-compact',
  imports: [CommonModule, ClockIcon, ServiceTooltip],
  templateUrl: './service-card-compact.html',
  styleUrl: './service-card-compact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardCompact {
  name = input.required<string>();
  duration = input.required<number>();
  description = input.required<string>();
  minPrice = input.required<number>();
  allowBooking = input<boolean>(true);
}
