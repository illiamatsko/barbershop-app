import { Module } from '@nestjs/common';
import { PrismaModule, PrismaServiceRepository } from '@barbershop-app/core/infrastructure';
import { ServiceRepository } from '@barbershop-app/core/domain';

@Module({
  providers: [
    {
      provide: ServiceRepository,
      useClass: PrismaServiceRepository
    }
  ],
  exports: [],
  imports: [PrismaModule],
})
export class ServiceModule {}
