import { Route } from '@angular/router';
import { authRoutes } from './core/auth/auth.routes';

export const appRoutes: Route[] = [
  {
    path: 'auth-dir',
    children: authRoutes
  }
];
