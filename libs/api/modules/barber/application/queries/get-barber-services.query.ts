import { Query } from '@nestjs/cqrs';
import { ServiceDto } from '@barbershop-app/shared/types';

export class GetBarberServicesQuery extends Query<ServiceDto[]> {
  constructor(
    public readonly barberId: number
  ) {
    super();
  }
}
