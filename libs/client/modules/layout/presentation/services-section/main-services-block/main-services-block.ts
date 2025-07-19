import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServiceCard } from './main-service-card/main-service-card';
import { ServiceDto } from '@barbershop-app/shared/types';
import { InViewDirective } from '../../../../../shared';


@Component({
  selector: 'app-main-services-block',
  imports: [CommonModule, MainServiceCard, InViewDirective],
  templateUrl: './main-services-block.html',
  styleUrls: ['./main-services-block.css', '../services-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainServicesBlock {
  services = input.required<ServiceDto[]>();
}
