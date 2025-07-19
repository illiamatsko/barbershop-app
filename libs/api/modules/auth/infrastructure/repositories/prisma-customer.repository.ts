import { CreateCustomerRecordDto, CustomerEntity, CustomerRepository } from '@barbershop-app/api/auth/domain';
import { CustomerMapper } from '../mappers/customer.mapper';
import { PrismaService } from '@barbershop-app/api/core/persistence';

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCustomerRecordDto): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.create({
      data: payload,
      include: {
        user: true
      }
    });

    return CustomerMapper.toEntity({ ...customer, ...customer.user });
  }
}
