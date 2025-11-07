import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockIcon, InViewDirective, ScissorsIcon } from '@barbershop-app/client/shared/presentation';
import { ServiceDto } from '@barbershop-app/shared/domain';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-service-card',
  imports: [CommonModule, InViewDirective, ClockIcon, ScissorsIcon],
  templateUrl: './main-service-card.html',
  styleUrl: './main-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainServiceCard {
  private router = inject(Router);

  service = input.required<ServiceDto>();
  animationDuration = input.required<number>();

  navigateToBooking() {
    this.router.navigate(['/appointment/create'], {
      queryParams: {
        serviceId: this.service().id
      },
      queryParamsHandling: 'merge'
    }).then();
  }
}
