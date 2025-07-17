import { BarberFullDto, BarberSummaryDto } from '@barbershop-app/shared/types';
import { BarberFullEntity } from '../entities/barber-full.entity';
import { BarberSummaryEntity } from '../entities/barber-summary.entity';

export class BarberMapper {
  static toFullDto(barber: BarberFullEntity): BarberFullDto {
    return {
      id: barber.id,
      email: barber.email,
      firstName: barber.firstName,
      lastName: barber.lastName,
      phoneNumber: barber.phoneNumber,
      experience: barber.experience,
      status: barber.status,
      starRating: 5,
      reviewsCount: 5,
      location: barber.location,
      createdAt: barber.createdAt.toISOString()
    };
  }

  static toSummaryDto(barber: BarberSummaryEntity): BarberSummaryDto {
    return {
      id: barber.id,
      firstName: barber.firstName,
      lastName: barber.lastName,
      experience: barber.experience,
      status: barber.status,
      starRating: 5,
      reviewsCount: 5,
      location: barber.location,
    }
  }
}
