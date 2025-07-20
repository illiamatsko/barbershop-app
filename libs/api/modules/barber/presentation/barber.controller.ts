import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetAllBarbersQuery,
  GetBarberStatusesQuery
} from '@barbershop-app/api/barber/application';


@Controller()
export class BarberController {
  constructor(private queryBus: QueryBus) {}

  @Get('all')
  GetAllBarbers() {
    return this.queryBus.execute(new GetAllBarbersQuery());
  }

  @Get('statuses')
  GetBarberStatuses() {
    return this.queryBus.execute(new GetBarberStatusesQuery());
  }
}
