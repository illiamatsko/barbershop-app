import { Query } from '@nestjs/cqrs';
import { BarbershopDto } from '@barbershop-app/shared/types';

export class GetAllBarbershopsQuery extends Query<BarbershopDto[]> {
  constructor() {
    super();
  }
}
