import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RoleStrategy } from './role.strategy';
import { CustomerMapper, CustomerRepository } from '@barbershop-app/api/auth/domain';
import { CustomerDto } from '@barbershop-app/shared/domain';

@Injectable()
export class CustomerRoleStrategy implements RoleStrategy {
  constructor(private customerRepo: CustomerRepository) {}

  canHandle(role: string): boolean {
    return role === 'CUSTOMER';
  }

  async execute(email: string): Promise<CustomerDto> {
    const customerEntity = await this.customerRepo.getByEmail(email);
    if (!customerEntity) throw new UnauthorizedException();
    return CustomerMapper.toDto(customerEntity);
  }
}
