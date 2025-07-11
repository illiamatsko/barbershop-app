import { Module } from '@nestjs/common';
import { PrismaModule, PrismaServiceRepository } from '@barbershop-app/api/core/infrastructure';
import { ServiceRepository } from '@barbershop-app/api/core/domain';
import { GetAllServicesUseCase } from '@barbershop-app/api/service/application';
import { ServiceController } from './service.controller';

@Module({
  providers: [
    GetAllServicesUseCase,
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
