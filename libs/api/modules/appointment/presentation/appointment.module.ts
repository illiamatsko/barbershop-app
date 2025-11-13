import { Module } from '@nestjs/common';
import { PrismaModule } from '@barbershop-app/api/core/persistence';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from '@barbershop-app/api/appointment/domain';
import {
  CancelAppointmentUseCase,
  CreateAppointmentUseCase,
  GetCustomerAppointmentsInfoUseCase, GetFullAppointmentUseCase,
} from '@barbershop-app/api/appointment/application';
import { PrismaAppointmentRepository } from '@barbershop-app/api/appointment/infrastructure';


@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController],
  providers: [
    CreateAppointmentUseCase,
    GetFullAppointmentUseCase,
    GetCustomerAppointmentsInfoUseCase,
    CancelAppointmentUseCase,
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository
    }
  ],
})
export class AppointmentModule {}
