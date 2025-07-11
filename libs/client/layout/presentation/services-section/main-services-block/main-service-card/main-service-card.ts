import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '@barbershop-app/shared/ui';
import { ServiceDto } from '@barbershop-app/shared/types';


@Component({
  selector: 'app-main-service-card',
  imports: [CommonModule, InViewDirective],
  templateUrl: './main-service-card.html',
  styleUrl: './main-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainServiceCard {
  service = input.required<ServiceDto>();
  animationDuration = input.required<number>();
}
