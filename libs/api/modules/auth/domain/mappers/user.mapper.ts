import { UserEntity } from '../entities/user.entity';
import { JwtPayload } from '@barbershop-app/api/shared/auth';

export class UserMapper {
  static toJwtPayload(user: UserEntity): JwtPayload {
    return {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }
}
