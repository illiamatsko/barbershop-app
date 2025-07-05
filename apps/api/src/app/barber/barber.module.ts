import { Module } from '@nestjs/common';
import { GetAllBarbersUseCase, GetBarberServicesUseCase } from '@barbershop-app/api/barber/application';
import { PrismaBarberRepository, PrismaModule, PrismaServiceRepository } from '@barbershop-app/api/core/infrastructure';
import { ServiceModule } from '../service/service.module';
import { BarberRepository, ServiceRepository } from '@barbershop-app/api/core/domain';


@Module({
  imports: [ServiceModule, PrismaModule],
  controllers: [],
  providers:
    [
      GetAllBarbersUseCase,
      GetBarberServicesUseCase,
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
