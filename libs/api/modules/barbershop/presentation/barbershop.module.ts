import { Module } from '@nestjs/common';
import { PrismaModule } from '@barbershop-app/api/core/persistence';
import { BarbershopRepository } from '@barbershop-app/api/barbershop/domain';
import { BarbershopController } from './barbershop.controller';
import { PrismaBarbershopRepository } from '@barbershop-app/api/barbershop/infrastructure';
import { GetAllBarbershopsUseCase } from '@barbershop-app/api/barbershop/application';


@Module({
  imports: [PrismaModule],
  controllers: [BarbershopController],
  providers: [
    GetAllBarbershopsUseCase,
    {
      provide: BarbershopRepository,
      useClass: PrismaBarbershopRepository
    }
  ],
  exports: []
})
export class BarbershopModule {}
