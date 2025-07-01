import { Module } from '@nestjs/common';
import { ServiceRepository } from './service.repository';
import { PrismaModule } from '@barbershop-app/prisma';

@Module({
  providers: [ServiceRepository],
  exports: [ServiceRepository],
  imports: [PrismaModule]
})
export class ServiceModule {}
