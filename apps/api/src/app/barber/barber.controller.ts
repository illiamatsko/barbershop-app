import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllBarbersQuery, GetBarberServicesQuery } from '@barbershop-app/api/barber/application';

@Controller()
export class BarberController {
  constructor(private queryBus: QueryBus) {}

  @Get('all')
  GetAllBarbers() {
    return this.queryBus.execute(new GetAllBarbersQuery());
  }

  @Get(':id/services')
  GetBarberServices(@Param('id') barberId: string) {
    return this.queryBus.execute(new GetBarberServicesQuery(+barberId))
  }
}
