import { BarberSummaryDto } from '@barbershop-app/shared/domain';
import { BarberSummaryEntity } from '../entities/barber-summary.entity';

export class BarberMapper {
  static toSummaryDto(barber: BarberSummaryEntity): BarberSummaryDto {
    return {
      id: barber.id,
      firstName: barber.firstName,
      lastName: barber.lastName,
      photoUrl: barber.photoUrl,
      experience: barber.experience,
      status: barber.status,
      starRating: barber.starRating,
      reviewsCount: barber.reviewsCount,
      barbershopId: barber.barbershopId,
      serviceIds: barber.serviceIds,
      location: barber.location,
    }
  }
}
