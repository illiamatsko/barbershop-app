import { Route } from '@angular/router';
import { authRoutes } from '@barbershop-app/client/auth/presentation';
import { Landing } from '@barbershop-app/client/layout/presentation';
import { appointmentRoutes } from '@barbershop-app/client/appointment/presentation';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing
  },
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'appointment',
    children: appointmentRoutes
  }
];
