import { TimeSlotDto } from '@barbershop-app/shared/domain';

export interface TimeSlotState {
  timeSlots: Map<Date, TimeSlotDto[]>;
}

export const initialTimeSlotState: TimeSlotState = {
  timeSlots: new Map<Date, TimeSlotDto[]>()
}
