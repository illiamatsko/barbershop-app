import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ClockIcon } from '@barbershop-app/client/shared/presentation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TimeSlotDto } from '@barbershop-app/shared/domain';
import { BookingFlowStore } from '@barbershop-app/client/appointment/application';
import { TimeSlotStore } from '@barbershop-app/client/core/application';
import { GetTimeSlotsByDate } from '@barbershop-app/client/barber/application';


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
  private timeSlotStore = inject(TimeSlotStore);
  private bookingFlowStore = inject(BookingFlowStore);
  private getTimeSlotsByDate = inject(GetTimeSlotsByDate);
  isOpen = signal(true);
  selectedDate = signal<Date | null>(null);
  slotsForSelectedDate = signal<TimeSlotDto[]>([]);
  selectedSlot = signal<TimeSlotDto | null>(null);

  selectedDateModel: Date | null = new Date();


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

  async onSelectDate(date: Date) {
    const isDateLoaded = this.timeSlotStore.loadedDates().includes(date);
    if(!isDateLoaded) {
      this.slotsForSelectedDate.set(await this.getTimeSlotsByDate.execute(date));
    } else {
      this.slotsForSelectedDate.set(this.timeSlotStore.timeSlots().filter(slot => slot.startTime.getDate() === date.getDate()));
    }
    //this should be in the booking flow store


    this.selectedDateModel = date;
    this.selectedDate.set(date);
    this.selectedSlot.set(null);

    // const slots = await this.getBarberTimeslotsByDate.execute(4, date);
    // const mappedSlots = slots.map(slot => {
    //   const slotDate = new Date(slot.startTime);
    //   return { ...slot, startTime: slotDate }
    // }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime()).filter(slot => slot.status === 'AVAILABLE')
    //
    // this.slotsForSelectedDate.set(
    //   mappedSlots.filter(slot => slot.startTime.getDate() === date.getDate())
    // );
    // console.log(this.slotsForSelectedDate())
  }

  onSelectSlot(slot: TimeSlotDto) {
    this.selectedSlot.set(slot);
    this.bookingFlowStore.toggleSelectTimeSlot(slot.id);
  }
}
