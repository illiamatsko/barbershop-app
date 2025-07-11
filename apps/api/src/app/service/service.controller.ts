import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllServicesQuery } from '@barbershop-app/api/service/application';

@Controller()
export class ServiceController {
  constructor(private queryBus: QueryBus) {}

  @Get('all')
  GetAllServices() {
    return this.queryBus.execute(new GetAllServicesQuery());
  }
}
