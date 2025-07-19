import { Barber, User } from '@prisma/client';
import { BarberFullEntity } from '@barbershop-app/api/auth/domain';
import { RoleMap } from '@barbershop-app/api/shared/auth';

export class BarberMapper {
  static toFullEntity(barber: Barber & User, status: string, location: string): BarberFullEntity {
    return {
      id: barber.userId,
      email: barber.email,
      firstName: barber.firstName,
      lastName: barber.lastName,
      phoneNumber: barber.phoneNumber,
      experience: barber.experience,
      status,
      location,
      role: RoleMap[barber.role],
      createdAt: barber.createdAt,
    };
  }
}
