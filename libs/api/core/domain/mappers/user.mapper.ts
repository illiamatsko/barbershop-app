import { CustomerEntity } from '../entities/customer.entity';
import { JwtPayload, UserDto } from '@barbershop-app/shared/types';

export class UserMapper {
  static toDto(user: CustomerEntity): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role.toString(),
      createdAt: user.createdAt.toISOString(),
    };
  }

  static toJwtPayload(user: CustomerEntity): JwtPayload {
    return {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }
}
