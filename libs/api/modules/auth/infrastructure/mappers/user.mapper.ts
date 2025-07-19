import { User } from '@prisma/client';
import { UserEntity } from '@barbershop-app/api/auth/domain';
import { RoleMap } from '@barbershop-app/api/shared/auth';

export class UserMapper {
  static toEntity(user: User): UserEntity {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: RoleMap[user.role],
      createdAt: user.createdAt
    }
  }
}
