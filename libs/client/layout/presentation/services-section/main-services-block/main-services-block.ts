import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServiceCard } from './main-service-card/main-service-card';
import { ServiceDto } from '@barbershop-app/shared/types';


@Component({
  selector: 'app-main-services-block',
  imports: [CommonModule, MainServiceCard],
  templateUrl: './main-services-block.html',
  styleUrl: './main-services-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainServicesBlock {
  services = input.required<ServiceDto[]>();
}
