import { Query } from '@nestjs/cqrs';
import { BarberFullDto, CustomerDto } from '@barbershop-app/shared/types';
import { JwtPayload } from '@barbershop-app/api/shared/auth';

export class GetUserFromTokenQuery extends Query<CustomerDto | BarberFullDto> {
  constructor(public readonly payload: JwtPayload) {
    super();
  }
}
