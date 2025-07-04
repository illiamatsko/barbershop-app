import { UserEntity } from '../entities/user.entity';
import { UserDto } from '@barbershop-app/shared/types'


export function UserEntityToDto(user: UserEntity): UserDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    createdAt: user.createdAt.toISOString(),
  };
}
