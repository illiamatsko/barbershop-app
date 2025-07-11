import { Route } from '@angular/router';
import { authRoutes } from '@barbershop-app/client/auth/presentation';
import { Landing } from '@barbershop-app/client/layout/presentation';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing
  },
  {
    path: 'auth',
    children: authRoutes
  }
];
