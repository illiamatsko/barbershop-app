import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BarbershopCard } from './barbershop-card/barbershop-card';
import { ExpandArrowIcon } from '@barbershop-app/client/shared/presentation';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-select-barbershop',
  imports: [BarbershopCard, ExpandArrowIcon, NgClass],
  templateUrl: './select-barbershop.html',
  styleUrl: './select-barbershop.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
