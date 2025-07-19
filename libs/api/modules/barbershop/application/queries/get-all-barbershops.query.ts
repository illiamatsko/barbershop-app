import { Query } from '@nestjs/cqrs';
import { BarbershopEntity } from '@barbershop-app/api/barbershop/domain';

export class GetAllBarbershopsQuery extends Query<BarbershopEntity[]> {
  constructor() {
    super();
  }
}
