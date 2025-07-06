import { Prisma } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: Prisma.UserCreateInput): Promise<UserEntity>

  abstract findByEmail(email: string): Promise<UserEntity | null>

  abstract findByEmailOrPhone(email: string, phoneNumber: string): Promise<UserEntity | null>
}
