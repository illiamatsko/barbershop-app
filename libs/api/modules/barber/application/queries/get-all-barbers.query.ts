import { Query } from '@nestjs/cqrs';
import { BarberSummaryDto } from '@barbershop-app/shared/types';

export class GetAllBarbersQuery extends Query<BarberSummaryDto[]> {
  constructor() {
    super();
  }
}
