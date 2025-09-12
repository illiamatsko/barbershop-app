import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetAllBarbersQuery,
  GetBarberStatusesQuery, GetTimeSlotsByDateQuery
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

  @Get('timeslots/:date')
  GetTimeSlotsByDate(@Param('date') _date: string) {
    const date = new Date(_date);

    return this.queryBus.execute(new GetTimeSlotsByDateQuery(date));
  }
}
