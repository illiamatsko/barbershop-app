import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarberSummaryDto } from '@barbershop-app/shared/types';
import { NgOptimizedImage } from '@angular/common';
import { CalendarIcon } from '@barbershop-app/shared/ui';


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
  imgUrl =
    'https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg';
}
