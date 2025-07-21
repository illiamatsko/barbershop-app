import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalServiceCard } from './additional-service-card/additional-service-card';
import { InViewDirective } from '@barbershop-app/shared/presentation';
import { ServiceDto } from '@barbershop-app/shared/domain';


@Component({
  selector: 'app-additional-service-block',
  imports: [CommonModule, AdditionalServiceCard, InViewDirective],
  templateUrl: './additional-service-block.html',
  styleUrls: ['./additional-service-block.css', '../services-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceBlock {
  services = input.required<ServiceDto[]>();
}
