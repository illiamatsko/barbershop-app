import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllServicesQuery, GetBarberServicesQuery } from '@barbershop-app/api/service/application';

@Controller()
export class ServiceController {
  constructor(private queryBus: QueryBus) {}

  @Get('all')
  GetAllServices() {
    return this.queryBus.execute(new GetAllServicesQuery());
  }

  @Get('barber/:id')
  GetServicesByBarberId(@Param('id') id: string) {
    return this.queryBus.execute(new GetBarberServicesQuery(+id));
  }
}
