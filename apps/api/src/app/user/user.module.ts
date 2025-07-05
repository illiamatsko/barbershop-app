import { Module } from '@nestjs/common';
import { PrismaModule, PrismaUserRepository } from '@barbershop-app/api/core/infrastructure';
import { UserRepository } from '@barbershop-app/api/core/domain';

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
