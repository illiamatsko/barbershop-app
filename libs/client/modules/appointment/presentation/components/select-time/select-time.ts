import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ClockIcon } from '@barbershop-app/client/shared/presentation';

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
})
export class SelectTime {
  // відкриття/закриття секції
  private _open = signal(true);
  isOpen = this._open.asReadonly();
  toggleOpen() {
    this._open.set(!this._open());
  }

  // модель календаря
  selectedDateModel: Date | null = new Date();

  // обмеження/вимкнуті дати
  minDate = new Date();
  maxDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 14
  );
  disabledDates: Date[] = [];

  // вибраний слот
  selectedSlot = signal<Slot | null>(null);

  /**
   * КАСТОМНІ СЛОТИ ДЛЯ КОНКРЕТНИХ ДАТ
   * ключ — 'yyyy-mm-dd'
   */
  customSlotsByDate: Record<string, Slot[]> = {
    // приклад: сьогодні — більше слотів і різні рівні/ціни
    [dateKey(new Date())]: [
      ...generateSlots('09:00', '12:00', 30, {
        duration: 30,
        level: 'Standard',
        price: 350,
      }),
      ...generateSlots('13:00', '15:00', 30, {
        duration: 45,
        level: 'Senior',
        price: 450,
      }),
      ...generateSlots('16:00', '18:00', 30, {
        duration: 60,
        level: 'Top',
        price: 600,
      }),
    ],
    // ще одна дата з кастомними слотами
    ['2025-09-10']: [
      ...generateSlots('10:00', '13:00', 20, {
        duration: 20,
        level: 'Standard',
        price: 300,
      }),
      ...generateSlots('14:00', '16:00', 30, {
        duration: 30,
        level: 'Senior',
        price: 420,
      }),
    ],
  };

  /**
   * ДЕФОЛТНІ СЛОТИ (якщо дати немає в customSlotsByDate)
   */
  private defaultSlotsFor(date: Date): Slot[] {
    // приклад: неділя (0) — порожньо
    if (date.getDay() === 0) return [];
    // інакше — стандартний набір
    return [
      {
        at: '10:00',
        label: '10:00',
        duration: 30,
        level: 'Standard',
        price: 350,
      },
      {
        at: '10:30',
        label: '10:30',
        duration: 30,
        level: 'Standard',
        price: 350,
      },
      {
        at: '11:00',
        label: '11:00',
        duration: 45,
        level: 'Senior',
        price: 450,
      },
      { at: '12:00', label: '12:00', duration: 60, level: 'Top', price: 600 },
      {
        at: '14:00',
        label: '14:00',
        duration: 30,
        level: 'Standard',
        price: 350,
      },
      {
        at: '15:30',
        label: '15:30',
        duration: 45,
        level: 'Senior',
        price: 450,
      },
    ];
  }

  // Список слотів на обрану дату: спершу кастомні, інакше дефолтні
  timeSlots = computed<Slot[]>(() => {
    const d = this.selectedDateModel;
    if (!d) return [];

    const key = dateKey(d);
    const list = this.customSlotsByDate[key] ?? this.defaultSlotsFor(d);

    // уніфікація: прибрати дублікати по часу, відсортувати по часу
    const uniq = new Map<string, Slot>();
    for (const s of list) if (!uniq.has(s.at)) uniq.set(s.at, s);
    return Array.from(uniq.values()).sort((a, b) => a.at.localeCompare(b.at));
  });

  onSelectDate(date: Date) {
    this.selectedDateModel = date;
    this.selectedSlot.set(null); // скинути слот при зміні дати
  }

  onSelectSlot(slot: Slot) {
    const cur = this.selectedSlot();
    this.selectedSlot.set(cur && cur.at === slot.at ? null : slot);
  }

  isSelectedSlot = (slot: Slot) => this.selectedSlot()?.at === slot.at;
  trackSlot = (_: number, s: Slot) => s.at;
}
