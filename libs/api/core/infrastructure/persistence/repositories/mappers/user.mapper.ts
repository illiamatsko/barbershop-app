import { User } from '@prisma/client';
import { RoleMap } from './roles.map';
import { UserEntity } from '@barbershop-app/core/domain';

export function UserToDomainEntity(user: User): UserEntity {
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
