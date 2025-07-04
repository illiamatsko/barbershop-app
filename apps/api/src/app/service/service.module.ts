import { Module } from '@nestjs/common';
import { PrismaModule, PrismaServiceRepository } from '@barbershop-app/core/infrastructure';
import { ServiceRepository } from '@barbershop-app/core/domain';
import { GetAllServicesUseCase } from '@barbershop-app/service/application';

@Module({
  providers: [
    GetAllServicesUseCase,
    {
      provide: ServiceRepository,
      useClass: PrismaServiceRepository
    }
  ],
  exports: [],
  imports: [PrismaModule],
})
export class ServiceModule {}
