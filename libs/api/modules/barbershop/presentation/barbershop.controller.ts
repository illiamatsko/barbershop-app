import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller()
export class BarbershopController {
  constructor(private queryBus: QueryBus) {}
}
