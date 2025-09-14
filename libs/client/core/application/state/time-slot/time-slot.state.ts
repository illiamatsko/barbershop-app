import { TimeSlotDto } from '@barbershop-app/shared/domain';

export interface TimeSlotState {
  timeSlots: Map<string, TimeSlotDto[]>;
}

export const initialTimeSlotState: TimeSlotState = {
  timeSlots: new Map<string, TimeSlotDto[]>()
}
