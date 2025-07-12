import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDto } from '@barbershop-app/shared/types';


@Component({
  selector: 'app-additional-service-card',
  imports: [CommonModule],
  templateUrl: './additional-service-card.html',
  styleUrl: './additional-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceCard {
  service = input.required<ServiceDto>();
}
