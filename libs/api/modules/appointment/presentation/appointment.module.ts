import { Module } from '@nestjs/common';
import { PrismaModule } from '@barbershop-app/api/core/persistence';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from '@barbershop-app/api/appointment/domain';
import { CreateAppointmentUseCase } from '@barbershop-app/api/appointment/application';
import { PrismaAppointmentRepository } from '@barbershop-app/api/appointment/infrastructure';


@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController],
  providers: [
    CreateAppointmentUseCase,
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository
    }
  ],
})
export class AppointmentModule {}
