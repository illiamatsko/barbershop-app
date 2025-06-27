import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';


export const authRoutes: Routes = [
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp }
];
