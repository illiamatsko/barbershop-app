import { Routes } from '@angular/router';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';


export const authRoutes: Routes = [
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp }
];
