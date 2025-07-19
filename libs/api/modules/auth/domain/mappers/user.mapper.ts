import { UserDto } from '@barbershop-app/shared/types';
import { UserEntity } from '../entities/user.entity';
import { JwtPayload } from '@barbershop-app/api/shared/auth';

export class UserMapper {
  static toDto(user: UserEntity): UserDto {
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

  static toJwtPayload(user: UserEntity): JwtPayload {
    return {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }
}
