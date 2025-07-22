import { BarberSummaryEntity } from '@barbershop-app/api/barber/domain';
import { RoleMap } from '@barbershop-app/api/shared/auth';
import { RawBarberType } from '../types/raw-barber.type';

export class BarberMapper {
  static toSummaryEntity(user: RawBarberType): BarberSummaryEntity {
    const barber = user.barber;
    if(!barber) throw new Error('User does not have barber profile');

    const reviewsCount = barber.reviews.length;
    const reviewsRatingSum = barber.reviews.reduce((sum, review) => sum + review.starRating, 0);
    const barberStarRating = reviewsCount > 0 ? reviewsRatingSum / reviewsCount : 0;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: barber.photoUrl,
      experience: barber.experience,
      status: barber.status.name,
      starRating: barberStarRating,
      reviewsCount: reviewsCount,
      location: barber.barbershop.address,
      barbershopId: barber.barbershopId,
      role: RoleMap[user.role],
    };
  }
}
