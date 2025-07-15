import { Routes } from '@angular/router';
import { CreateAppointment } from './components/create-appointment/create-appointment';

export const appointmentRoutes: Routes = [
  { path: 'create', component: CreateAppointment }
];
