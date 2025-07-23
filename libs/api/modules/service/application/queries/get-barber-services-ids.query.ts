import { Query } from '@nestjs/cqrs';

export class GetBarberServicesIdsQuery extends Query<number[]> {
  constructor(
    public readonly barberId: number
  ) {
    super();
  }
}
