import { Module } from '@nestjs/common';
import {
  GetAllBarbersUseCase,
  GetBarberStatusesUseCase, GetBarberTimeSlotsByDateUseCase
} from '@barbershop-app/api/barber/application';
import { BarberController } from './barber.controller';
import { PrismaBarberRepository } from '@barbershop-app/api/barber/infrastructure';
import { BarberRepository } from '@barbershop-app/api/barber/domain';
import { PrismaModule } from '@barbershop-app/api/core/persistence';


@Module({
  imports: [PrismaModule],
  controllers: [BarberController],
  providers:
    [
      GetAllBarbersUseCase,
      GetBarberStatusesUseCase,
      GetBarberTimeSlotsByDateUseCase,
      {
        provide: BarberRepository,
        useClass: PrismaBarberRepository
      }
    ],
  exports: []
})
export class BarberModule {}
