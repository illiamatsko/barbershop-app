import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ClockIcon } from '@barbershop-app/client/shared/presentation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';


@Component({
  selector: 'app-select-time',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerModule, NgClass, ClockIcon],
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
export class SelectTime implements OnInit {
  private bookingFlowStore = inject(BookingFlowStore);
  isOpen = signal(true);
  timesForSelectedDate = this.bookingFlowStore.availableTimes;
  selectedTime = this.bookingFlowStore.time;

  selectedDateModel: Date = new Date(this.bookingFlowStore.date());

  ngOnInit() {
    this.bookingFlowStore.loadDate(this.bookingFlowStore.date());
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
    this.bookingFlowStore.loadDate(localDateString);
  }

  private toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSelectTime(time: string) {
    this.bookingFlowStore.toggleSelectTime(time);
  }
}
