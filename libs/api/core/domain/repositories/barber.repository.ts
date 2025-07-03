import { Barber, TimeSlot } from '@prisma/client';

export abstract class BarberRepository {
  abstract getAll(): Promise<Barber[]>

  abstract getTimeSlotsByBarberId(id: number): Promise<TimeSlot[]>

  abstract getServicesByBarberId(id: number): Promise<{ serviceId: number }[]>
}
