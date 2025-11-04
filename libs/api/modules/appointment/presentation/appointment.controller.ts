import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAppointmentPayload, } from '@barbershop-app/shared/domain';
import { OptionalJwtGuard } from '@barbershop-app/api/shared/auth';
import { AuthRequest } from '@barbershop-app/api/auth/domain';

@Controller('appointment')
export class AppointmentController {

  @UseGuards(OptionalJwtGuard)
  @Post('create')
  createAppointment(@Req() req: AuthRequest, @Body() appointment: CreateAppointmentPayload) {
    console.log(appointment);
    console.log(req.user);
  }
}
