import { BarberEntity, CustomerEntity, UserRepository } from '@barbershop-app/api/core/domain';
import { BarberMapper } from './mappers/barber.mapper';
import { CustomerMapper } from './mappers/customer.mapper';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<CustomerEntity | BarberEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        barber: true,
        customer: true
      }
    });

    if(!user) return null;

    if (user.role === 'CLIENT') {
      if (!user.customer) return null;

      return CustomerMapper.toDomain(user.customer, user);
    }

    if (user.role === 'BARBER') {
      if (!user.barber) return null;

      const status = await this.prisma.barberStatus.findUnique({
        where: { id: user.barber.statusId }
      });

      if (!status) return null;

      return BarberMapper.toDomain(user.barber, user, status.name);
    }

    return null;

  }
}
