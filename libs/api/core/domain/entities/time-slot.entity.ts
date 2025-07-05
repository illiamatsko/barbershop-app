import { TimeSlotStatusesEnum } from './enums/time-slot-statuses.enum';

export interface TimeSlotEntity {
  id: number;
  startTime: Date;
  barberId: number,
  status: TimeSlotStatusesEnum
}
