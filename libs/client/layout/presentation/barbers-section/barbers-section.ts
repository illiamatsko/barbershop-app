import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { BarberSummaryDto } from '@barbershop-app/shared/types';
import { BarberCard } from './barber-card/barber-card';
import { InViewDirective, RightArrowIcon, LeftArrowIcon } from '@barbershop-app/shared/ui';
import { BarberStore } from '@barbershop-app/client/core/application';


@Component({
  selector: 'app-barbers-section',
  imports: [BarberCard, InViewDirective, LeftArrowIcon, RightArrowIcon],
  templateUrl: './barbers-section.html',
  styleUrl: './barbers-section.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarbersSection implements OnInit {
  private barberStore = inject(BarberStore)
  barbers = signal<BarberSummaryDto[]>([]);

  async ngOnInit() {
    this.barbers.set(this.barberStore.barbers());
  }
}
