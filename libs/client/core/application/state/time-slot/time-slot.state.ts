import { TimeSlotDto } from '@barbershop-app/shared/domain';

export interface TimeSlotState {
  timeSlots: TimeSlotDto[],
  loadedDates: Date[]
}

export const initialTimeSlotState: TimeSlotState = {
  timeSlots: [],
  loadedDates: []
}
