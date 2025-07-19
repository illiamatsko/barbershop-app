import {
  BarberFullEntity,
  BarberRepository,
  CreateBarberRecordDto
} from '@barbershop-app/api/auth/domain';
import { Injectable } from '@nestjs/common';
import { BarberMapper } from '../mappers/barber.mapper';
import { PrismaService } from '@barbershop-app/api/core/persistence';


@Injectable()
export class PrismaBarberRepository implements BarberRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async createBarber(createBarberRecordPayload: CreateBarberRecordDto): Promise<BarberFullEntity> {
    const barber = await this.prisma.barber.create({
      data: createBarberRecordPayload,
      include: {
        user: true,
        status: true,
        barbershop: true
      }
    });

    return BarberMapper.toFullEntity({ ...barber, ...barber.user }, barber.status.name, barber.barbershop.address)
  }
}
