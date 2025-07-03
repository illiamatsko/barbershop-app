import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy, LocalStrategy } from '@barbershop-app/auth/infrastructure';
import { SignInUseCase, SignUpUseCase, ValidateUserUseCase } from '@barbershop-app/auth/application';
import { AuthTokenGenerator, PasswordHelper, PasswordRepository, UserRepository } from '@barbershop-app/core/domain';
import {
  JwtAuthTokenGenerator,
  PrismaModule,
  PrismaPasswordRepository,
  PrismaUserRepository
} from '@barbershop-app/core/infrastructure';
import { BcryptPasswordHelper } from '@barbershop-app/utils/infrastructure';


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
      ValidateUserUseCase,
      {
        provide: UserRepository,
        useClass: PrismaUserRepository
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
