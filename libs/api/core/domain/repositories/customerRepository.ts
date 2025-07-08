import { Prisma } from '@prisma/client';
import { CustomerEntity } from '../entities/customer.entity';

export abstract class CustomerRepository {
  abstract create(createUserDto: Prisma.UserCreateInput): Promise<CustomerEntity>

  abstract findByEmail(email: string): Promise<CustomerEntity | null>

  abstract findByEmailOrPhone(email: string, phoneNumber: string): Promise<CustomerEntity | null>
}
