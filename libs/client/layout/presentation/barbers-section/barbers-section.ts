import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { BarberDto } from '@barbershop-app/shared/types';
import { GetAllBarbersUseCase } from '@barbershop-app/client/barber/application';
import { BarberCard } from './barber-card/barber-card';


@Component({
  selector: 'app-barbers-section',
  imports: [BarberCard],
  templateUrl: './barbers-section.html',
  styleUrl: './barbers-section.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarbersSection implements OnInit {
  private getAllBarbersUseCase = inject(GetAllBarbersUseCase);
  barbers = signal<BarberDto[]>([]);

  async ngOnInit() {
    this.barbers.set(await this.getAllBarbersUseCase.execute());
  }
}
