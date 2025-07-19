import {
  ChangeDetectionStrategy,
  Component, computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject
} from '@angular/core';
import { BarberCard } from './barber-card/barber-card';
import { InViewDirective, RightArrowIcon, LeftArrowIcon } from '../../../../shared';
import { BarberStore } from '@barbershop-app/client/core/application';


@Component({
  selector: 'app-barbers-section',
  imports: [BarberCard, InViewDirective, LeftArrowIcon, RightArrowIcon],
  templateUrl: './barbers-section.html',
  styleUrl: './barbers-section.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarbersSection {
  private barberStore = inject(BarberStore)
  barbers = computed(() => this.barberStore.barbers());
}
