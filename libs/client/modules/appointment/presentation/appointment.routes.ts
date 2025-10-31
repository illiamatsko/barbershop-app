import { Routes } from '@angular/router';
import { CreateAppointment } from './components/create-appointment/create-appointment';
import { Confirmation } from './components/confirmation/confirmation';

export const appointmentRoutes: Routes = [
  { path: 'create', component: CreateAppointment },
  { path: 'confirmation', component: Confirmation }
];
