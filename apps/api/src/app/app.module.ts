import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { ServiceModule } from '@barbershop-app/api/service/presentation';
import { BarberModule } from '@barbershop-app/api/barber/presentation';
import { AuthModule } from '@barbershop-app/api/auth/presentation';
import { BarbershopModule } from '@barbershop-app/api/barbershop/presentation';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    BarberModule,
    BarbershopModule,
    ServiceModule,
    RouterModule.register(routes)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
