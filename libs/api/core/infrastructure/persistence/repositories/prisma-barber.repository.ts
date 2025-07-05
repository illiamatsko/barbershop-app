import { Injectable } from '@nestjs/common';
import { BarberRepository } from '@barbershop-app/api/core/domain';
import { PrismaService } from '../prisma/prisma.service';
import { BarberEntity, TimeSlotEntity } from '@barbershop-app/api/core/domain';
import { BarberMapper } from './mappers/barber.mapper';
import { TimeSlotMapper } from './mappers/time-slot.mapper';


@Injectable()
export class PrismaBarberRepository implements BarberRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAll(): Promise<BarberEntity[]> {
    const barbers = await this.prisma.barber.findMany();

    const barberEntities = [];
    for(const barber of barbers) {
      barberEntities.push(BarberMapper.toDomain(barber));
    }

    return barberEntities;
  }

  async getTimeSlotsByBarberId(id: number): Promise<TimeSlotEntity[]> {
    const timeSlots = await this.prisma.timeSlot.findMany({
      where: { barberId: id },
    });

    const timeSlotEntities = [];
    for(const timeSlot of timeSlots) {
      timeSlotEntities.push(TimeSlotMapper.toDomain(timeSlot));
    }

    return timeSlotEntities;
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
