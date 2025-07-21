import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { BarberStore } from '@barbershop-app/client/core/application';
import { BarberCard } from './barber-card/barber-card';


@Component({
  selector: 'app-select-barber',
  imports: [BarberCard],
  templateUrl: './select-barber.html',
  styleUrl: './select-barber.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBarber {
  private barberStore = inject(BarberStore);
  barbers = computed(() =>
    this.barberStore.barbers()
      .filter((barber) => barber.barbershopId === this.selectedBarbershopId()));

  selectedBarbershopId = input.required<number>();
  selectedBarberId = input.required<number>();
  selectedBarberIdOutput = output<number>();

  onClick(id: number) {
    this.selectedBarberIdOutput.emit(id);
  }
}
