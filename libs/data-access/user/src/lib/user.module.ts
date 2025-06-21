import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaModule } from '@barbershop-app/prisma';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
  imports: [PrismaModule]
})
export class UserModule {}
