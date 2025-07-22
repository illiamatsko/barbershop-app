import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';
import { NgOptimizedImage } from '@angular/common';
import { CalendarIcon } from '@barbershop-app/client/shared/presentation';


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

  getRelativeCloudinaryPath(fullUrl: string): string {
    const path = fullUrl.split('/');
    const len = path.length;
    return path[len-2] + '/' + path[len-1];
  }
}
