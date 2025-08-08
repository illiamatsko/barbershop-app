import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BarbershopCard } from './barbershop-card/barbershop-card';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ExpandArrowIcon } from '@barbershop-app/client/shared/presentation';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';


@Component({
  selector: 'app-select-barbershop',
  imports: [BarbershopCard, ExpandArrowIcon],
  templateUrl: './select-barbershop.html',
  styleUrl: './select-barbershop.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', opacity: 1, padding: '*' })),
      state('closed', style({ height: '0px', opacity: 1, padding: '0px' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SelectBarbershop {
  bookingFlowStore = inject(BookingFlowStore);
  barbershops = this.bookingFlowStore.availableBarbershops;
  selectedBarbershopId = this.bookingFlowStore.barbershopId;
  isOpen = signal(true);

  toggleOpen() {
    this.isOpen.update((v) => !v);
  }

  onSelectBarbershop(id: number) {
    this.bookingFlowStore.toggleSelectBarbershop(id);
  }
}
