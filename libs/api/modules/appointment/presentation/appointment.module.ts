import { Module } from '@nestjs/common';
import { PrismaModule } from '@barbershop-app/api/core/persistence';
import { AppointmentController } from './appointment.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController],
  providers: [],
})
export class AppointmentModule {}
