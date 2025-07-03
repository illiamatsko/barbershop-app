import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BarberModule } from './barber/barber.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { routes } from './app.routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    BarberModule,
    RouterModule.register(routes)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
