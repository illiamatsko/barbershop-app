import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStore } from '../state/auth/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  canActivate() {
    if(localStorage.getItem('token') && this.authStore.user()) {
      return true;
    } else {
      return this.router.createUrlTree(['/auth/sign-in']);
    }
  }
}
