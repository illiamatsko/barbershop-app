import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDto } from '@barbershop-app/shared/types';
import { ClockIcon } from '../../../../../../shared';


@Component({
  selector: 'app-additional-service-tooltip',
  imports: [CommonModule, ClockIcon],
  templateUrl: './additional-service-tooltip.html',
  styleUrl: './additional-service-tooltip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceTooltip {
  service = input.required<ServiceDto>();
}
