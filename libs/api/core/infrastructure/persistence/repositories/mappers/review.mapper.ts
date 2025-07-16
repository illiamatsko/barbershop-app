import { Review } from '@prisma/client';
import { ReviewEntity } from '@barbershop-app/api/core/domain';

export class ReviewMapper {
  static toDomain(review: Review): ReviewEntity {
    return {
      id: review.id,
      starRating: review.starRating,
      content: review.content,
      customerId: review.customerId,
      barberId: review.barberId
    }
  }
}
