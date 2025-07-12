import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalServiceCard } from './additional-service-card/additional-service-card';
import { InViewDirective } from '@barbershop-app/shared/ui';
import { ServiceDto } from '@barbershop-app/shared/types';


@Component({
  selector: 'app-additional-service-block',
  imports: [CommonModule, AdditionalServiceCard, InViewDirective],
  templateUrl: './additional-service-block.html',
  styleUrl: './additional-service-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceBlock {
  services = input.required<ServiceDto[]>();
}
