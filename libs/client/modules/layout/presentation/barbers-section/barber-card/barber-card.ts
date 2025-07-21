import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarberSummaryDto } from '@barbershop-app/shared/types';
import { NgOptimizedImage } from '@angular/common';
import { CalendarIcon } from '../../../../../shared';


@Component({
  selector: 'app-barber-card',
  imports: [NgOptimizedImage, CalendarIcon],
  templateUrl: './barber-card.html',
  styleUrl: './barber-card.css',
  schemas: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarberCard {
  barber = input.required<BarberSummaryDto>();
}
