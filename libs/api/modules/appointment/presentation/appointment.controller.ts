import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAppointmentPayload, } from '@barbershop-app/shared/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CancelAppointmentCommand,
  CreateAppointmentCommand,
  GetCustomerAppointmentsInfoQuery,
} from '@barbershop-app/api/appointment/application';


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

  @Get('info/:customerId')
  getCustomerAppointmentsInfo(@Param('customerId') customerId: number) {
    return this.queryBus.execute(new GetCustomerAppointmentsInfoQuery(customerId));
  }

  @Post('cancel/:appointmentId')
  cancelAppointment(@Param('appointmentId') appointmentId: number) {
    return this.commandBus.execute(new CancelAppointmentCommand(appointmentId));
  }
}
