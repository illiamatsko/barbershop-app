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
    const createdBarber = await this.prisma.barber.create({
      data: createBarberRecordPayload,
    });

    const user = await this.prisma.user.findUnique({
      where: { id: createdBarber.userId },
      include: {
        barber: {
          include: {
            status: true,
            barbershop: true,
            reviews: true
          }
        }
      }
    });

    if (!user) throw new Error('User not found after creating barber');

    return BarberMapper.toFullEntity(user);
  }

  async getByEmail(email: string): Promise<BarberFullEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        barber: {
          include: {
            status: true,
            barbershop: true,
            reviews: true
          }
        }
      }
    });
    if (!user || !user.barber) return null;

    return BarberMapper.toFullEntity(user);
  }
}
