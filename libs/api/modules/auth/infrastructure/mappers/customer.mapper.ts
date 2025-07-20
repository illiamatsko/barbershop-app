import { CustomerEntity } from '@barbershop-app/api/auth/domain';
import { RoleMap } from '@barbershop-app/api/shared/auth';
import { RawCustomerType } from '../types/raw-customer.type';

export class CustomerMapper {
  static toEntity(customer: RawCustomerType): CustomerEntity {
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
