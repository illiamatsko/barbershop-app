import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertiseLevelsBlock } from './expertise-levels-block/expertise-levels-block';
import { MainServicesBlock } from './main-services-block/main-services-block';
import { AdditionalServiceBlock } from './additional-service-block/additional-service-block';
import { InViewDirective } from '@barbershop-app/client/shared/presentation';
import { BarberStatusDto } from '@barbershop-app/shared/domain';
import { firstValueFrom } from 'rxjs';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { ServiceStore } from '@barbershop-app/client/core/application';


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
  private serviceStore = inject(ServiceStore);

  mainServices = computed(() => this.serviceStore.services().filter(service => service.isMain));
  additionalServices = computed(() => this.serviceStore.services().filter(service => !service.isMain));
  barberStatuses = signal<BarberStatusDto[]>([]);

  async ngOnInit() {
    this.barberStatuses.set(await firstValueFrom(this.barberGateway.getBarberStatuses()));
  }
}
