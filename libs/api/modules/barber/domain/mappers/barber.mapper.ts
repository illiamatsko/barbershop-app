import { BarberFullDto, BarberSummaryDto } from '@barbershop-app/shared/domain';
import { BarberSummaryEntity } from '../entities/barber-summary.entity';
import { BarberFullEntity } from '../entities/barber-full.entity';

export class BarberMapper {
  static toFullDto(barber: BarberFullEntity): BarberFullDto {
    return {
      id: barber.id,
      email: barber.email,
      firstName: barber.firstName,
      lastName: barber.lastName,
      phoneNumber: barber.phoneNumber,
      photoUrl: barber.photoUrl,
      experience: barber.experience,
      status: barber.status,
      starRating: 5,
      reviewsCount: 5,
      location: barber.location,
      role: barber.role.toString(),
      createdAt: barber.createdAt.toISOString()
    };
  }

  static toSummaryDto(barber: BarberSummaryEntity): BarberSummaryDto {
    return {
      id: barber.id,
      firstName: barber.firstName,
      lastName: barber.lastName,
      photoUrl: barber.photoUrl,
      experience: barber.experience,
      status: barber.status,
      starRating: 5,
      reviewsCount: 5,
      location: barber.location,
    }
  }
}
