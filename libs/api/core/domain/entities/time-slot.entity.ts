import { TimeSlotStatusesEnum } from './enums/time-slot-statuses.enum';

export interface TimeSlotEntity {
  id: number;
  startTime: Date;
  appointmentId: number,
  barberId: number,
  status: TimeSlotStatusesEnum
}
