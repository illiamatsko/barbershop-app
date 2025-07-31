import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ExpandArrowIcon, ScissorsIcon, ServiceCardCompact } from '@barbershop-app/client/shared/presentation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';


@Component({
  selector: 'app-select-service',
  imports: [ServiceCardCompact, ExpandArrowIcon, ScissorsIcon],
  templateUrl: './select-service.html',
  styleUrl: './select-service.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', opacity: 1, padding: '*' })),
      state('closed', style({ height: '0px', opacity: 1, padding: '0px' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SelectService {
  bookingFlowStore = inject(BookingFlowStore);
  services = this.bookingFlowStore.availableServices;
  selectedServiceId = this.bookingFlowStore.selectedServiceId;
  isOpen = signal(true);

  toggleOpen() {
    this.isOpen.update((v) => !v);
  }

  onSelectService(id: number) {
    this.bookingFlowStore.toggleSelectService(id);
  }
}
