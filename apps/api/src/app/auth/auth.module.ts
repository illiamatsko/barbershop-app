import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy, LocalStrategy } from '@barbershop-app/api/auth/infrastructure';
import { SignInUseCase, SignUpUseCase } from '@barbershop-app/api/auth/application';
import { AuthTokenGenerator, PasswordHelper, PasswordRepository, CustomerRepository } from '@barbershop-app/api/core/domain';
import {
  JwtAuthTokenGenerator,
  PrismaModule,
  PrismaPasswordRepository,
  PrismaCustomerRepository
} from '@barbershop-app/api/core/infrastructure';
import { BcryptPasswordHelper } from '@barbershop-app/shared/utils/infrastructure';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1h' }
    }),
    UserModule,
    PrismaModule
  ],
  controllers: [AuthController],
  providers:
    [
      LocalStrategy,
      JwtStrategy,
      SignInUseCase,
      SignUpUseCase,
      {
        provide: CustomerRepository,
        useClass: PrismaCustomerRepository
      },
      {
        provide: PasswordRepository,
        useClass: PrismaPasswordRepository
      },
      {
        provide: AuthTokenGenerator,
        useClass: JwtAuthTokenGenerator
      },
      {
        provide: PasswordHelper,
        useClass: BcryptPasswordHelper
      }
    ]
})
export class AuthModule {}
