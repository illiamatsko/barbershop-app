import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialTimeSlotState, TimeSlotState } from './time-slot.state';
import { inject } from '@angular/core';
import { GetTimeSlotsByDate } from '@barbershop-app/client/barber/application';

export const TimeSlotStore = signalStore(
  { providedIn: 'root' },
  withState<TimeSlotState>(initialTimeSlotState),
  withMethods((store) => {
    const getTimeSlotsByDate = inject(GetTimeSlotsByDate);

    return {
      getTimeSlotsByDate: async (date: Date) => {
        if (!store.timeSlots().has(date)) {
          const newMap = new Map(store.timeSlots());
          newMap.set(date, await getTimeSlotsByDate.execute(date))
          patchState(store, () => ({
            timeSlots: newMap
          }))
        }
        return store.timeSlots();
      }
    }
  })
);
