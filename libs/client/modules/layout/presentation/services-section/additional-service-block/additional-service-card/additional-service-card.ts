import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDto } from '@barbershop-app/shared/types';
import { ClockIcon } from '../../../../../../shared';
import { AdditionalServiceTooltip } from '../additioanl-service-tooltip/additional-service-tooltip';


@Component({
  selector: 'app-additional-service-card',
  imports: [CommonModule, ClockIcon, AdditionalServiceTooltip],
  templateUrl: './additional-service-card.html',
  styleUrl: './additional-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceCard {
  service = input.required<ServiceDto>();
}
