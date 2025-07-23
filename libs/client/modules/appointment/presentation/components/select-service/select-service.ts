import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { BarberStore, ServiceStore } from '@barbershop-app/client/core/application';
import { ServiceCardCompact } from '@barbershop-app/client/shared/presentation';


@Component({
  selector: 'app-select-service',
  imports: [ServiceCardCompact],
  templateUrl: './select-service.html',
  styleUrl: './select-service.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectService {
  barberStore = inject(BarberStore);
  serviceStore = inject(ServiceStore);

  selectedBarberId = input.required<number>();
  selectedServiceId = input.required<number>();
  selectedServiceIdOutput = output<number>();

  constructor() {
    effect(() => {
      const id = this.selectedBarberId();
      const all = this.barberStore.servicesByBarberId();
      if (!all[id]) {
        this.barberStore.setBarberServicesIds(id);
      }
    });
  }

  serviceIds = computed(() => this.barberStore.servicesByBarberId()[this.selectedBarberId()] ?? []);
  services = computed(() =>
    this.serviceStore.services().filter(service =>
      this.serviceIds().includes(service.id)
    )
  );

  onClick(id: number) {
    this.selectedServiceIdOutput.emit(id);
  }
}
