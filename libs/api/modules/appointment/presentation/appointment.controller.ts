import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAppointmentPayload, } from '@barbershop-app/shared/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CancelAppointmentCommand,
  CreateAppointmentCommand,
  GetCustomerAppointmentsInfoQuery,
  GetFullAppointmentQuery,
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

  @Get('full/:appointmentId')
  getFullAppointment(@Param('appointmentId') appointmentId: string) {
    return this.queryBus.execute(new GetFullAppointmentQuery(Number(appointmentId)));
  }

  @Get('info/:customerId')
  getCustomerAppointmentsInfo(@Param('customerId') customerId: string) {
    return this.queryBus.execute(new GetCustomerAppointmentsInfoQuery(Number(customerId)));
  }

  @Post('cancel/:appointmentId')
  cancelAppointment(@Param('appointmentId') appointmentId: string) {
    return this.commandBus.execute(new CancelAppointmentCommand(Number(appointmentId)));
  }
}
