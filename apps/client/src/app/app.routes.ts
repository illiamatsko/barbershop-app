import { Route } from '@angular/router';
import { authRoutes } from '@barbershop-app/client/auth/presentation';
import { HeroSection } from '@barbershop-app/client/layout/presentation';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HeroSection
  },
  {
    path: 'auth',
    children: authRoutes
  }
];
