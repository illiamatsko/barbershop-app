import { Injectable } from '@nestjs/common';
import {
  BarberRepository,
  BarberSummaryEntity,
  BarberStatusEntity,
  TimeSlotEntity
} from '@barbershop-app/api/barber/domain';
import { BarberMapper } from '../mappers/barber.mapper';
import { BarberStatusMapper } from '../mappers/barber-status.mapper';
import { PrismaService } from '@barbershop-app/api/core/persistence';
import { TimeSlotMapper } from '../mappers/time-slot.mapper';


@Injectable()
export class PrismaBarberRepository implements BarberRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAll(): Promise<BarberSummaryEntity[]> {
    const users = await this.prisma.user.findMany({
      include: {
        barber: {
          include: {
            status: true,
            barbershop: true,
            services: true,
            reviews: true
          }
        }, }
    });

    const barberEntities = [];
    for(const user of users) {
      if(!user || !user.barber) continue;

      barberEntities.push(BarberMapper.toSummaryEntity(user));
    }

    return barberEntities;
  }

  async getBarberStatuses(): Promise<BarberStatusEntity[]> {
    const barberStatuses = await this.prisma.barberStatus.findMany();

    const barberStatusEntities = [];
    for(const barberStatus of barberStatuses) {
      barberStatusEntities.push(BarberStatusMapper.toEntity(barberStatus));
    }

    return barberStatusEntities;
  }

  async getBarberTimeSlotsByDate(barberId: number, date: Date): Promise<TimeSlotEntity[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const barberTimeSlotsByDate = await this.prisma.timeSlot.findMany({
      where: {
        barberId,
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return barberTimeSlotsByDate.map(slot => TimeSlotMapper.toEntity(slot));
  }
}
