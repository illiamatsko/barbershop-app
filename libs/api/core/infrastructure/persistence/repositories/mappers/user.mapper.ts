import { User } from '@prisma/client';

export class UserMapper {
  static UserToJwtPayload(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role.toString(),
      createdAt: user.createdAt.toISOString(), // краще ISO
    };
  }
}
