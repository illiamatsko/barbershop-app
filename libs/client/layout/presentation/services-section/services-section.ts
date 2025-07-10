import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertiseLevelsBlock } from './expertise-levels-block/expertise-levels-block';
import { MainServicesBlock } from './main-services-block/main-services-block';
import { AdditionalServiceBlock } from './additional-service-block/additional-service-block';
import { InViewDirective } from '@barbershop-app/shared/ui';


@Component({
  selector: 'app-services-section',
  imports: [
    CommonModule,
    ExpertiseLevelsBlock,
    MainServicesBlock,
    AdditionalServiceBlock,
    InViewDirective
  ],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {}
