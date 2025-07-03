import { Prisma } from '@prisma/client';
import { JwtPayload } from '@barbershop-app/types';

export abstract class UserRepository {
  abstract create(createUserDto: Prisma.UserCreateInput): Promise<JwtPayload>

  abstract findByEmail(email: string): Promise<JwtPayload | null>
}
