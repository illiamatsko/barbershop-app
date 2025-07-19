import { Routes } from '@nestjs/core';
import { ServiceModule } from '@barbershop-app/api/service/presentation';
import { BarberModule } from '@barbershop-app/api/barber/presentation';
import { AuthModule } from '@barbershop-app/api/auth/presentation';

export const routes: Routes = [
  { path: 'auth', module: AuthModule },
  { path: 'barber', module: BarberModule },
  { path: 'service', module: ServiceModule }
]
