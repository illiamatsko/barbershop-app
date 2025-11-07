import { inject, Injectable } from '@angular/core';
import { AuthGateway, SignInDto } from '@barbershop-app/client/auth/domain';
import { AuthStore, ErrorStore } from '@barbershop-app/client/core/application';
import { catchError, of, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SignInUseCase {
  private authGateway = inject(AuthGateway);
  private authStore = inject(AuthStore);
  private errorStore = inject(ErrorStore);

  execute(signInDto: SignInDto) {
    return this.authGateway.SignIn(signInDto).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.authStore.setUser(res);
        this.errorStore.setFormError('');
      }),
      catchError((e) => {
        this.errorStore.setFormError(
          e.error?.message || 'Unknown error. Please, try again later.'
        );
        return of(null);
      })
    );
  }

}
