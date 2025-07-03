import { Module } from '@nestjs/common';
import { PrismaModule, PrismaUserRepository } from '@barbershop-app/core/infrastructure';
import { UserRepository } from '@barbershop-app/core/domain';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [],
  imports: [PrismaModule],
})
export class UserModule {}
