import { Barber, User } from '@prisma/client';
import { RoleMap } from './maps/roles.map';
import { BarberFullEntity, BarberSummaryEntity } from '@barbershop-app/api/core/domain';

export class BarberMapper {
  static toFullEntity(barber: Barber, user: User, status: string, location: string): BarberFullEntity {
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

  static toSummaryEntity(barber: Barber, user: User, status: string, location: string): BarberSummaryEntity {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      experience: barber.experience,
      status,
      location,
      role: RoleMap[user.role],
    };
  }
}
