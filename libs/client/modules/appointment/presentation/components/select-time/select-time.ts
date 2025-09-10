import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ClockIcon } from '@barbershop-app/client/shared/presentation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { GetBarberTimeSlotsByDate } from '../../../../barber/application/use-cases/get-barber-time-slots-by-date';

type Slot = {
  at: string;        // '10:00'
  label: string;     // '10:00'
  duration: number;  // хвилини
  level: string;     // 'Standard' | 'Senior' | 'Top'
  price: number;     // грн
};

function pad(n: number) { return n.toString().padStart(2, '0'); }
function dateKey(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }

// зручний генератор часових слотів (кожні X хв у проміжку)
function generateSlots(from: string, to: string, stepMin: number, base: Partial<Slot> = {}): Slot[] {
  const [fh, fm] = from.split(':').map(Number);
  const [th, tm] = to.split(':').map(Number);
  const start = fh * 60 + fm;
  const end = th * 60 + tm;

  const result: Slot[] = [];
  for (let m = start; m <= end; m += stepMin) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const label = `${pad(h)}:${pad(mm)}`;
    result.push({
      at: label,
      label,
      duration: base.duration ?? 30,
      level: base.level ?? 'Standard',
      price: base.price ?? 350,
    });
  }
  return result;
}

@Component({
  selector: 'app-select-time',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    NgClass,
    ClockIcon,
  ],
  templateUrl: './select-time.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', opacity: 1, padding: '*' })),
      state('closed', style({ height: '0px', opacity: 1, padding: '0px' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SelectTime {
  private getBarberTimeslotsByDate = inject(GetBarberTimeSlotsByDate);

  isOpen = signal(true);
  toggleOpen() {
    this.isOpen.update((v) => !v);
  }

  // модель календаря
  selectedDateModel: Date | null = new Date();

  // обмеження/вимкнуті дати
  minDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  maxDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 15
  );

  selectedSlot = signal<Slot | null>(null);


  async onSelectDate(date: Date) {
    this.selectedDateModel = date;
    this.selectedSlot.set(null);
    console.log(await this.getBarberTimeslotsByDate.execute(1, date));
  }

  onSelectSlot(slot: Slot) {
    this.selectedSlot.update((cur) => cur && cur.at === slot.at ? null : slot);
  }
}
