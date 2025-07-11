import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerRepository } from '@barbershop-app/api/core/domain';
import { CustomerEntity } from '@barbershop-app/api/core/domain';
import { CustomerMapper } from './mappers/customer.mapper';


@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: Prisma.UserCreateInput): Promise<CustomerEntity> {
    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: createCustomerDto });
      const customer = await tx.customer.create({ data: { userId: user.id } });

      return { user, customer };
    });

    return CustomerMapper.toDomain(result.customer, result.user);
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { customer: true }
    });
    if(!user || !user.customer) return null;

    return CustomerMapper.toDomain(user.customer, user);
  }

  async findByEmailOrPhone(email: string, phoneNumber: string): Promise<CustomerEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phoneNumber }
        ],
      },
      include: { customer: true }
    });
    if(!user || !user.customer) return null;

    return CustomerMapper.toDomain(user.customer, user);
  }
}
