import { Module } from '@nestjs/common';
import { PrismaModule, PrismaCustomerRepository } from '@barbershop-app/api/core/infrastructure';
import { CustomerRepository } from '@barbershop-app/api/core/domain';

@Module({
  providers: [
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository
    }
  ],
  exports: [],
  imports: [PrismaModule],
})
export class UserModule {}
