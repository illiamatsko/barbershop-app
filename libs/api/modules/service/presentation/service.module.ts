import { Module } from '@nestjs/common';
import { PrismaModule } from '@barbershop-app/api/core/persistence';
import { ServiceRepository } from '@barbershop-app/api/service/domain';
import { ServiceController } from './service.controller';
import { GetAllServicesUseCase, GetBarberServicesIdsUseCase } from '@barbershop-app/api/service/application';
import { PrismaServiceRepository } from '@barbershop-app/api/service/infrastructure';

@Module({
  providers: [
    GetAllServicesUseCase,
    GetBarberServicesIdsUseCase,
    {
      provide: ServiceRepository,
      useClass: PrismaServiceRepository
    }
  ],
  controllers: [ServiceController],
  exports: [],
  imports: [PrismaModule],
})
export class ServiceModule {}
