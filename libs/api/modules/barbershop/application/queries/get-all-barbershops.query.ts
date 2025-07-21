import { Query } from '@nestjs/cqrs';
import { BarbershopDto } from '@barbershop-app/shared/domain';

export class GetAllBarbershopsQuery extends Query<BarbershopDto[]> {
  constructor() {
    super();
  }
}
