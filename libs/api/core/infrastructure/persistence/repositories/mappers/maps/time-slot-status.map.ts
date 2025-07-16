import { TimeSlotStatusesEnum } from '@barbershop-app/api/core/domain';
import { SlotStatus } from '@prisma/client';

export const TimeSlotStatusMap: Record<SlotStatus, TimeSlotStatusesEnum> = {
  AVAILABLE: TimeSlotStatusesEnum.AVAILABLE,
  BOOKED: TimeSlotStatusesEnum.BOOKED,
  BLOCKED: TimeSlotStatusesEnum.BLOCKED,
};
