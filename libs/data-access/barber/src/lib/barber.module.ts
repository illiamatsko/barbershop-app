import { Module } from '@nestjs/common';
import { PrismaModule } from '@barbershop-app/prisma';
import { BarberRepository } from './barber.repository';
import { ServiceModule } from '@barbershop-app/service';

@Module({
  providers: [BarberRepository],
  exports: [BarberRepository],
  imports: [PrismaModule, ServiceModule]
})
export class BarberModule {}
