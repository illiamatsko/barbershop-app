import { BarberFullEntity } from '@barbershop-app/api/auth/domain';
import { RoleMap } from '@barbershop-app/api/shared/auth';
import { RawBarberType } from '../types/raw-barber.type';

export class BarberMapper {
  static toFullEntity(user: RawBarberType): BarberFullEntity {
    const barber = user.barber;
    if(!barber) throw new Error('User does not have barber profile');

    const reviewsCount = barber.reviews.length;
    const reviewsRatingSum = barber.reviews.reduce((sum, review) => sum + review.starRating, 0);
    const barberStarRating = reviewsCount > 0 ? reviewsRatingSum / reviewsCount : 0;

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      experience: barber.experience,
      status: barber.status.name,
      starRating: barberStarRating,
      reviewsCount,
      location: barber.barbershop.address,
      role: RoleMap[user.role],
      createdAt: user.createdAt,
    };
  }
}
