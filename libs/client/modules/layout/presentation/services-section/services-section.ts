import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertiseLevelsBlock } from './expertise-levels-block/expertise-levels-block';
import { MainServicesBlock } from './main-services-block/main-services-block';
import { AdditionalServiceBlock } from './additional-service-block/additional-service-block';
import { InViewDirective } from '../../../../shared';
import { BarberStatusDto, ServiceDto } from '@barbershop-app/shared/types';
import { ServiceGateway } from '@barbershop-app/client/service/domain';
import { firstValueFrom } from 'rxjs';
import { BarberGateway } from '@barbershop-app/client/barber/domain';


@Component({
  selector: 'app-services-section',
  imports: [
    CommonModule,
    ExpertiseLevelsBlock,
    MainServicesBlock,
    AdditionalServiceBlock,
    InViewDirective
  ],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection implements OnInit {
  private barberGateway = inject(BarberGateway);
  private serviceGateway = inject(ServiceGateway);

  mainServices = signal<ServiceDto[]>([]);
  additionalServices = signal<ServiceDto[]>([]);
  barberStatuses = signal<BarberStatusDto[]>([]);

  async ngOnInit() {
    this.serviceGateway.getAllServices().subscribe({
      next: (res) => {
        this.mainServices.set(res.filter(service => service.isMain));
        this.additionalServices.set(res.filter(service => !service.isMain));
      },
    });
    this.barberStatuses.set(await firstValueFrom(this.barberGateway.getBarberStatuses()));
  }
}
