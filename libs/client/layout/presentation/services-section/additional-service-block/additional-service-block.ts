import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalServiceCard } from './additional-service-card/additional-service-card';
import { InViewDirective } from '@barbershop-app/shared/ui';


@Component({
  selector: 'app-additional-service-block',
  imports: [CommonModule, AdditionalServiceCard, InViewDirective],
  templateUrl: './additional-service-block.html',
  styleUrl: './additional-service-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceBlock {}
