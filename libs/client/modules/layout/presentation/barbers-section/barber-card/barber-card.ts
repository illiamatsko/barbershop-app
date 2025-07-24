import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';
import { NgOptimizedImage } from '@angular/common';
import { CalendarIcon } from '@barbershop-app/client/shared/presentation';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-barber-card',
  imports: [NgOptimizedImage, CalendarIcon, RouterLink],
  templateUrl: './barber-card.html',
  styleUrl: './barber-card.css',
  schemas: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarberCard {
  private router = inject(Router);
  barber = input.required<BarberSummaryDto>();

  getRelativeCloudinaryPath(fullUrl: string) {
    const path = fullUrl.split('/');
    const len = path.length;
    return path[len - 2] + '/' + path[len - 1];
  }

  navigateToBooking() {
    this.router.navigate(['/appointment/create'], {
      queryParams: {
        barberId: this.barber().id,
        step: 'service'
      }
    }).then();
  }

}
