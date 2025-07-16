import { Review } from '@prisma/client';
import { ReviewDto } from '@barbershop-app/shared/types';

export class ReviewMapper {
  static toDto(review: Review): ReviewDto {
    return {
      id: review.id,
      starRating: review.starRating,
      content: review.content,
      customerId: review.customerId,
      barberId: review.barberId
    }
  }
}
