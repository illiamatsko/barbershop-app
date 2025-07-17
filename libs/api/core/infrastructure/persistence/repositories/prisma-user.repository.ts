import { BarberFullEntity, CustomerEntity, UserRepository } from '@barbershop-app/api/core/domain';
import { BarberMapper } from './mappers/barber.mapper';
import { CustomerMapper } from './mappers/customer.mapper';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<CustomerEntity | BarberFullEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        barber: {
          include: {
            status: true,
            barbershop: true
          }
        },
        customer: true
      }
    });

    if(!user) return null;

    if (user.role === 'CUSTOMER') {
      if (!user.customer) return null;

      return CustomerMapper.toDomain(user.customer, user);
    }

    if (user.role === 'BARBER') {
      if (!user.barber) return null;

      return BarberMapper.toFullEntity(user.barber, user, user.barber.status.name, user.barber.barbershop.address);
    }

    return null;
  }
}
