import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialTimeSlotState, TimeSlotState } from './time-slot.state';
import { TimeSlotDto } from '@barbershop-app/shared/domain';

export const TimeSlotStore = signalStore(
  { providedIn: 'root' },
  withState<TimeSlotState>(initialTimeSlotState),
  withMethods((store) => ({
    addTimeSlots: (date: Date, slots: TimeSlotDto[]) => {
      const newMap = new Map(store.timeSlots());
      newMap.set(date.toISOString(), slots);
      patchState(store, () => ({
        timeSlots: newMap
      }))
    }
  }))
);
