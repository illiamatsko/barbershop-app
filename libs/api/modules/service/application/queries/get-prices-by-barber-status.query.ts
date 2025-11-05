import { Query } from '@nestjs/cqrs';

export class GetPricesByBarberStatusQuery extends Query<{serviceId: number, price: number}[]> {
  constructor(
    public readonly status: string
  ) {
    super();
  }
}
