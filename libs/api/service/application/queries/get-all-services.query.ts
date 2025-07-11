import { Query } from '@nestjs/cqrs';
import { ServiceDto } from '@barbershop-app/shared/types';

export class GetAllServicesQuery extends Query<ServiceDto[]> {
  constructor() {
    super();
  }
}
