import { Barber, User } from '@prisma/client';
import { BarberSummaryEntity } from '@barbershop-app/api/barber/domain';
import { RoleMap } from '@barbershop-app/api/shared/auth';

export class BarberMapper {
  static toSummaryEntity(barber: Barber, user: User, status: string, location: string): BarberSummaryEntity {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: barber.photoUrl,
      experience: barber.experience,
      status,
      location,
      barbershopId: barber.barbershopId,
      role: RoleMap[user.role],
    };
  }
}
