import { Module } from '@nestjs/common';
import {
  GetAllBarbersUseCase,
  GetBarberServicesUseCase,
  GetBarberStatusesUseCase
} from '@barbershop-app/api/barber/application';
import { PrismaBarberRepository, PrismaModule, PrismaServiceRepository } from '@barbershop-app/api/core/infrastructure';
import { ServiceModule } from '../service/service.module';
import { BarberRepository, ServiceRepository } from '@barbershop-app/api/core/domain';
import { BarberController } from './barber.controller';


@Module({
  imports: [ServiceModule, PrismaModule],
  controllers: [BarberController],
  providers:
    [
      GetAllBarbersUseCase,
      GetBarberServicesUseCase,
      GetBarberStatusesUseCase,
      {
        provide: BarberRepository,
        useClass: PrismaBarberRepository
      },
      {
        provide: ServiceRepository,
        useClass: PrismaServiceRepository
      }
    ],
  exports: []
})
export class BarberModule {}
