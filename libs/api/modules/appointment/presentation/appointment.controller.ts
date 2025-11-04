import { Body, Controller, Post } from '@nestjs/common';
import { CreateAppointmentPayload, } from '@barbershop-app/shared/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAppointmentCommand } from '@barbershop-app/api/appointment/application';

@Controller('appointment')
export class AppointmentController {

  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  @Post('create')
  createAppointment(@Body() createAppointmentPayload: CreateAppointmentPayload) {
    return this.commandBus.execute(new CreateAppointmentCommand(createAppointmentPayload));
  }
}
