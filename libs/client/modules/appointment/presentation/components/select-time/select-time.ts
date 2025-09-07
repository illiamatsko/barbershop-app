import { Component, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

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
  imports: [CommonModule, FormsModule, DatePickerModule, CurrencyPipe, NgClass],
  template: `
    <section
      class="p-2 rounded-2xl mb-6 border transition-colors duration-300 overflow-hidden"
      [ngClass]="{
    'border-yellow-500': !!selectedSlot(),
    'border-gray-600/60': !selectedSlot()
  }"
    >
      <header class="flex justify-between items-center px-3 py-3 cursor-pointer" (click)="toggleOpen()">
        <h2 class="text-lg font-semibold text-white flex items-center gap-4">
          <div class="w-14 h-14 text-yellow-500 bg-yellow-900/60 rounded-xl flex items-center justify-center shadow-inner">
            <i class="pi pi-clock text-xl"></i>
          </div>
          <span class="text-2xl">Select Time</span>
        </h2>
        <button class="text-yellow-500">
          <i class="pi" [ngClass]="isOpen() ? 'pi-chevron-up' : 'pi-chevron-down'" style="font-size: 1.6rem"></i>
        </button>
      </header>

      <div [style.height]="isOpen() ? 'auto' : '0px'" class="bg-neutral-900 transition-[height] duration-300 overflow-hidden">
        <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

          <!-- Календар (зліва) -->
          <div class="md:col-span-1">
            <p-datepicker
              [(ngModel)]="selectedDateModel"
              [inline]="true"
              [showIcon]="false"
              [touchUI]="false"
              [minDate]="minDate"
              [maxDate]="maxDate"
              [disabledDates]="disabledDates"
              [dateFormat]="'dd.mm.yy'"
              [showOtherMonths]="true"
              [selectOtherMonths]="true"
              styleClass="rounded-xl border border-gray-600/30 bg-neutral-950 text-gray-100 w-full"
              (onSelect)="onSelectDate($event)"
            ></p-datepicker>
          </div>

          <!-- Слоти (справа) -->
          <div class="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 content-start">
            <ng-container *ngIf="timeSlots().length; else noSlots">
              <button
                *ngFor="let slot of timeSlots(); trackBy: trackSlot"
                (click)="onSelectSlot(slot)"
                class="p-4 rounded-lg cursor-pointer transition-all duration-300 border hover:border-primary text-left"
                [ngClass]="{
              'border-yellow-500 bg-yellow-500/5': isSelectedSlot(slot),
              'border-gray-600/20': !isSelectedSlot(slot)
            }"
              >
                <div class="flex items-center justify-between">
                  <span class="text-white font-semibold text-lg">{{ slot.label }}</span>
                  <span class="text-xs px-2 py-0.5 rounded bg-neutral-800 text-gray-300">
                {{ slot.price | currency:'UAH':'symbol':'1.0-0' }}
              </span>
                </div>
                <div class="text-sm text-gray-400 mt-1">
                  {{ slot.duration }} min • {{ slot.level }}
                </div>
              </button>
            </ng-container>

            <ng-template #noSlots>
              <div class="col-span-full text-gray-400 text-sm">Немає доступних слотів на цю дату.</div>
            </ng-template>
          </div>

        </div>
      </div>
    </section>

    <!-- DEBUG -->
    <div class="text-xs text-gray-400 space-y-1">
      <div>selectedDate: {{ selectedDateModel | date:'yyyy-MM-dd' }}</div>
      <div>selectedSlot: {{ selectedSlot()?.at || '—' }}</div>
    </div>
  `,
})
export class SelectTime {
  // відкриття/закриття секції
  private _open = signal(true);
  isOpen = this._open.asReadonly();
  toggleOpen() { this._open.set(!this._open()); }

  // модель календаря
  selectedDateModel: Date | null = new Date();

  // обмеження/вимкнуті дати
  minDate = new Date();
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 2, 31);
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
      ...generateSlots('09:00', '12:00', 30, { duration: 30, level: 'Standard', price: 350 }),
      ...generateSlots('13:00', '15:00', 30, { duration: 45, level: 'Senior',   price: 450 }),
      ...generateSlots('16:00', '18:00', 30, { duration: 60, level: 'Top',      price: 600 }),
    ],
    // ще одна дата з кастомними слотами
    ['2025-09-10']: [
      ...generateSlots('10:00', '13:00', 20, { duration: 20, level: 'Standard', price: 300 }),
      ...generateSlots('14:00', '16:00', 30, { duration: 30, level: 'Senior',   price: 420 }),
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
      { at: '10:00', label: '10:00', duration: 30, level: 'Standard', price: 350 },
      { at: '10:30', label: '10:30', duration: 30, level: 'Standard', price: 350 },
      { at: '11:00', label: '11:00', duration: 45, level: 'Senior',   price: 450 },
      { at: '12:00', label: '12:00', duration: 60, level: 'Top',      price: 600 },
      { at: '14:00', label: '14:00', duration: 30, level: 'Standard', price: 350 },
      { at: '15:30', label: '15:30', duration: 45, level: 'Senior',   price: 450 },
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
