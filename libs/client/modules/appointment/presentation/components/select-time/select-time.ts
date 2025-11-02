import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ClockIcon } from '@barbershop-app/client/shared/presentation';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';


@Component({
  selector: 'app-select-time',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerModule, NgClass, ClockIcon],
  templateUrl: './select-time.html',
  styleUrl: './select-time.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTime {
  private bookingFlowStore = inject(BookingFlowStore);
  isOpen = signal(true);
  timesForSelectedDate = this.bookingFlowStore.availableTimes;
  selectedDateTime = this.bookingFlowStore.selectedDateTime;
  isTimeSelected = computed(() => this.bookingFlowStore.time() !== null);

  selectedDateModel: Date = new Date(this.bookingFlowStore.date());

  constructor() {
    effect(() => {
      this.selectedDateModel = new Date(this.bookingFlowStore.date());
    });
  }

  toggleOpen() {
    this.isOpen.update((v) => !v);
  }

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

  onSelectDate(date: Date) {
    const localDateString = this.toLocalDateString(date);
    this.bookingFlowStore.selectDate(localDateString, true);
  }

  private toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSelectTime(time: string) {
    this.bookingFlowStore.toggleSelectTime(time.split('T')[1]);
  }
}
