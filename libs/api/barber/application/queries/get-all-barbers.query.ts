import { Query } from '@nestjs/cqrs';
import { BarberDto } from '@barbershop-app/shared/types';

export class GetAllBarbersQuery extends Query<BarberDto[]> {
  constructor() {
    super();
  }
}
