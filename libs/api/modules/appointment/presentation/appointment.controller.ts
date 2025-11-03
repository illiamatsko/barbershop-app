import { Body, Controller, Post } from '@nestjs/common';
import { CreateAppointmentPayload, } from '@barbershop-app/shared/domain';

@Controller('appointment')
export class AppointmentController {

  @Post('create')
  createAppointment(@Body() appointment: CreateAppointmentPayload) {
    console.log(appointment);
  }
}
