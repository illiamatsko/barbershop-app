import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllBarbershopsQuery } from '@barbershop-app/api/barbershop/application';
import { BarbershopDto } from '@barbershop-app/shared/types';

@Controller()
export class BarbershopController {
  constructor(private queryBus: QueryBus) {}

  @Get('all')
  GetAllBarbershops(): Promise<BarbershopDto[]> {
    return this.queryBus.execute(new GetAllBarbershopsQuery());
  }
}
