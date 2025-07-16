import { ReviewEntity } from '../entities/review.entity';

export abstract class ReviewRepository {
  abstract getReviewsByBarberId(id: number): Promise<ReviewEntity[]>
}
