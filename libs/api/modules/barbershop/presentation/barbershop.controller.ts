import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllBarbershopsQuery } from '@barbershop-app/api/barbershop/application';

@Controller()
export class BarbershopController {
  constructor(private queryBus: QueryBus) {}

  @Get('all')
  GetAllBarbershops() {
    return this.queryBus.execute(new GetAllBarbershopsQuery());
  }
}
