import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective, ServiceCardCompact } from '@barbershop-app/client/shared/presentation';
import { ServiceDto } from '@barbershop-app/shared/domain';
import { Router } from '@angular/router';


@Component({
  selector: 'app-additional-service-block',
  imports: [CommonModule, InViewDirective, ServiceCardCompact],
  templateUrl: './additional-service-block.html',
  styleUrls: ['./additional-service-block.css', '../services-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServiceBlock {
  private router = inject(Router);

  services = input.required<ServiceDto[]>();

  navigateToBooking(serviceId: number) {
    this.router.navigate(['/appointment/create'], {
      queryParams: {
        serviceId
      },
      queryParamsHandling: 'merge'
    }).then()
  }
}
