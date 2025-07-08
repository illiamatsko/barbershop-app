import { RoleMap } from './roles.map';
import { CustomerEntity } from '@barbershop-app/api/core/domain';
import { Customer, User } from '@prisma/client';

export class CustomerMapper {
  static toDomain(customer: Customer, user: User): CustomerEntity {
    return {
      id: customer.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: RoleMap[user.role],
      createdAt: user.createdAt,
    };
  }

}
