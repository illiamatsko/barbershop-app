import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RoundHalfWithYearsPipe } from '@barbershop-app/client/shared/presentation';


@Component({
  selector: 'app-barber-card',
  imports: [NgOptimizedImage, RoundHalfWithYearsPipe, NgClass],
  templateUrl: './barber-card.html',
  styleUrl: './barber-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarberCard {
  barber = input.required<BarberSummaryDto>();
  isSelected = input.required<boolean>();

  getRelativeCloudinaryPath(fullUrl: string): string {
    const path = fullUrl.split('/');
    const len = path.length;
    return path[len-2] + '/' + path[len-1];
  }
}
