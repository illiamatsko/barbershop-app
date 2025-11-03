import { Routes } from '@angular/router';
import { CreateAppointment } from './components/create-appointment/create-appointment';
import { Confirmation } from './components/confirmation/confirmation';
import { BookingStateGuard } from '@barbershop-app/client/appointment/application';

export const appointmentRoutes: Routes = [
  { path: 'create',
    component: CreateAppointment,
    canActivate: [BookingStateGuard]
  },
  { path: 'confirmation', component: Confirmation }
];
