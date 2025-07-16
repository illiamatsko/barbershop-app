import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewEntity, ReviewRepository } from '@barbershop-app/api/core/domain';
import { ReviewMapper } from './mappers/review.mapper';


@Injectable()
export class PrismaReviewRepository implements ReviewRepository {
  constructor(private prisma: PrismaService) {}

  async getReviewsByBarberId(id: number): Promise<ReviewEntity[]> {
    const reviews = await this.prisma.review.findMany({
      where: { barberId: id }
    });

    return reviews.map(review => ReviewMapper.toDomain(review));
  }
}
