import { inject, Injectable } from '@angular/core';
import { AuthStore } from '@barbershop-app/client/core/application';


@Injectable({ providedIn: 'root' })
export class SignOutUseCase {
  private authStore = inject(AuthStore);

  execute() {
    localStorage.removeItem('token');
    this.authStore.unsetUser();
  }
}
