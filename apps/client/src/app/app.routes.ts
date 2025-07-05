import { Route } from '@angular/router';
import { authRoutes } from '@barbershop-app/client/auth/presentation';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    children: authRoutes
  }
];
