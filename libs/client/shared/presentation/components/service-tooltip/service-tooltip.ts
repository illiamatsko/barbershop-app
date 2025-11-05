import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockIcon } from '../icons/clock-icon/clock-icon';


@Component({
  selector: 'lib-service-tooltip',
  imports: [CommonModule, ClockIcon],
  templateUrl: './service-tooltip.html',
  styleUrl: './service-tooltip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceTooltip {
  name = input.required<string>();
  duration = input.required<number>();
  description = input.required<string>();
  price = input.required<number>();
  isPriceMin = input<boolean>(false);
  allowBooking = input.required<boolean>();
}
