import { Query } from '@nestjs/cqrs';
import { BarberStatusDto } from '@barbershop-app/shared/domain';

export class GetBarberStatusesQuery extends Query<BarberStatusDto[]> {
  constructor() {
    super();
  }
}
