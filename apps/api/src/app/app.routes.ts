import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BarberModule } from './barber/barber.module';
import { ServiceModule } from './service/service.module';
import { Routes } from '@nestjs/core';

export const routes: Routes = [
  { path: 'auth', module: AuthModule },
  { path: 'user', module: UserModule },
  { path: 'barber', module: BarberModule },
  { path: 'service', module: ServiceModule }
]
