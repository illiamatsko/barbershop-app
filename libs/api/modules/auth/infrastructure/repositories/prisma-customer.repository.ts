import { CreateCustomerRecordDto, CustomerEntity, CustomerRepository } from '@barbershop-app/api/auth/domain';
import { CustomerMapper } from '../mappers/customer.mapper';
import { PrismaService } from '@barbershop-app/api/core/persistence';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCustomerRecordDto): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.create({
      data: payload
    });

    const user = await this.prisma.user.findUnique({
      where: { id: customer.userId },
      include: {

        customer: true
      }
    });
    if(!user) throw new Error('User not found after creating customer');

    return CustomerMapper.toEntity(user);
  }

  async getByEmail(email:string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        customer: true
      }
    });
    if(!user) return null

    return CustomerMapper.toEntity(user)
  }
}
