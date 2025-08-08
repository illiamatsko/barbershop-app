import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BarberCard } from './barber-card/barber-card';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ExpandArrowIcon } from '@barbershop-app/client/shared/presentation';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';


@Component({
  selector: 'app-select-barber',
  imports: [BarberCard, ExpandArrowIcon],
  templateUrl: './select-barber.html',
  styleUrl: './select-barber.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', opacity: 1, padding: '*' })),
      state('closed', style({ height: '0px', opacity: 1, padding: '0px' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SelectBarber {
  private bookingFlowStore = inject(BookingFlowStore);
  barbers = this.bookingFlowStore.availableBarbers;
  selectedBarberId = this.bookingFlowStore.barberId;
  isOpen = signal(true);

  toggleOpen() {
    this.isOpen.update((v) => !v);
  }

  onSelectBarber(id: number) {
    this.bookingFlowStore.toggleSelectBarber(id);
  }

  protected readonly computed = computed;
}
