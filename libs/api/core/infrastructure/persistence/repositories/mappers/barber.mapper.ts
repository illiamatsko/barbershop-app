import { Barber } from '@prisma/client';
import { RoleMap } from './roles.map';
import { BarberEntity } from '@barbershop-app/core/domain';

export function BarberToDomainEntity(barber: Barber): BarberEntity {
  return {
    id: barber.id,
    email: barber.email,
    firstName: barber.firstName,
    lastName: barber.lastName,
    phoneNumber: barber.phoneNumber,
    role: RoleMap[barber.role],
    createdAt: barber.createdAt,
  };
}
