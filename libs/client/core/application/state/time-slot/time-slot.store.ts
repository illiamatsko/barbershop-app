import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialTimeSlotState, TimeSlotState } from './time-slot.state';
import { TimeSlotDto } from '@barbershop-app/shared/domain';

export const TimeSlotStore = signalStore(
  { providedIn: 'root' },
  withState<TimeSlotState>(initialTimeSlotState),
  withMethods(store => ({
    addTimeSlots: (slots: TimeSlotDto[], date: Date) =>
      patchState(store, (state) => ({
        timeSlots: [...state.timeSlots, ...slots],
        loadedDates: [...state.loadedDates, date]
      }))
  }))
);
