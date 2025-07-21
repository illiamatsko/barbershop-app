import { Query } from '@nestjs/cqrs';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export class GetAllBarbersQuery extends Query<BarberSummaryDto[]> {
  constructor() {
    super();
  }
}
