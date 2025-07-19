import { CreateUserDto } from '../dtos/create-user.dto';
import { CustomerDto } from '@barbershop-app/shared/types';
import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { CreateCustomerRecordDto } from '../dtos/create-customer-record.dto';
import { RolesEnum } from '@barbershop-app/api/shared/auth';

export class CustomerMapper {
  static toDto(customer: CustomerEntity): CustomerDto {
    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      role: customer.role.toString(),
      createdAt: customer.createdAt.toISOString()
    }
  }

  static toCreateUserPayload(createCustomerDto: CreateCustomerDto): CreateUserDto {
    return {
      email: createCustomerDto.email,
      password: createCustomerDto.password,
      firstName: createCustomerDto.firstName,
      lastName: createCustomerDto.lastName,
      phoneNumber: createCustomerDto.phoneNumber,
      role: RolesEnum.BARBER
    };
  }

  static toCreateCustomerRecordPayload(createCustomerDto: CreateCustomerDto, userId: number): CreateCustomerRecordDto {
    return {
      userId
    };
  }
}
