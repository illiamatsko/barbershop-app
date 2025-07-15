import { Barber, User } from '@prisma/client';
import { RoleMap } from './roles.map';
import { BarberEntity } from '@barbershop-app/api/core/domain';

export class BarberMapper {
  static toDomain(barber: Barber, user: User, status: string, location: string): BarberEntity {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      experience: barber.experience,
      status,
      location,
      role: RoleMap[user.role],
      createdAt: user.createdAt,
    };
  }
}
