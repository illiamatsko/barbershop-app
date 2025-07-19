import { CustomerEntity } from '@barbershop-app/api/auth/domain';
import { Customer, User } from '@prisma/client';
import { RoleMap } from '@barbershop-app/api/shared/auth';

export class CustomerMapper {
  static toEntity(customer: Customer & User): CustomerEntity {
    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      role: RoleMap[customer.role],
      createdAt: customer.createdAt,
    };
  }

}
