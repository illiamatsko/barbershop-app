import { User } from '@prisma/client';
import { RoleMap } from './roles.map';
import { UserEntity } from '@barbershop-app/api/core/domain';

export class UserMapper {
  static toDomain(user: User): UserEntity {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: RoleMap[user.role],
      createdAt: user.createdAt,
    };
  }
}
