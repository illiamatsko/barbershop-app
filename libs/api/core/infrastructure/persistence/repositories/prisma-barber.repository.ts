import { Injectable } from '@nestjs/common';
import { Barber, TimeSlot } from '@prisma/client';
import { BarberRepository } from '@barbershop-app/core/domain';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PrismaBarberRepository implements BarberRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAll(): Promise<Barber[]> {
    return this.prisma.barber.findMany();
  }

  async getTimeSlotsByBarberId(id: number): Promise<TimeSlot[]> {
    return this.prisma.timeSlot.findMany({
      where: { barberId: id },
    });
  }

  async getServicesByBarberId(id: number): Promise<{ serviceId: number }[]> {
    return this.prisma.barberService.findMany({
      select: {
        serviceId: true,
      },
      where: {
        barberId: id,
      },
    });
  }
}
