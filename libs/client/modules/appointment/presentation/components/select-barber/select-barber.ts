import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BarberCard } from './barber-card/barber-card';
import { ExpandArrowIcon } from '@barbershop-app/client/shared/presentation';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-select-barber',
  imports: [BarberCard, ExpandArrowIcon, NgClass],
  templateUrl: './select-barber.html',
  styleUrl: './select-barber.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
