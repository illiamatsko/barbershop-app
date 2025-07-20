import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  BcryptPasswordHelper,
  JwtAuthTokenGenerator, PrismaBarberRepository,
  PrismaPasswordRepository,
  PrismaUserRepository
} from '@barbershop-app/api/auth/infrastructure';
import {
  SignInUseCase,
  CreateBarberUseCase,
  CreateCustomerUseCase,
  BarberRoleStrategy, CustomerRoleStrategy, GetUserFromTokenUseCase
} from '@barbershop-app/api/auth/application';
import {
  AuthTokenGenerator, BarberRepository, CustomerRepository,
  PasswordHelper,
  PasswordRepository,
  UserRepository
} from '@barbershop-app/api/auth/domain';
import { LocalStrategy, JwtStrategy } from '@barbershop-app/api/auth/infrastructure';
import { PrismaCustomerRepository } from '@barbershop-app/api/auth/infrastructure';
import { PrismaModule } from '@barbershop-app/api/core/persistence';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1h' }
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers:
    [
      LocalStrategy,
      JwtStrategy,
      SignInUseCase,
      CreateBarberUseCase,
      CreateCustomerUseCase,
      GetUserFromTokenUseCase,
      CustomerRoleStrategy,
      BarberRoleStrategy,
      {
        provide: 'ROLE_STRATEGIES',
        useFactory: (
          customerStrategy: CustomerRoleStrategy,
          barberStrategy: BarberRoleStrategy,
        ) => [customerStrategy, barberStrategy],
        inject: [CustomerRoleStrategy, BarberRoleStrategy],
      },

      {
        provide: UserRepository,
        useClass: PrismaUserRepository
      },
      {
        provide: CustomerRepository,
        useClass: PrismaCustomerRepository
      },
      {
        provide: BarberRepository,
        useClass: PrismaBarberRepository
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
