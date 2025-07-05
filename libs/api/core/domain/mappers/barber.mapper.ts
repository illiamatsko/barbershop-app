import { BarberDto } from '@barbershop-app/shared/types';
import { BarberEntity } from '../entities/barber.entity';

export class BarberMapper {
  static toDto(barber: BarberEntity): BarberDto {
    return {
      id: barber.id,
      email: barber.email,
      firstName: barber.firstName,
      lastName: barber.lastName,
      phoneNumber: barber.phoneNumber,
      createdAt: barber.createdAt.toISOString(),
    };
  }
}
