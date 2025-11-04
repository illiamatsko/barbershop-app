import { inject, Injectable } from '@angular/core';
import { AuthStore } from '@barbershop-app/client/core/application';
import { AuthGateway } from '@barbershop-app/client/auth/domain';


@Injectable({ providedIn: 'root' })
export class GetUserFromTokenUseCase {
  private authStore = inject(AuthStore);
  private authGateway = inject(AuthGateway);

  execute() {
    const token = localStorage.getItem('token')
    if(!token) return;

    const headers = { Authorization: `Bearer ${token}` };
    this.authGateway.GetUserFromToken(token, headers).subscribe({
      next: (user) => {
        this.authStore.setUser({ user, token });
      },
      error: () => {
        localStorage.removeItem('token');
      }
    })
  }
}
