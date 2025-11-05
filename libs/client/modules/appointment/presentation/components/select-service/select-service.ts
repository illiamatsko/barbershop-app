import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ExpandArrowIcon, ScissorsIcon, ServiceCardCompact } from '@barbershop-app/client/shared/presentation';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';
import {NgClass} from "@angular/common";
import { ServiceStore } from '@barbershop-app/client/core/application';
import { ServiceDto } from '@barbershop-app/shared/domain';


@Component({
  selector: 'app-select-service',
  imports: [ServiceCardCompact, ExpandArrowIcon, ScissorsIcon, NgClass],
  templateUrl: './select-service.html',
  styleUrl: './select-service.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectService {
  private bookingFlowStore = inject(BookingFlowStore);
  private serviceStore = inject(ServiceStore);
  services = this.bookingFlowStore.availableServices;
  selectedServiceId = this.bookingFlowStore.serviceId;
  isOpen = signal(true);

  getPrice(service: ServiceDto) {
    const barber = this.bookingFlowStore.selectedBarber();
    const prices = barber
      ? this.serviceStore.pricesByBarberStatus().get(barber.status)
      : null;

    const price = prices?.find(p => p.serviceId === service.id)?.price;

    return {
      isPriceMin: !price,
      price: price ?? service.minPrice
    };
  }



  toggleOpen() {
    this.isOpen.update((v) => !v);
  }

  onSelectService(id: number) {
    this.bookingFlowStore.toggleSelectService(id);
  }
}
