import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ExpandArrowIcon, ScissorsIcon, ServiceCardCompact } from '@barbershop-app/client/shared/presentation';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-select-service',
  imports: [ServiceCardCompact, ExpandArrowIcon, ScissorsIcon, NgClass],
  templateUrl: './select-service.html',
  styleUrl: './select-service.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectService {
  private bookingFlowStore = inject(BookingFlowStore);
  services = this.bookingFlowStore.availableServices;
  selectedServiceId = this.bookingFlowStore.serviceId;
  isOpen = signal(true);

  toggleOpen() {
    this.isOpen.update((v) => !v);
  }

  onSelectService(id: number) {
    this.bookingFlowStore.toggleSelectService(id);
  }
}
