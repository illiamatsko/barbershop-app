import { BarberDto } from '@barbershop-app/shared/types';
import { BarberEntity } from '../entities/barber.entity';

export function BarberEntityToDto(barber: BarberEntity): BarberDto {
  return {
    id: barber.id,
    email: barber.email,
    firstName: barber.firstName,
    lastName: barber.lastName,
    phoneNumber: barber.phoneNumber,
    createdAt: barber.createdAt.toString(),
  };
}
