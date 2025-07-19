import { Injectable } from '@nestjs/common';
import { BarberRepository, BarberSummaryEntity, BarberStatusEntity } from '@barbershop-app/api/barber/domain';
import { BarberMapper } from '../mappers/barber.mapper';
import { BarberStatusMapper } from '../mappers/barber-status.mapper';
import { PrismaService } from '@barbershop-app/api/core/persistence';


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

      barberEntities.push(BarberMapper.toSummaryEntity(barber, user, status, address));
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
}
