import { Injectable } from '@nestjs/common';
import { BarberRepository, BarberStatusEntity } from '@barbershop-app/api/core/domain';
import { PrismaService } from '../prisma/prisma.service';
import { BarberEntity, TimeSlotEntity } from '@barbershop-app/api/core/domain';
import { BarberMapper } from './mappers/barber.mapper';
import { TimeSlotMapper } from './mappers/time-slot.mapper';
import { BarberStatusMapper } from './mappers/barber-status.mapper';


@Injectable()
export class PrismaBarberRepository implements BarberRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAll(): Promise<BarberEntity[]> {
    const users = await this.prisma.user.findMany({
      include: {
        barber: {
          include: {
            status: true,
            barbershop: true
          }
        }, }
    });

    const barberEntities = [];
    for(const user of users) {
      if(!user || !user.barber) continue;
      const barber = user.barber;
      const status = barber.status.name;
      const address = barber.barbershop.address;

      barberEntities.push(BarberMapper.toDomain(barber, user, status, address));
    }

    return barberEntities;
  }

  async getBarberStatuses(): Promise<BarberStatusEntity[]> {
    const barberStatuses = await this.prisma.barberStatus.findMany();

    const barberStatusEntities = [];
    for(const barberStatus of barberStatuses) {
      barberStatusEntities.push(BarberStatusMapper.toDomain(barberStatus));
    }

    return barberStatusEntities;
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
