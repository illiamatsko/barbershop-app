import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask'
import { ErrorInterceptor } from '@barbershop-app/client/core/infrastructure';
import { AuthGateway } from '@barbershop-app/client/auth/domain';
import { ApiAuthGateway } from '@barbershop-app/client/auth/infrastructure';
import { BarberGateway } from '@barbershop-app/client/barber/domain';
import { ApiBarberGateway } from '@barbershop-app/client/barber/infrastructure';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    provideEnvironmentNgxMask(),
    {
      provide: AuthGateway,
      useClass: ApiAuthGateway
    },
    {
      provide: BarberGateway,
      useClass: ApiBarberGateway
    }
  ],
};
