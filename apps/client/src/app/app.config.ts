import {
  ApplicationConfig, LOCALE_ID,
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
import { ServiceGateway } from '@barbershop-app/client/service/domain';
import { ApiServiceGateway } from '@barbershop-app/client/service/infrastructure';
import { AppointmentGateway, BarbershopGateway } from '@barbershop-app/client/appointment/domain';
import { ApiAppointmentGateway } from '@barbershop-app/client/appointment/infrastructure';
import { ApiBarbershopGateway } from '@barbershop-app/client/appointment/infrastructure';
import { provideCloudinaryLoader } from '@angular/common';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          },
        }
      }
    }),
    provideCloudinaryLoader('https://res.cloudinary.com/dx7xjflm0/'),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    { provide: LOCALE_ID, useValue: 'uk' },
    provideEnvironmentNgxMask(),
    {
      provide: AuthGateway,
      useClass: ApiAuthGateway
    },
    {
      provide: AppointmentGateway,
      useClass: ApiAppointmentGateway
    },
    {
      provide: BarberGateway,
      useClass: ApiBarberGateway
    },
    {
      provide: BarbershopGateway,
      useClass: ApiBarbershopGateway
    },
    {
      provide: ServiceGateway,
      useClass: ApiServiceGateway
    }
  ],
};
